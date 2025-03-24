const responses = [
    "Hello! How can I help you today?",
    "That's interesting! Tell me more.",
    "I understand. Let me think about that.",
    "I'm processing your message...",
    "Thanks for sharing that with me!",
    "I'm here to assist you.",
    "Could you please elaborate?",
    "That's a great question!",
    "I'm analyzing your request...",
    "Let me help you with that."
];

export const generateBotResponse = (): string => {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}; 