"use client"

import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"

interface ResourceButtonProps {
  type: string
  url: string
}

export default function ResourceButton({ type, url }: ResourceButtonProps) {
  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={() => window.open(url, '_blank')}
    >
      {type.toLowerCase() === "document" ? (
        <>
          <Download className="h-4 w-4 mr-2" /> Download
        </>
      ) : (
        <>
          <ExternalLink className="h-4 w-4 mr-2" /> Access
        </>
      )}
    </Button>
  )
} 