import { z } from "zod";

export const mainCharacterSchema = z.object({
  name: z.string().min(1).transform((val) => (val.trim() === "" ? undefined : val)),
  id_num: z.coerce.number().int().positive(),
  jobs: z
    .string()
    .optional()
    .transform((val) => (val?.trim() === "" ? undefined : val)),
  image: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)) // converteix "" a undefined
    .refine((val) => !val || /^https?:\/\/.+$/.test(val), {
      message: "URL inválida",
    }),
  description: z.string().optional(),
});
