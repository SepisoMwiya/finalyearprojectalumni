import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectManagement from "./project-management";
import CareerManagement from "./career-management";
import { Gift, Newspaper, Projector, User } from "lucide-react";
import NewsManagement from "./news-management";

export default function ContentManagementTabs() {
  return (
    <Tabs defaultValue="projects" className="space-y-4">
      <TabsList>
        <TabsTrigger value="projects" className="flex items-center gap-2">
          <Projector />
          Projects
        </TabsTrigger>
        <TabsTrigger value="careers" className="flex items-center gap-2">
          <User />
          Careers
        </TabsTrigger>
        <TabsTrigger value="news" className="flex items-center gap-2">
          <Newspaper />
          News
        </TabsTrigger>
        <TabsTrigger
          value="opportunities"
          className="flex items-center gap-2"
          disabled
        >
          <Gift />
          Opportunities
        </TabsTrigger>
      </TabsList>
      <TabsContent value="projects">
        <ProjectManagement />
      </TabsContent>
      <TabsContent value="careers">
        <CareerManagement />
      </TabsContent>
      <TabsContent value="news">
        <NewsManagement />
      </TabsContent>
      <TabsContent value="opportunities">
        <div className="text-center p-4 text-gray-500">
          Opportunities management coming soon
        </div>
      </TabsContent>
    </Tabs>
  );
}
