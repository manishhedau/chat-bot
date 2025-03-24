export interface User {
    _id?: string;
    username: string;
    password: string;
    clientId: string;
}

export interface Message {
    _id?: string;
    userId: string;
    content: string;
    timestamp: Date;
    clientId: string;
    isBot: boolean;
}

export interface ClientConfig {
    clientId: string;
    databaseUri: string;
}

export interface JwtPayload {
    userId: string;
    username: string;
    clientId: string;
} 