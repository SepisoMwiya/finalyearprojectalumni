"use client";

import { useUser } from "@clerk/nextjs";
import { isUserAdmin } from "@/lib/admin";

export const useAdmin = () => {
  const { user } = useUser();
  return isUserAdmin(user?.id);
}; 