"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthPromptModal({
  isOpen,
  onClose,
}: AuthPromptModalProps) {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/sign-in?redirect_url=/register");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join the Alumni Network</DialogTitle>
          <DialogDescription>
            To register as an alumni, you need to create an account first. This
            helps us maintain a secure and verified network of UNZA graduates.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Not now
          </Button>
          <Button onClick={handleSignUp}>Sign me up</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
