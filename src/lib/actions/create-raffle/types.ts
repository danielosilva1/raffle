import { z, preprocess } from "zod";

export const schema = z.object({
  title: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
    return val;
  }, z.string().min(1, { error: "Este campo é obrigatório" })),
  description: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
    return val;
  }, z.string().min(1, { error: "Este campo é obrigatório" })),
  award: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
    return val;
  }, z.string().min(1, { error: "Este campo é obrigatório" })),
  organizerName: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
    return val;
  }, z.string().min(1, { error: "Este campo é obrigatório" })),
  organizerPhoneNumber: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim().replace(/\D/g, "");
    }
    return val;
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
    return val;
  }, z.string().min(1, { error: "Este campo é obrigatório" })),
  numberQuantity: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
    return val;
  }, z.coerce.number({ error: "Informe um valor numérico" }).int().min(5, { error: "Adicione entre 5 e mil números" }).max(1000, { error: "Adicione entre 5 e mil números" })),
  numberPrice: z.preprocess((val) => {
    if (typeof val === "string") {
      return val.trim().replace(",", ".");
    }
    return val;
  }, z.coerce.number({ error: "Informe um valor numérico" }).min(0.5, { error: "Preço deve ser pelo menos 50 centavos" })),
  drawDate: preprocess(
    (val) => {
      if (typeof val === "string") {
        const cleaned = val.trim();
        const date = new Date(cleaned);

        if (cleaned === "") {
          return null;
        }
        return date;
      }
      return val ?? null;
    },
    z.coerce
      .date({ error: "Data inválida" })
      .refine(
        (val) => {
          const today = new Date(Date.now());
          today.setHours(0);
          today.setMinutes(0);
          today.setSeconds(0);
          today.setMilliseconds(0);

          return val >= today;
        },
        {
          error: "Data deve ser hoje ou posterior",
        }
      )
      .nullable()
  ),
  additionalInfo: preprocess((val) => {
    if (typeof val === "string") {
      const cleaned = val.trim();
      if (cleaned === "") {
        return null;
      }
      return cleaned;
    }
    return val ?? null;
  }, z.string().nullable()),
  allowCashPayment: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
    return val;
  }, z.coerce.boolean({ error: "Campo inválido" })),
});

export type Schema = z.infer<typeof schema>;
