import mongoose from 'mongoose';
import { User } from '../types';
import { getClientConnection } from '../config/database';

const userSchema = new mongoose.Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    clientId: { type: String, required: true }
}, {
    timestamps: true
});

export const getUserModel = (clientId: string) => {
    const connection = getClientConnection(clientId);
    return connection.model<User>('User', userSchema);
}; 