import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { isUserAdmin } from "@/lib/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, FileText, Settings } from "lucide-react";
import ContentManagementTabs from "@/app/components/admin/content-management-tabs";
import { db } from "@/lib/prisma";

export default async function AdminConsolePage() {
  const { userId } = auth();
  
  if (!userId || !isUserAdmin(userId)) {
    redirect('/');
  }

  // Fetch the total number of projects
  const projectCount = await db.project.count();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Console</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount}</div>
          </CardContent>
        </Card>
        {/* Add more stat cards here */}
      </div>

      <ContentManagementTabs />
    </div>
  );
}
