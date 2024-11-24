import { redirect } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { isUserAdmin } from "@/lib/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  Newspaper,
  Briefcase,
  GraduationCap,
  Target,
  SettingsIcon,
} from "lucide-react";
import ContentManagementTabs from "@/app/components/admin/content-management-tabs";
import { db } from "@/lib/prisma";

export default async function AdminConsolePage() {
  const { userId } = auth();

  if (!userId || !isUserAdmin(userId)) {
    redirect("/");
  }

  // Fetch all counts
  const [
    projectCount,
    userCount,
    alumniCount,
    careerCount,
    newsCount,
    eventsCount,
  ] = await Promise.all([
    db.project.count(),
    clerkClient.users.getCount(),
    db.alumni.count(),
    db.career.count(),
    db.content.count({
      where: {
        type: "news",
      },
    }),
    db.content.count({
      where: {
        type: "event",
      },
    }),
  ]);

  const stats = [
    {
      title: "Total Projects",
      value: projectCount,
      icon: FileText,
    },
    {
      title: "Total Users",
      value: userCount,
      icon: Users,
    },
    {
      title: "Alumni Network",
      value: alumniCount,
      icon: GraduationCap,
    },
    {
      title: "Career Opportunities",
      value: careerCount,
      icon: Briefcase,
    },
    {
      title: "Events",
      value: eventsCount,
      icon: Target,
    },
    {
      title: "News Articles",
      value: newsCount,
      icon: Newspaper,
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <SettingsIcon className="h-6 w-6 mr-2" />
        <h1 className="text-3xl font-bold">Admin Console</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-green-700">
            <CardHeader
              className={`flex flex-row items-center justify-between space-y-0 pb-2 `}
            >
              <CardTitle className="text-sm font-medium text-white">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ContentManagementTabs />
    </div>
  );
}
