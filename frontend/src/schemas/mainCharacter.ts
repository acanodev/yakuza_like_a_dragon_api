import { z } from "zod";

// Conversió d'string separat per "," que arriba des del formulari a array d'strings
const jobsSchema = z
  .string()
  .min(1)
  .transform((val) =>
    val.split(",").map((job) => job.trim())
  );

export const mainCharacterSchema = z.object({
  name: z.string().min(1),
  id_num: z.number().int().positive(),
  jobs: jobsSchema, // A l'schema utilitzem jobSchema per validar la conversió directament.
  image: z.string().url().optional(),
  description: z.string().min(1).optional(),
});