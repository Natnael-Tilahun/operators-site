import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const initiatePaymentPushUssdFormSchema = toTypedSchema(
  z
    .object({
      customerPhone: z.string(),
    })
);
