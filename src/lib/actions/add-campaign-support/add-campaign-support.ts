"use server";

import { flattenError } from "zod";
import { Schema, schema } from "./types";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function addCampaignSupport(data: Schema) {
  const { userId } = await auth();
  const parsed = schema.safeParse({
    ...data,
  });

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    if (parsed.success) {
      const campaignSupport = await db.campaignSupport.create({
        data: {
          ...parsed.data,
        },
      });

      revalidatePath(`/campaign/${data.campaignId}`);
      return {
        success: true,
        message: "Você agora é um apoiador da campanha",
        data: campaignSupport,
      };
    } else {
      console.error(
        "Zod validation failed:\n",
        flattenError(parsed.error).fieldErrors
      );
      return {
        success: false,
        message: "Erro ao apoiar campanha",
        data: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao apoiar campanha",
      data: null,
    };
  }
}
