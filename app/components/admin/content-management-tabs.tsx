import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectManagement from "./project-management";
import CareerManagement from "./career-management";
import { Gift, Newspaper, Projector, User, BookOpen } from "lucide-react";
import NewsManagement from "./news-management";
import CareerResourcesTabWrapper from "./tabs/career-resources-tab-wrapper";

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
          News And Events
        </TabsTrigger>
        <TabsTrigger
          value="career-resources"
          className="flex items-center gap-2"
        >
          <BookOpen />
          Career Resources
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
      <TabsContent value="career-resources">
        <CareerResourcesTabWrapper />
      </TabsContent>
    </Tabs>
  );
}
