"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "../ui/data-table";
import { Content } from "@prisma/client";
import CreateContentModal from "./create-content-modal";
import { newsColumns } from "./news-columns";
import DeleteContentDialog from "./delete-content-dialog";
import EditContentModal from "./edit-content-modal";

export default function NewsManagement() {
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [contentType, setContentType] = useState<"news" | "event">("news");

  const fetchContents = async () => {
    try {
      const response = await fetch("/api/contents");
      const data = await response.json();
      setContents(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching contents:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      fetchContents();
    }
  }, [isLoading]);

  const handleEdit = (content: Content) => {
    setSelectedContent(content);
    setIsEditModalOpen(true);
  };

  const handleDelete = (content: Content) => {
    setSelectedContent(content);
    setIsDeleteDialogOpen(true);
  };

  const actionColumn = {
    id: "actions",
    cell: ({ row }) => {
      const content = row.original;
      return (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleEdit(content)}>
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(content)}
            className="text-destructive"
          >
            Delete
          </Button>
        </div>
      );
    },
  };

  const columnsWithActions = [...newsColumns, actionColumn];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Content Management</CardTitle>
        <div className="flex gap-4">
          <Button
            variant={contentType === "news" ? "default" : "outline"}
            onClick={() => setContentType("news")}
          >
            News
          </Button>
          <Button
            variant={contentType === "event" ? "default" : "outline"}
            onClick={() => setContentType("event")}
          >
            Events
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create {contentType === "news" ? "News" : "Event"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <DataTable
            columns={columnsWithActions}
            data={contents.filter((content) => content.type === contentType)}
            meta={{
              refreshData: fetchContents,
            }}
          />
        )}
      </CardContent>

      <CreateContentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        contentType={contentType}
        onContentCreated={fetchContents}
      />

      {selectedContent && (
        <EditContentModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedContent(null);
          }}
          content={selectedContent}
          onContentUpdated={fetchContents}
        />
      )}

      <DeleteContentDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={async () => {
          if (selectedContent) {
            await fetch(`/api/contents/${selectedContent.id}`, {
              method: "DELETE",
            });
            fetchContents();
          }
          setIsDeleteDialogOpen(false);
          setSelectedContent(null);
        }}
      />
    </Card>
  );
}
