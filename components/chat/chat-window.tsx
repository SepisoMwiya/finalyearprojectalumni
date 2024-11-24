"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWebSocket } from "@/hooks/use-websocket";
import { formatDistanceToNow } from "date-fns";
import { Send } from "lucide-react";

interface Message {
  id: number;
  content: string;
  senderId: number;
  createdAt: string;
  sender: {
    firstName: string;
    lastName: string;
  };
}

interface ChatWindowProps {
  chatId: number;
  currentUserId: number;
  otherUser: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export default function ChatWindow({ chatId, currentUserId, otherUser }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const socket = useWebSocket();

  useEffect(() => {
    if (socket) {
      // Join the chat room
      socket.emit('join-chat', chatId.toString());

      // Listen for new messages
      socket.on(`chat:${chatId}`, (message: Message) => {
        setMessages(prev => [...prev, message]);
        // Create notification if message is from other user
        if (message.senderId !== currentUserId) {
          socket.emit('create-notification', {
            type: 'NEW_MESSAGE',
            fromAlumniId: message.senderId,
            toAlumniId: currentUserId,
            message: 'sent you a message',
          });
        }
      });
    }

    return () => {
      if (socket) {
        socket.off(`chat:${chatId}`);
        socket.emit('leave-chat', chatId.toString());
      }
    };
  }, [socket, chatId, currentUserId]);

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`/api/chats/${chatId}/messages`);
      const data = await response.json();
      setMessages(data);
    };
    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`/api/chats/${chatId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newMessage }),
      });

      if (!response.ok) throw new Error("Failed to send message");
      const message = await response.json();
      
      // Optimistically add message to state
      setMessages(prev => [...prev, message]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>{`${otherUser.firstName} ${otherUser.lastName}`}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === currentUserId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.senderId === currentUserId
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-70">
                    {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex gap-2 mt-4">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 