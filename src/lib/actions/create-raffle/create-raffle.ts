"use server";

import { z } from "zod";
import { CreateRaffle, FormState } from "./types";
import db from "@/lib/db";

export async function createRaffle(prevState: FormState, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const parsed = CreateRaffle.safeParse(rawData);

  if (parsed.success) {
    try {
      const raffle = await db.raffle.create({
        data: {
          ...parsed.data,
          status: "opened",
        },
      });

      return {
        success: true,
        message: "Rifa adicionada com sucesso",
        data: raffle,
        fieldErrors: {},
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erro ao adicionar rifa",
        data: null,
        fieldErrors: {},
      };
    }
  } else {
    return {
      success: false,
      message: "Erro ao adicionar rifa",
      data: null,
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }
}
