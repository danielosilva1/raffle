import { z, preprocess } from "zod";

import type { Raffle } from "@/generated/prisma";

export interface FormState {
  data: Raffle | null;
  success: boolean | null;
  message: string | null;
  fieldErrors: Record<string, string[] | undefined>;
}

export const CreateRaffle = z.object({
  title: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
  }, z.string().min(1, { error: "Este campo é obrigatório" })),
  description: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
  }, z.string().min(1, { error: "Este campo é obrigatório" })),
  award: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
  }, z.string().min(1, { error: "Este campo é obrigatório" })),
  organizerName: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
  }, z.string().min(1, { error: "Este campo é obrigatório" })),
  organizerPhoneNumber: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim().replace(/\D/g, "");
    }
  }, z.string().min(11, { error: "Telefone inválido" }).max(11, { error: "Telefone  inválido" })),
  pixKey: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
  }, z.string().min(1, { error: "Este campo é obrigatório" })),
  pixHolderName: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
  }, z.string().min(1, { error: "Este campo é obrigatório" })),
  numberQuantity: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
  }, z.coerce.number({ error: "Informe um valor numérico" }).int().min(5, { error: "Adicione entre 5 e mil números" }).max(1000, { error: "Adicione entre 5 e mil números" })),
  numberPrice: z.preprocess((val) => {
    if (typeof val === "string") {
      return val.trim().replace(",", ".");
    }
  }, z.coerce.number({ error: "Informe um valor numérico" }).min(0.5, { error: "Preço deve ser pelo menos 50 centavos" })),
  drawDate: preprocess((val) => {
    if (typeof val === "string") {
      const cleaned = val.trim();
      const date = new Date(cleaned);

      if (cleaned === "") {
        return null;
      }
      return date;
    }
  }, z.coerce.date({ error: "Data inválida" }).nullable()),
  additionalInfo: preprocess((val) => {
    if (typeof val === "string") {
      const cleaned = val.trim();
      if (cleaned === "") {
        return null;
      }
      return cleaned;
    }
  }, z.string().nullable()),
  allowCashPayment: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
  }, z.coerce.boolean({ error: "Campo inválido" })),
});
