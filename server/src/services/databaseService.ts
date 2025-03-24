import { connectToDatabase } from '../config/database';

export const initializeDatabases = async () => {
    try {
        await connectToDatabase({
            clientId: 'client1',
            databaseUri: process.env.MONGODB_URI_CLIENT1!
        });
        await connectToDatabase({
            clientId: 'client2',
            databaseUri: process.env.MONGODB_URI_CLIENT2!
        });
        console.log('Successfully connected to all databases');
    } catch (error) {
        console.error('Failed to initialize databases:', error);
        throw error;
    }
}; 