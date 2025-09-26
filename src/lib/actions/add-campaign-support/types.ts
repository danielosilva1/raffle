import z from "zod";

export const schema = z.object({
  supporterUserId: z.string(),
  supporterName: z.string().min(1, { error: "Este campo é obrigatório" }),
  message: z
    .string()
    .min(1, { error: "A mensagem deve ter pelo menos 1 caractere" })
    .nullable(),
  campaignId: z.string(),
});

export type Schema = z.infer<typeof schema>;
