"use client";

import { ClipboardCopy } from "@/components/clipboard-copy";
import { CustomTooltip } from "@/components/custom-tooltip";
import { Button } from "@/components/ui/button";
import { Campaign } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, Search } from "lucide-react";
import Link from "next/link";

const status: Record<string, string> = {
  active: "Ativa",
  closed: "Finalizada",
  cancelled: "Cancelada",
};

export const columns: ColumnDef<Campaign>[] = [
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
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data cadastro
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;
      return <p>{createdAt.toLocaleDateString()}</p>;
    },
  },
  {
    id: "actions",
    accessorKey: "Ações",
    cell: ({ row }) => {
      const campaign = row.original;

      return (
        <div className="flex space-x-4">
          <CustomTooltip content="Ver mais detalhes da campanha">
            <Link
              href={`/campaign/${campaign.id}`}
              className="flex justify-center items-center size-9 rounded-sm border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
            >
              <Search className="w-4 h-4" />
            </Link>
          </CustomTooltip>

          <ClipboardCopy
            value={`${process.env.NEXT_PUBLIC_BASE_URL}/campaign/${campaign.id}`}
          >
            <CustomTooltip content="Copiar link de compartilhamento">
              <Button
                size="icon"
                variant="default"
                className="bg-blue-800 hover:bg-blue-800/70"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </CustomTooltip>
          </ClipboardCopy>
        </div>
      );
    },
  },
];
