import { ColumnDef } from "@tanstack/react-table";
import { Content } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contentStatuses = {
  draft: "bg-yellow-100 text-yellow-800",
  published: "bg-green-100 text-green-800",
  featured: "bg-purple-100 text-purple-800",
  archived: "bg-gray-100 text-gray-800",
  scheduled: "bg-blue-100 text-blue-800",
} as const;

export const newsColumns: ColumnDef<Content>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.getValue("date")).toLocaleDateString();
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row, table }) => {
      const content = row.original;
      const statusClass = contentStatuses[content.status as keyof typeof contentStatuses] || "";

      return (
        <Select
          defaultValue={content.status}
          onValueChange={async (newStatus) => {
            await fetch(`/api/contents/${content.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...content,
                status: newStatus,
              }),
            });
            // Refresh the table data
            (table.options.meta as any)?.refreshData();
          }}
        >
          <SelectTrigger className={`w-[130px] ${statusClass}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
]; 