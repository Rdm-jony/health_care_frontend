/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useChatMutation } from "@/redux/features/chat/chatApi";
import { toast } from "sonner";

export default function ChatBotDialog() {
    const [chatCrate, { isLoading }] = useChatMutation()
    const [messages, setMessages] = useState([
        { role: "ai", content: "Hello 👋! I’m your assistant. How can I help?" },
    ]);
    const [input, setInput] = useState("");
    const [threadId, setThreadId] = useState<string>("1");

    // Refs for auto-scroll
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto scroll when messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (msg: string) => {
        if (!msg.trim()) {
            return toast.error("msg not found")
        };
        if (!threadId.trim()) {
            return toast.error("threadId not found")
        };

        // Add human message
        setMessages((prev) => [...prev, { role: "human", content: msg }]);
        setInput("");

        // Call your backend API
        try {
            const res = await chatCrate({ message: msg, threadId })
            console.log(res)
            if (res.data?.success) {
                setMessages(res.data?.data?.messages);
                setThreadId(res.data?.data?.threadId);
            }
        } catch (error: any) {
            toast.error(error?.data.message)
        }
    };

    return (
        <Dialog>
            {/* Trigger button */}
            <DialogTrigger asChild>
                <Button className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg">
                    💬
                </Button>
            </DialogTrigger>

            <DialogContent className="w-96 max-w-full p-0 flex flex-col h-[500px]">
                {/* Header */}
                <DialogHeader className="bg-blue-600 text-white flex justify-between items-center px-4 py-2">
                    <DialogTitle>ChatBot 🤖</DialogTitle>
                    <DialogClose asChild>
                        <Button variant="ghost" className="text-white p-0">
                            ✖
                        </Button>
                    </DialogClose>
                </DialogHeader>

                {/* Chat messages */}
                <div
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50"
                >
                    {messages?.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${msg.role === "human" ? "justify-end" : "justify-start"
                                }`}
                        >
                            {msg.role === "ai" && (
                                <Avatar className="w-8 h-8 mr-2">
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                            )}
                            <div
                                className={`px-3 py-2 rounded-2xl max-w-xs text-sm ${msg.role === "human"
                                    ? "bg-blue-500 text-white rounded-br-none"
                                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                                    }`}
                            >
                                {msg.content}
                            </div>
                            {msg.role === "human" && (
                                <Avatar className="w-8 h-8 ml-2">
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    {/* Auto-scroll target */}
                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="flex items-center border-t p-2 bg-white">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                        placeholder="Type a message..."
                        className="flex-1"
                    />
                    <Button disabled={isLoading} onClick={() => sendMessage(input)} className="ml-2">
                        Send
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
