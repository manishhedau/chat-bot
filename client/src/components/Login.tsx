import React, { useState } from "react";

interface LoginProps {
    onLogin: (token: string) => void;
    onToggleForm: () => void;
}

interface LoginFormData {
    username: string;
    password: string;
    clientId: string;
}
const Login = ({ onLogin, onToggleForm }: LoginProps) => {
    const [formData, setFormData] = useState<LoginFormData>({
        username: "",
        password: "",
        clientId: "client1",
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(
                import.meta.env.VITE_APP_API_URL + "/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password,
                        clientId: formData.clientId,
                    }),
                }
            );

            const { data } = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            onLogin(data.token);
            localStorage.setItem("chatToken", data.token);
            localStorage.setItem("clientId", formData.clientId);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Login failed");
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                            setFormData({ ...formData, username: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Client:</label>
                    <select
                        value={formData.clientId}
                        onChange={(e) =>
                            setFormData({ ...formData, clientId: e.target.value })
                        }
                    >
                        <option value="client1">Client 1</option>
                        <option value="client2">Client 2</option>
                    </select>
                </div>
                <button type="submit">Login</button>
                <div className="auth-toggle">
                    <button type="button" onClick={onToggleForm}>
                        Need an account? Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
