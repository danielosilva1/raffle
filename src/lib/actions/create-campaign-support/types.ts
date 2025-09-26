import z from "zod";

export const schema = z.object({
  supporterName: z.string().min(1, { error: "Este campo é obrigatório" }),
  message: z.string().nullable(),
  campaignId: z.string(),
});

export type Schema = z.infer<typeof schema>;
