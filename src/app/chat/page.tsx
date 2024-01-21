"use client";

import { useChat } from "ai/react";

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: "api/gemini/",
    });

    return (
        <div>
            dog
            {messages.map((m) => (
                <div key={m.id}>
                    {m.role === "user" ? "User: " : "AI: "}
                    {m.content}
                </div>
            ))}
            <form onSubmit={handleSubmit}>
                <input
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
}
