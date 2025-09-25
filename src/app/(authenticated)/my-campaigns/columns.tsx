"use client";

import { Button } from "@/components/ui/button";
import { Schema } from "@/lib/actions/create-campaign/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, Pencil } from "lucide-react";

const status: Record<string, string> = {
  active: "Ativa",
  closed: "Finalizada",
  cancelled: "Cancelada",
};

export const columns: ColumnDef<Schema>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p>{status[row.getValue("status") as string] ?? ""}</p>;
    },
  },
  {
    id: "actions",
    accessorKey: "Ações",
    cell: ({ row }) => {
      const campaign = row.original;

      return (
        <div className="flex space-x-4">
          <Button size="icon" variant="outline">
            <Copy />
          </Button>
          <Button size="icon" variant="outline">
            <Pencil />
          </Button>
        </div>
      );
    },
  },
];
