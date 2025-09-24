"use server";

import { flattenError } from "zod";
import { Schema, schema } from "./types";
import db from "@/lib/db";

export async function createRaffle(data: Schema) {
  const parsed = schema.safeParse({
    ...data,
  });

  try {
    if (parsed.success) {
      const raffle = await db.raffle.create({
        data: {
          ...parsed.data,
          status: "open",
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
      message: "rro ao criar rifa",
      data: null,
    };
  }

  // if (parsed.success) {
  //   try {
  //   const raffle = await db.raffle.create({
  //     data: {
  //       ...parsed.data,
  //       status: "opened",
  //     },
  //   });

  //   return {
  //     success: true,
  //     message: "Rifa criada com sucesso",
  //     data: raffle,
  //   };
  // } catch (error) {
  // console.error(error);
  // return {
  //   success: false,
  //   message: "rro ao criar rifa",
  //   data: null,
  // };
  // }
  // } else {
  // console.error(
  //   "Zod validation failed:\n",
  //   flattenError(parsed.error).fieldErrors
  // );
  // return {
  //   success: false,
  //   message: "Erro ao criar rifa",
  //   data: null,
  // };
  // }
}
