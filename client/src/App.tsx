import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

interface Message {
  content: string;
  isBot: boolean;
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("chatToken");
    if (token) {
      initializeSocket(token);
      setIsAuthenticated(true);
    }
  }, []);

  const initializeSocket = (token: string) => {
    const newSocket = io(import.meta.env.VITE_APP_SOCKET_URL, {
      auth: {
        token,
      },
    });

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on("error", (error: Error) => {
      console.error("Socket error:", error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogin = (token: string) => {
    initializeSocket(token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("chatToken");
    localStorage.removeItem("clientId");
    if (socket) {
      socket.close();
    }
    setSocket(null);
    setIsAuthenticated(false);
    setMessages([]);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && socket) {
      const message = {
        content: inputMessage,
        isBot: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, message]);
      socket.emit("message", inputMessage);
      setInputMessage("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        {showLogin ? (
          <Login
            onLogin={handleLogin}
            onToggleForm={() => setShowLogin(false)}
          />
        ) : (
          <Register
            onRegister={handleLogin}
            onToggleForm={() => setShowLogin(true)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-header">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.isBot ? "bot" : "user"}`}
            >
              <div className="message-content">{message.content}</div>
              <div className="message-timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="input-form">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
