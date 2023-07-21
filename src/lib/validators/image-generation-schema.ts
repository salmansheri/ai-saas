import * as z from "zod";

export const ImageGenerationSchema = z.object({
  prompt: z.string().min(1, {
    message: "Image Prompt is required",
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export type ImageGenerationType = z.infer<typeof ImageGenerationSchema>;
