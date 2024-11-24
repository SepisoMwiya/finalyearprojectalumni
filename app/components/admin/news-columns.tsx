import { ColumnDef } from "@tanstack/react-table";
import { Content } from "@prisma/client";

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
  },
]; 