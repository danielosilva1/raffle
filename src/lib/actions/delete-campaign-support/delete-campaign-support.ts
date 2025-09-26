"use server";

import { Schema } from "./types";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteCampaignSupport(data: Schema) {
  const { userId } = await auth();
  const { campaignSupportId } = data;

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    const campaignSupport = await db.campaignSupport.delete({
      where: { id: campaignSupportId },
    });

    revalidatePath(`/campaign/${campaignSupport.id}`);
    return {
      success: true,
      message: "Apoio removido",
      data: campaignSupport,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao remover suporte",
      data: null,
    };
  }
}
