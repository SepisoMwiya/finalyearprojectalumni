import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export function useConnection() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const sendConnectionRequest = async (toAlumniId: number) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/connections/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ toAlumniId }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast({
        title: "Success",
        description: "Connection request sent successfully",
      });

      router.refresh();
    } catch (error) {
      console.error("Error sending connection request:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send connection request",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    sendConnectionRequest,
  };
} 