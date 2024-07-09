import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const newMerchantFormSchema = toTypedSchema(
    z.object({
        businessType: z.string().optional(),
        businessNumber: z.string(),
        businessName: z.string(),
        tradeLicenseNumber: z.string().optional(),
        tradeLicenseIssueDate: z.string().optional(),
        tradeLicenseExpiryDate: z.string().optional(),
        taxPayerIdNumber: z.string().optional(),
        taxPayerIssueDate: z.string().optional(),
        taxPayerExpiryDate: z.string().optional(),
        city: z.string().optional(),
        businessEmail: z.string().optional(),
        businessPhoneNumber: z.string(),
        postalNumber: z.string().optional(),
        faxNumber: z.string().optional(),
        shortCode: z.string().optional(),
    })
);
