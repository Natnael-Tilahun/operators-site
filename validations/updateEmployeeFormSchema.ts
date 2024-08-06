import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const updateEmployeeFormSchema = toTypedSchema(
    z.object({
        merchantOperatorId: z.string(),
        firstName: z.string(),
        middleName: z.string(),
        merchantBranchId: z.string(),
        operatorRole: z.string()
    })
);
