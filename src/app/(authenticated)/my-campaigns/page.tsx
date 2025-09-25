import { DataTable } from "@/components/data-table";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { columns } from "./columns";

export const metadata: Metadata = {
  title: "Minhas campanhas",
  description: "Veja as campanhas que você criou",
};

export default async function MyCampaigns() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const campaigns = await db.campaign.findMany({
    where: {
      createdBy: userId,
    },
  });

  return (
    <div className="w-full flex flex-col items-center pt-6 pb-6">
      <h1 className="mb-6 text-2xl text-blue-900">Minhas campanhas</h1>

      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={campaigns}
          filterColumn="title"
          filterPlaceholder="Filtrar pelo título..."
        />
      </div>
    </div>
  );
}
