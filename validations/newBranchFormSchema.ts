import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const newBranchFormSchema = toTypedSchema(
    z.object({
        branchName: z.string(),
        branchCode: z.string(),
        city: z.string().optional(),
        businessEmail: z.string().optional(),
        businessPhoneNumber: z.string(),
        postalNumber: z.string().optional(),
        faxNumber: z.string().optional(),
    })
);
