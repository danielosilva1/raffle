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
  targetSupporters: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
    return val;
  }, z.coerce.number({ error: "Informe um valor numérico" }).int().min(5, { error: "Adicione entre 5 e mil apoiadores" }).max(1000, { error: "Adicione entre 5 e mil apoiadores" })),
  organizerName: preprocess((val) => {
    if (typeof val === "string") {
      return val.trim();
    }
    return val;
  }, z.string().min(1, { error: "Este campo é obrigatório" })),
  startDate: preprocess((val) => {
    if (typeof val === "string") {
      const cleaned = val.trim();
      const date = new Date(cleaned);

      return date;
    }
    return val;
  }, z.coerce.date({ error: "Data inválida" })).refine(
    (val) => {
      const today = new Date(Date.now());
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);

      return val <= today;
    },
    {
      error: "Data deve ser hoje ou anterior",
    }
  ),
  endDate: preprocess(
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
});

export type Schema = z.infer<typeof schema>;
