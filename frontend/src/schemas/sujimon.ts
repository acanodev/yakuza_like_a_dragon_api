import { z } from "zod";

export const sujimonSchema = z.object({
  name: z.string().min(1),
  id_num: z.coerce.number().int().positive(),
  category: z.string().min(1),
  common_locations: z.string().min(1),
  rarity: z.coerce.number().int().min(1).max(5),
  skills: z.string().min(1),
  weaknesses: z.string().min(1),
  drops: z.string(),
  image: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)) // converteix "" a undefined
    .refine((val) => !val || /^https?:\/\/.+$/.test(val), {
      message: "URL inválida",
    }),
  description: z.string().optional(),
});
