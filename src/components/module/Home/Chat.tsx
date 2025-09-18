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
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBotDialog() {
    const [chatCrate, { isLoading }] = useChatMutation();
    const [messages, setMessages] = useState([
        { role: "ai", content: "Hello 👋! I’m your assistant. How can I help?" },
    ]);
    const [input, setInput] = useState("");
    const [threadId, setThreadId] = useState<string>("1");

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (msg: string) => {
        if (!msg.trim()) return toast.error("Message cannot be empty");
        if (!threadId.trim()) return toast.error("ThreadId not found");

        setMessages((prev) => [...prev, { role: "human", content: msg }]);
        setInput("");

        try {
            const res = await chatCrate({ message: msg, threadId });
            if (res.data?.success) {
                setMessages(res.data?.data?.messages);
                setThreadId(res.data?.data?.threadId);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    };

    return (
        <Dialog>
            {/* Trigger button with floating effect */}
            <DialogTrigger asChild>
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="fixed bottom-4 right-4"
                >
                    <Button className="rounded-full w-12 h-12 shadow-lg">
                        💬
                    </Button>
                </motion.div>
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
                    <AnimatePresence initial={false}>
                        {messages?.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`flex ${msg.role === "human" ? "justify-end" : "justify-start"}`}
                                whileHover={msg.role === "human" ? { scale: 1.02 } : {}}
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
                            </motion.div>
                        ))}
                    </AnimatePresence>
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
                    <Button
                        disabled={isLoading}
                        onClick={() => sendMessage(input)}
                        className="ml-2"
                    >
                        Send
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
