import { Socket } from 'socket.io';
import { getMessageModel } from '../models/Message';
import { generateBotResponse } from './botService';

export const handleMessage = async (socket: Socket, message: string) => {
    const user = socket.data.user;
    
    try {
        // Get the appropriate Message model for the client
        const MessageModel = getMessageModel(user.clientId);
        
        // Save user message
        const userMessage = new MessageModel({
            userId: user.userId,
            content: message,
            clientId: user.clientId,
            isBot: false
        });
        await userMessage.save();

        // Generate and save bot response
        const botResponse = generateBotResponse();
        const botMessage = new MessageModel({
            userId: 'bot',
            content: botResponse,
            clientId: user.clientId,
            isBot: true
        });
        await botMessage.save();

        // Send bot response back to user
        socket.emit('message', {
            content: botResponse,
            isBot: true,
            timestamp: new Date()
        });
    } catch (error) {
        console.error('Error handling message:', error);
        socket.emit('error', { message: 'Failed to process message' });
    }
}; 