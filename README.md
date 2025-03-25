# WebSocket-Based Bot Chat System

A real-time chat application with bot responses and multi-client database segregation. This system allows different clients to communicate with an automated bot while maintaining separate data storage for each client.

## Features

- Real-time communication using WebSocket (Socket.IO)
- Multi-client support with separate database storage
- Automated bot responses
- JWT-based authentication

## Tech Stack

- Frontend: React with TypeScript
- Backend: Node.js with Express.js and WebSocket (ws)
- Database: MongoDB
- Authentication: JWT-based authentication

## Project Structure

```
.
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.tsx       # Main application component
│   │   └── App.css       # Styles
│   ├── tsconfig.json     # TypeScript configuration
│   └── package.json      # Frontend dependencies
├── server/                # Node.js backend
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Custom middleware
│   │   ├── models/     # Database models
│   │   ├── routes/     # API routes
│   │   ├── services/   # Business logic
│   │   └── index.ts    # Entry point
│   ├── .env            # TypeScript configuration
│   ├── tsconfig.json   # TypeScript configuration
│   └── package.json    # Backend dependencies
└── README.md        # Readme file
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB instance
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd chat-bot-system
   ```

2. Install all client dependencies:
   ```bash
   cd client
   npm install
   ```

3. Install all server dependencies:
   ```bash
   cd server
   npm install
   ```

4. Create a `.env` file in the server directory:
   ```
   PORT=8080
   MONGODB_URI_CLIENT1=mongodb://localhost:27017/client1-db
   MONGODB_URI_CLIENT2=mongodb://localhost:27017/client2-db
   JWT_SECRET=your_jwt_secret_key_here
   ```
5. Create a `.env` file in the client directory:
   ```
   VITE_APP_API_URL=http://localhost:8080/api
   VITE_APP_SOCKET_URL=http://localhost:8080
   ```

## Running the Application

1. Development mode (client only):
   ```bash
   cd client
   npm run dev 
   ```

2. Development mode (server only):
   ```bash
   cd server
   npm run dev 
   ```

3. Production build (Client only):
   ```bash
   cd client
   npm run build
   ```

4. Production build (Server only):
   ```bash
   cd server
   npm run build
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080

## Development

### Server
- `npm run dev`: Run server in development mode with hot reload
- `npm run build`: Build server TypeScript files
- `npm run watch`: Watch for TypeScript changes

### Client
- `npm run dev`: Run client in development mode
- `npm run build`: Build client for production
