import { z } from "zod";

export const sujimonSchema = z.object({
  name: z.string().min(1),
  id_num: z.coerce.number().int().positive(),
  category: z.string().min(1),
  common_locations: z.string().min(1),
  rarity: z.coerce.number().int().min(1).max(5),
  skills: z.string().min(1),
  weaknesses: z.string().min(1),
  drops: z.string().min(1),
  image: z.string().url().optional(),
  description: z.string().optional(),
});
