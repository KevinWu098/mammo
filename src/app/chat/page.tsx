"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useChat } from "ai/react";

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: "api/gemini/",
    });

    return (
        <div className="flex h-full">
            <ScrollArea className="flex flex-1 bg-jas-grey_light px-6 py-4 rounded-3xl">
                <h1 className="text-5xl font-extrabold">Actions</h1>
            </ScrollArea>
            <div className="flex flex-1">
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
        </div>
    );
}
