"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

import { DataTable } from "../../ui/data-table";
import { AddResourceDialog } from "./add-resource-dialog";

type CareerResource = {
  id: string;
  title: string;
  type: "LINK" | "DOCUMENT";
  category: string;
  createdAt: Date;
};

const columns: ColumnDef<CareerResource>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      return date instanceof Date ? date.toLocaleDateString() : "Invalid Date";
    },
  },
];

interface CareerResourcesTabProps {
  resources: CareerResource[];
}

export default function CareerResourcesTab({
  resources,
}: CareerResourcesTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Career Resources</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Resource
        </Button>
      </div>
      <DataTable columns={columns} data={resources} />
      <AddResourceDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
