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
}

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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

  useEffect(() => {
    fetchNotifications();
    // Poll for new notifications every minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4">
          <h3 className="font-semibold">Notifications</h3>
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No new notifications
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {notifications.map((notification) => (
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
                      sent you a connection request
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(notification.createdAt))}{" "}
                      ago
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleAcceptConnection(notification.fromAlumni.id)
                        }
                      >
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
