import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Remove any publicRoutes configuration to allow access to all routes
  // Add this line to make Clerk add user information to the request, but not enforce authentication
  ignoredRoutes: ["/(.*)", "/api/(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
