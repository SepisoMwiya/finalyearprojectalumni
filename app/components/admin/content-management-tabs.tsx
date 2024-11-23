import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, FileText, BarChart3, Settings, Users, Briefcase, Newspaper, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectManagement from "./project-management";


export default function ContentManagementTabs() {
  return (
    <Tabs defaultValue="projects" className="w-full">
      <TabsList className="grid w-full grid-cols-7">
        <TabsTrigger value="projects" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Projects
        </TabsTrigger>
        <TabsTrigger value="careers" className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          Careers
        </TabsTrigger>
        <TabsTrigger value="opportunities" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Opportunities
        </TabsTrigger>
        <TabsTrigger value="news" className="flex items-center gap-2">
          <Newspaper className="h-4 w-4" />
          News
        </TabsTrigger>
        <TabsTrigger value="alumni" className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          Alumni
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Users
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="projects">
        <ProjectManagement />
      </TabsContent>

      <TabsContent value="careers">
        <Card>
          <CardHeader>
            <CardTitle>Career Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Career management features coming soon...</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="opportunities">
        <Card>
          <CardHeader>
            <CardTitle>Opportunity Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Opportunity management features coming soon...</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="news">
        <Card>
          <CardHeader>
            <CardTitle>News Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>News management features coming soon...</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="alumni">
        <Card>
          <CardHeader>
            <CardTitle>Alumni Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Alumni management features coming soon...</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="users">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>User management features coming soon...</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Settings features coming soon...</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
} 