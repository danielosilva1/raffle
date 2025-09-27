"use server";

import { flattenError } from "zod";
import { Schema, schema } from "./types";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updateCampaign(data: Schema) {
  const { userId } = await auth();
  const parsed = schema.safeParse({
    ...data,
  });

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    if (parsed.success) {
      const { campaignId, ...data } = parsed.data;

      const campaign = await db.campaign.update({
        data: {
          ...data,
        },
        where: {
          id: campaignId,
          organizerUserId: userId,
        },
      });

      revalidatePath(`/campaign/edit/${campaignId}`);
      return {
        success: true,
        message: "Campanha atualizada com sucesso",
        data: campaign,
      };
    } else {
      console.error(
        "Zod validation failed:\n",
        flattenError(parsed.error).fieldErrors
      );
      return {
        success: false,
        message: "Erro ao atualizar campanha",
        data: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao atualizar campanha",
      data: null,
    };
  }
}
