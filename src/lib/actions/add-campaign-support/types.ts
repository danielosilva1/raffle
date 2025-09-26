import z, { preprocess } from "zod";

export const schema = z.object({
  supporterUserId: z.string(),
  supporterName: z.string().min(1, { error: "Este campo é obrigatório" }),
  message: preprocess((val) => {
    if (typeof val === "string") {
      const cleaned = val.trim();

      if (cleaned === "") {
        return null;
      }

      return cleaned;
    }
    return val;
  }, z.string().min(1, { error: "A mensagem deve ter pelo menos 1 caractere" }).nullable()),
  campaignId: z.string(),
});

export type Schema = z.infer<typeof schema>;
