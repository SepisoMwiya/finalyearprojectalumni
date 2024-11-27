"use client";

import { useState } from "react";
import { Alumni } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "../../ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AlumniTabProps {
  alumni: Alumni[];
}

export default function AlumniTab({ alumni }: AlumniTabProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Alumni>>({});

  const handleEdit = (alumni: Alumni) => {
    setSelectedAlumni(alumni);
    setFormData(alumni);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedAlumni) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/alumni/${selectedAlumni.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update alumni");
      }

      toast({
        title: "Success",
        description: "Alumni updated successfully",
      });

      setIsEditDialogOpen(false);
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update alumni",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "school",
      header: "School",
    },
    {
      accessorKey: "graduationYear",
      header: "Graduation Year",
    },
    {
      accessorKey: "currentCompany",
      header: "Current Company",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "createdAt",
      header: "Joined",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const alumni = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleEdit(alumni)}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Alumni Management</h2>
      </div>
      <DataTable columns={columns} data={alumni} />

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Alumni</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="school">School</Label>
                <Input
                  id="school"
                  value={formData.school || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, school: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="graduationYear">Graduation Year</Label>
                <Input
                  id="graduationYear"
                  type="number"
                  value={formData.graduationYear || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      graduationYear: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={isLoading}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
