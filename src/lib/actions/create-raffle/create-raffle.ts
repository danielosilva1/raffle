"use server";

import { flattenError } from "zod";
import { Schema, schema } from "./types";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createRaffle(data: Schema) {
  const { userId } = await auth();
  const parsed = schema.safeParse({
    ...data,
  });

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    if (parsed.success) {
      const raffle = await db.raffle.create({
        data: {
          ...parsed.data,
          status: "open",
          organizerId: userId,
        },
      });

      return {
        success: true,
        message: "Rifa criada com sucesso",
        data: raffle,
      };
    } else {
      console.error(
        "Zod validation failed:\n",
        flattenError(parsed.error).fieldErrors
      );
      return {
        success: false,
        message: "Erro ao criar rifa",
        data: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao criar rifa",
      data: null,
    };
  }
}
