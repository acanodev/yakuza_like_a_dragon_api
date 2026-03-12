import { z } from "zod";

/* 
Com els sujimon tenen més d'un camp de tipus array,
fem un esquema general per a transformar els strings 
separats per ","
*/
const arraySchema = z
  .string()
  .min(1)
  .transform((val) => 
    val.split(",").map((el) => el.trim())
  );

export const sujimonSchema = z.object({
    name: z.string().min(1),
    id_num: z.coerce.number().int().positive(),
    category: z.string().min(1),
    common_locations: arraySchema,
    rarity: z.number().int().min(1).max(5),
    skills: arraySchema,
    weaknesses: arraySchema,
    drops: arraySchema,
    image: z.string().url().optional(),
    description: z.string().optional(),
});
