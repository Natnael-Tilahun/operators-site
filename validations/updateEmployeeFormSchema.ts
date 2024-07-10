import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const updateEmployeeFormSchema = toTypedSchema(
    z.object({
        merchantEmployeeId: z.string(),
        firstName: z.string(),
        middleName: z.string(),
        merchantBranchId: z.string(),
    })
);
