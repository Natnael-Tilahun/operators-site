import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const updateBranchFormSchema = toTypedSchema(
    z.object({
        merchantBranchId: z.string(),
        branchName: z.string(),
        branchCode: z.string(),
        city: z.string().optional().nullable(),
        businessEmail: z.string().optional().nullable(),
        businessPhoneNumber: z.string(),
        postalNumber: z.string().optional().nullable(),
        faxNumber: z.string().optional().nullable(),
    })
);
