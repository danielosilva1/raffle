import z from "zod";

export const schema = z.object({
  campaignId: z.string(),
});

export type Schema = z.infer<typeof schema>;
