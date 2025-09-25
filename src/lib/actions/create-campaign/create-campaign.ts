"use server";

import { flattenError } from "zod";
import { Schema, schema } from "./types";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createCampaign(data: Schema) {
  const { userId } = await auth();
  const parsed = schema.safeParse({
    ...data,
  });

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    if (parsed.success) {
      const campaign = await db.campaign.create({
        data: {
          ...parsed.data,
          status: "active",
          createdBy: userId,
          organizerUserId: userId,
        },
      });

      return {
        success: true,
        message: "Campanha criada com sucesso",
        data: campaign,
      };
    } else {
      console.error(
        "Zod validation failed:\n",
        flattenError(parsed.error).fieldErrors
      );
      return {
        success: false,
        message: "Erro ao criar campanha",
        data: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao criar campanha",
      data: null,
    };
  }
}
