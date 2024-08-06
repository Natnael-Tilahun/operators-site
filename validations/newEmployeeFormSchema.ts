import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const newEmployeeFormSchema = toTypedSchema(
    z.object({
        firstName: z.string(),
        middleName: z.string(),
        username: z.string(),
        password: z.string(),
        branchId: z.string(),
        operatorRole: z.string()
    })
);
