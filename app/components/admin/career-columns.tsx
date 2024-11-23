import { ColumnDef } from "@tanstack/react-table";
import { Career } from "@prisma/client";

export const careerColumns: ColumnDef<Career>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "postedDate",
    header: "Posted Date",
    cell: ({ row }) => {
      return new Date(row.getValue("postedDate")).toLocaleDateString();
    },
  },
]; 