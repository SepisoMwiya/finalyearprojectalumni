"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ApplyButtonProps {
  applicationLink: string;
}

export default function ApplyButton({ applicationLink }: ApplyButtonProps) {
  const ensureHttps = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url}`;
  };

  const handleApplyClick = () => {
    window.open(ensureHttps(applicationLink), "_blank");
  };

  return (
    <Button
      size="lg"
      className="gap-2"
      onClick={handleApplyClick}
      disabled={!applicationLink}
    >
      {applicationLink ? (
        <>
          Apply Now <ExternalLink className="h-4 w-4" />
        </>
      ) : (
        "Applications Closed"
      )}
    </Button>
  );
} 