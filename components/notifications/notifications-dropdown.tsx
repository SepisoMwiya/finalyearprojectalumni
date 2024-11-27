"use client";

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useWebSocket } from "@/hooks/use-websocket";
import { toast } from "@/hooks/use-toast";

interface Notification {
  id: number;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
  fromAlumni: {
    id: number;
    firstName: string;
    lastName: string;
    profileImage: string | null;
  };
  chatId: number;
  mentorshipRequestId: number;
}

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const socket = useWebSocket();

  const unreadNotifications = notifications.filter((n) => !n.read);
  const readNotifications = notifications.filter((n) => n.read);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications");
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId?: number) => {
    try {
      const response = await fetch("/api/notifications/mark-read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationId }),
      });

      if (response.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
  };

  useEffect(() => {
    fetchNotifications();

    if (socket) {
      socket.on("notifications", () => {
        fetchNotifications();
      });
    }

    return () => {
      if (socket) {
        socket.off("notifications");
      }
    };
  }, [socket]);

  const handleAcceptConnection = async (fromAlumniId: number) => {
    try {
      const response = await fetch("/api/connections/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fromAlumniId }),
      });

      if (response.ok) {
        // Refresh notifications
        fetchNotifications();
        router.refresh();
      }
    } catch (error) {
      console.error("Error accepting connection:", error);
    }
  };

  const handleMentorshipAction = async (
    requestId: number,
    action: "accept" | "decline"
  ) => {
    try {
      const response = await fetch(`/api/mentorship/${requestId}/${action}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to process mentorship request");
      }

      // Refresh notifications
      fetchNotifications();
      router.refresh();

      toast({
        title: "Success",
        description: `Mentorship request ${action}ed successfully`,
      });
    } catch (error) {
      console.error(`Error ${action}ing mentorship request:`, error);
      toast({
        title: "Error",
        description: `Failed to ${action} mentorship request`,
        variant: "destructive",
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-white" />
          {unreadNotifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {unreadNotifications.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Notifications</h3>
            {unreadNotifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-muted-foreground"
                onClick={() => markAsRead()}
              >
                Mark all as read
              </Button>
            )}
          </div>
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No notifications
            </div>
          ) : (
            <div className="space-y-4">
              {unreadNotifications.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">New</h4>
                  {unreadNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-4 p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-sm">
                          <Link href={`/alumni/${notification.fromAlumni.id}`}>
                            <span className="font-semibold hover:underline">
                              {notification.fromAlumni.firstName}{" "}
                              {notification.fromAlumni.lastName}
                            </span>{" "}
                          </Link>
                          {notification.type === "CONNECTION_REQUEST" ? (
                            <>sent you a connection request</>
                          ) : notification.type === "MENTORSHIP_REQUEST" ? (
                            <>sent you a mentorship request</>
                          ) : notification.type === "NEW_MESSAGE" ? (
                            <Link
                              href={`/chats/${notification.chatId}`}
                              className="hover:underline"
                            >
                              <>sent you a message</>
                            </Link>
                          ) : null}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(notification.createdAt))}{" "}
                          ago
                        </p>
                        {notification.type === "MENTORSHIP_REQUEST" && (
                          <div className="mt-2 flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleMentorshipAction(notification.mentorshipRequestId, "accept")}
                            >
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMentorshipAction(notification.mentorshipRequestId, "decline")}
                            >
                              Decline
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {readNotifications.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Earlier</h4>
                  {readNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-4 p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-sm">
                          <Link href={`/alumni/${notification.fromAlumni.id}`}>
                            <span className="font-semibold hover:underline">
                              {notification.fromAlumni.firstName}{" "}
                              {notification.fromAlumni.lastName}
                            </span>{" "}
                          </Link>
                          {notification.type === "CONNECTION_REQUEST" ? (
                            <>sent you a connection request</>
                          ) : notification.type === "MENTORSHIP_REQUEST" ? (
                            <>sent you a mentorship request</>
                          ) : notification.type === "NEW_MESSAGE" ? (
                            <Link
                              href={`/chats/${notification.chatId}`}
                              className="hover:underline"
                            >
                              <>sent you a message</>
                            </Link>
                          ) : null}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(notification.createdAt))}{" "}
                          ago
                        </p>
                        {notification.type === "MENTORSHIP_REQUEST" && (
                          <div className="mt-2 flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleMentorshipAction(notification.mentorshipRequestId, "accept")}
                            >
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMentorshipAction(notification.mentorshipRequestId, "decline")}
                            >
                              Decline
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
