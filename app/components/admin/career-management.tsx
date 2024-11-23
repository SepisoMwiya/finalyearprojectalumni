"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { careerColumns } from "./career-columns";
import { DataTable } from "../ui/data-table";
import { Career } from "@prisma/client";
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
import CreateCareerModal from "./create-career-modal";
import EditCareerModal from "./edit-career-modal";

export default function CareerManagement() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  const fetchCareers = async () => {
    try {
      const response = await fetch("/api/careers");
      const data = await response.json();
      setCareers(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching careers:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      fetchCareers();
    }
  }, [isLoading]);

  const handleEdit = (career: Career) => {
    setSelectedCareer(career);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (career: Career) => {
    setSelectedCareer(career);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCareer) return;

    try {
      const response = await fetch(`/api/careers/${selectedCareer.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCareers(careers.filter((c) => c.id !== selectedCareer.id));
      }
    } catch (error) {
      console.error("Error deleting career:", error);
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedCareer(null);
    }
  };

  const actionColumn = {
    id: "actions",
    cell: ({ row }) => {
      const career = row.original;
      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(career)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(career)}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  };

  const columnsWithActions = [...careerColumns, actionColumn];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Career Management</CardTitle>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <DataTable columns={columnsWithActions} data={careers} />
        )}
      </CardContent>

      <CreateCareerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCareerCreated={fetchCareers}
      />

      {selectedCareer && (
        <EditCareerModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedCareer(null);
          }}
          career={selectedCareer}
          onCareerUpdated={fetchCareers}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              job posting.
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