import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const profileFormSchema = toTypedSchema(
  z.object({
    firstName: z.string().min(5).max(50),
    lastName: z.string().min(5).max(50),
    email: z.string().min(5).max(50),
    phone: z.string().min(9).max(15),
  })
);
