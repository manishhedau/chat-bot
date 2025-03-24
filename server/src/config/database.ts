import mongoose from 'mongoose';
import { ClientConfig } from '../types';

const clients: { [key: string]: mongoose.Connection } = {};

export const connectToDatabase = async (clientConfig: ClientConfig): Promise<void> => {
    try {
        if (!clients[clientConfig.clientId]) {
            const connection = await mongoose.createConnection(clientConfig.databaseUri);
            clients[clientConfig.clientId] = connection;
            console.log(`Connected to database for client: ${clientConfig.clientId}`);
        }
    } catch (error) {
        console.error(`Database connection error for client ${clientConfig.clientId}:`, error);
        throw error;
    }
};

export const getClientConnection = (clientId: string): mongoose.Connection => {
    const connection = clients[clientId];
    if (!connection) {
        throw new Error(`No database connection found for client: ${clientId}`);
    }
    return connection;
}; 