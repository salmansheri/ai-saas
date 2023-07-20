import * as z from "zod";

export const ConversationFormSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required",
  }),
});

export type ConversationFormType = z.infer<typeof ConversationFormSchema>;
