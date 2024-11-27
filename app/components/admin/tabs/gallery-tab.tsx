"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "../../ui/data-table";

type GalleryImage = {
  id: string;
  url: string;
  caption: string | null;
  category: string | null;
  createdAt: Date;
};

export default function GalleryTab({
  images,
}: {
  images: GalleryImage[];
}) {
  const [open, setOpen] = useState(false);
  const [urls, setUrls] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imageUrls = urls.split("\n").filter(url => url.trim());
    
    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls: imageUrls,
          category,
        }),
      });
      
      if (response.ok) {
        setOpen(false);
        setUrls("");
        setCategory("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding images:", error);
    }
  };

  const columns: ColumnDef<GalleryImage>[] = [
    {
      accessorKey: "url",
      header: "Image URL",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <img 
            src={row.getValue("url")} 
            alt="Gallery preview" 
            className="w-12 h-12 object-cover rounded"
          />
          <span className="truncate max-w-[200px]">{row.getValue("url")}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "createdAt",
      header: "Added",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return date.toLocaleDateString();
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const image = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={async () => {
                  await fetch(`/api/gallery/${image.id}`, {
                    method: "DELETE",
                  });
                  window.location.reload();
                }}
                className="cursor-pointer text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
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
        <h2 className="text-2xl font-bold">Gallery Management</h2>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Images
        </Button>
      </div>

      <DataTable columns={columns} data={images} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Gallery Images</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="urls">Image URLs (one per line)</Label>
              <Textarea
                id="urls"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                className="h-32"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Events, Campus, Students"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Images</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 