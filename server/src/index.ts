import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { initializeSocket } from './services/socketService';
import { initializeDatabases } from './services/databaseService';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Add auth routes
app.use('/api/auth', authRoutes);

// Initialize socket and database connections
const { httpServer } = initializeSocket(app);

// Start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Initialize databases
initializeDatabases().catch(console.error); 