import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { Express } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';
import { handleMessage } from './messageHandler';

export const initializeSocket = (app: Express) => {
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    // Socket authentication middleware
    io.use((socket: Socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication token required'));
        }

        try {
            const user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            socket.data.user = user;
            next();
        } catch (err) {
            next(new Error('Invalid token'));
        }
    });

    // Socket event handlers
    io.on('connection', (socket: Socket) => {
        console.log('User connected:', socket.data.user.username);

        socket.on('message', async (message: string) => {
            await handleMessage(socket, message);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.data.user.username);
        });
    });

    return { httpServer, io };
}; 