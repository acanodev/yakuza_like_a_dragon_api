import { z } from "zod";

export const mainCharacterSchema = z.object({
  name: z.string().min(1),
  id_num: z.coerce.number().int().positive(),
  jobs: z.string().min(1),
  image: z.string().url().optional(),
  description: z.string().optional(),
});