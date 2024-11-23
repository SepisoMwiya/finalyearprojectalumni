"use client";

import { Button } from "@/components/ui/button";
import { useConnection } from "@/hooks/use-connection";
import { Badge } from "@/components/ui/badge";

const statuses = ["none", "pending", "connected"] as const;

interface ConnectionButtonProps {
  profileId: number;
  connectionStatus: (typeof statuses)[number];
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

  switch (connectionStatus) {
    case "connected":
      return <Badge variant="outline">Connected</Badge>;
    case "pending":
      return (
        <Button disabled variant="outline">
          Pending
        </Button>
      );
    default:
      return (
        <Button onClick={handleClick} disabled={isLoading} variant="default">
          {isLoading ? "Sending..." : "Connect"}
        </Button>
      );
  }
}
