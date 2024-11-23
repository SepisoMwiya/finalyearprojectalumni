"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "../ui/data-table";
import { Project } from "@prisma/client";
import CreateProjectModal from "./create-project-modal";
import EditProjectModal from "./edit-project-modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      fetchProjects();
    }
  }, [isLoading]);

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (project: Project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProject) return;

    try {
      const response = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== selectedProject.id));
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
    }
  };

  const actionColumn = {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;
      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(project)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(project)}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  };

  const columnsWithActions = [...columns, actionColumn];

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
          <DataTable columns={columnsWithActions} data={projects} />
        )}
      </CardContent>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {selectedProject && (
        <EditProjectModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProject(null);
          }}
          project={selectedProject}
          onProjectUpdated={fetchProjects}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
