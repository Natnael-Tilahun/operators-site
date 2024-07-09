
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const customerLoginFormSchema = toTypedSchema(
  z.object({
    username: z.string({ required_error: "Username is required." }),
    password: z.string().min(4),
    rememberMe: z.boolean().optional().default(false),
  })
);
