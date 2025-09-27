"use server";

import { Schema } from "./types";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteCampaign(data: Schema) {
  const { userId } = await auth();
  const { campaignId } = data;

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    const campaign = await db.campaign.delete({
      where: { id: campaignId, createdBy: userId },
    });

    revalidatePath("/campaign");
    return {
      success: true,
      message: "Campanha excluída",
      data: campaign,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao excluir campanha",
      data: null,
    };
  }
}
