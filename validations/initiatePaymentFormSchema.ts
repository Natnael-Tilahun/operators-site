import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const initiatePaymentFormSchema = toTypedSchema(
  z
    .object({
      amount: z.string(),
      paymentReference: z.string(),
    })
);
