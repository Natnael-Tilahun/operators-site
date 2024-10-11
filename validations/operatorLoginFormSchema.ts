
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const operatorLoginFormSchema = toTypedSchema(
  z.object({
    merchantShortCode: z.string({ required_error: "merchantShortCode is required." }),
    password: z.string({ required_error: "password is required." }).min(4),
    operatorCode: z.string({ required_error: "operatorCode is required." }),
  })
);
