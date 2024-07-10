import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const resetEmployeePasswordFormSchema = toTypedSchema(
    z.object({
        merchantEmployeeId: z.string(),
        newPassword: z.string(),
    })
);
