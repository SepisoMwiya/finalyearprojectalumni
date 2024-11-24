"use client";

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";

interface Chat {
  id: number;
  members: {
    id: number;
    firstName: string;
    lastName: string;
    profileImage: string | null;
  }[];
  lastMessage?: {
    content: string;
    createdAt: string;
  };
}

export default function MessagesDropdown() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch("/api/chats");
        if (response.ok) {
          const data = await response.json();
          setChats(data);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <MessageCircle className="h-5 w-5 text-white" />
          {chats.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {chats.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4">
          <h3 className="font-semibold">Messages</h3>
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : chats.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No messages yet
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {chats.map((chat) => {
                const otherMember = chat.members[0];
                return (
                  <Link
                    key={chat.id}
                    href={`/chats/${chat.id}`}
                    className="flex items-start gap-4 p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        src={otherMember.profileImage || "/default-avatar.png"}
                        alt={`${otherMember.firstName} ${otherMember.lastName}`}
                        className="rounded-full object-cover"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">
                        {otherMember.firstName} {otherMember.lastName}
                      </p>
                      {chat.lastMessage && (
                        <>
                          <p className="text-sm text-gray-600 truncate">
                            {chat.lastMessage.content}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDistanceToNow(
                              new Date(chat.lastMessage.createdAt),
                              {
                                addSuffix: true,
                              }
                            )}
                          </p>
                        </>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
