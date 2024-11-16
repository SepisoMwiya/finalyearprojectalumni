"use client";

import { Button } from "@/components/ui/button";
import { useConnection } from "@/hooks/use-connection";

interface ConnectionButtonProps {
  profileId: number;
  connectionStatus: "none" | "pending" | "connected";
  isOwnProfile: boolean;
}

export default function ConnectionButton({
  profileId,
  connectionStatus,
  isOwnProfile,
}: ConnectionButtonProps) {
  const { isLoading, sendConnectionRequest } = useConnection();

  if (isOwnProfile) return null;

  const handleClick = () => {
    sendConnectionRequest(profileId);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading || connectionStatus !== "none"}
      variant={connectionStatus === "none" ? "default" : "outline"}
    >
      {isLoading
        ? "Sending..."
        : connectionStatus === "pending"
        ? "Pending"
        : "Connect"}
    </Button>
  );
} 