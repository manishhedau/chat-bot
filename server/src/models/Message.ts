import mongoose from 'mongoose';
import { Message } from '../types';
import { getClientConnection } from '../config/database';

const messageSchema = new mongoose.Schema<Message>({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    clientId: { type: String, required: true },
    isBot: { type: Boolean, default: false }
}, {
    timestamps: true
});

export const getMessageModel = (clientId: string) => {
    const connection = getClientConnection(clientId);
    return connection.model<Message>('Message', messageSchema);
}; 