"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";

import { columns } from "./columns";
import { useProjects } from "@/hooks/use-projects";
import { DataTable } from "../ui/data-table";
import { Project } from "@prisma/client";
import CreateProjectModal from "./create-project-modal";

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (isLoading) {
      fetch("/api/projects")
        .then((response) => response.json())
        .then((data) => {
          setProjects(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
          setIsLoading(false);
        });
    }
  }, [projects, isLoading]); // Empty dependency array means this only runs once on mount

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Project Management</CardTitle>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Project
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <DataTable columns={columns} data={projects} />
        )}
      </CardContent>
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </Card>
  );
}
