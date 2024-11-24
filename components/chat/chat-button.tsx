"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ChatButtonProps {
  recipientId: number;
  currentUserId?: string;
}

export default function ChatButton({ recipientId, currentUserId }: ChatButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStartChat = async () => {
    if (!currentUserId) {
      toast({
        title: "Please sign in to start a chat",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipientId }),
      });

      if (!response.ok) throw new Error("Failed to start chat");

      const chat = await response.json();
      router.push(`/chats/${chat.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start chat",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleStartChat} 
      disabled={isLoading}
      variant="outline"
      size="sm"
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      Message
    </Button>
  );
} 