import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectManagement from "./project-management";
import CareerManagement from "./career-management";

export default function ContentManagementTabs() {
  return (
    <Tabs defaultValue="projects" className="space-y-4">
      <TabsList>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="careers">Careers</TabsTrigger>
        <TabsTrigger value="news" disabled>
          News
        </TabsTrigger>
        <TabsTrigger value="opportunities" disabled>
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
        <div className="text-center p-4 text-gray-500">
          News management coming soon
        </div>
      </TabsContent>
      <TabsContent value="opportunities">
        <div className="text-center p-4 text-gray-500">
          Opportunities management coming soon
        </div>
      </TabsContent>
    </Tabs>
  );
}
