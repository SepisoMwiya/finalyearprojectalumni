const ADMIN_USER_IDS = ["user_2mkm2lPfuY6M5pPCjQbM9xm2DMm"];

export function isUserAdmin(userId?: string | null): boolean {
  if (!userId) return false;
  return ADMIN_USER_IDS.includes(userId);
}
