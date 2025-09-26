import z from "zod";

export const schema = z.object({
  campaignSupportId: z.string(),
});

export type Schema = z.infer<typeof schema>;
