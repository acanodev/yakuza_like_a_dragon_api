import { z } from "zod";

export const mainCharacterSchema = z.object({
  name: z.string().min(1),
  id_num: z.coerce.number().int().positive(),
  jobs: z.string(),
  image: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)) // converteix "" a undefined
    .refine((val) => !val || /^https?:\/\/.+$/.test(val), {
      message: "URL inválida",
    }),
  description: z.string().optional(),
});
