"use server";

import { z } from "zod";
import { CreateRaffle, FormState } from "./types";

export async function createRaffle(prevState: FormState, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const parsed = CreateRaffle.safeParse(rawData);

  if (parsed.success) {
    return { data: null, errors: {} };
  } else {
    return { data: null, errors: z.flattenError(parsed.error).fieldErrors };
  }
}
