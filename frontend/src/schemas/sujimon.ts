import { z } from "zod";
export const sujimonSchema = z.object({
  name: z.string().min(1).transform((val) => (val.trim() === "" ? undefined : val)),
  id_num: z.coerce.number().int().positive(),
  category: z.string().min(1).transform((val) => (val.trim() === "" ? undefined : val)),
  common_locations: z
    .string()
    .min(1)
    .transform((val) => (val.trim() === "" ? undefined : val)),
  rarity: z.coerce.number().int().min(1).max(5),
  skills: z
    .string()
    .min(1)
    .transform((val) => (val.trim() === "" ? undefined : val)),
  weaknesses: z
    .string()
    .min(1)
    .transform((val) => (val.trim() === "" ? undefined : val)),
  drops: z
    .string()
    .optional()
    .transform((val) => (val?.trim() === "" ? undefined : val)),
  image: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)) // converteix "" a undefined
    .refine((val) => !val || /^https?:\/\/.+$/.test(val)),
  description: z.string().optional(),
});
