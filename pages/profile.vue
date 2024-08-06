<script lang="ts" setup>
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { profileFormSchema } from "~/validations/profileFormSchema";
import { toast } from "~/components/ui/toast";
import { format } from "date-fns";

const { getProfile, updateProfile } = useMerchants();
const isError = ref(false);
const data = ref<Merchant>();
const isSubmitting = ref(false);
const isLoading = ref(false);

const form = useForm({
  validationSchema: profileFormSchema,
});

// Function to format date to YYYY-MM-DD
const formatDate = (date: string | Date): string => {
  return format(new Date(date), "yyyy-MM-dd");
};

try {
  isLoading.value = true;
  data.value = await getProfile(); // Call your API function to fetch profile
  console.log("Profile data; ", data.value);
  form.setValues({
    ...data.value,
    tradeLicenseIssueDate: formatDate(data.value.tradeLicenseIssueDate),
    tradeLicenseExpiryDate: formatDate(data.value.tradeLicenseExpiryDate),
    taxPayerIssueDate: formatDate(data.value.taxPayerIssueDate),
    taxPayerExpiryDate: formatDate(data.value.taxPayerExpiryDate),
  });

  form.setFieldValue("city", data.value.address.city);
  form.setFieldValue("businessEmail", data.value.address.businessEmail);
  form.setFieldValue("postalNumber", data.value.address.postalNumber);
} catch (error) {
  console.error("Error fetching profile:", error);
  toast({
    title: "Uh oh! Something went wrong.",
    description: `There was a problem with your request: ${error}`,
    variant: "destructive",
  });
} finally {
  isLoading.value = false;
}

const onSubmit = form.handleSubmit(async (values: any) => {
  const merchantData = {
    ...values,
    tradeLicenseIssueDate: new Date(values.tradeLicenseIssueDate).toISOString(),
    tradeLicenseExpiryDate: new Date(
      values.tradeLicenseExpiryDate
    ).toISOString(),
    taxPayerIssueDate: new Date(values.taxPayerIssueDate).toISOString(),
    taxPayerExpiryDate: new Date(values.taxPayerExpiryDate).toISOString(),
  };

  try {
    isSubmitting.value = true;
    data.value = await updateProfile(merchantData); // Call your API function to fetch profile
    console.log("New Merchant data; ", data.value);
    toast({
      title: "Merchant Updated",
      description: "Merchant profile updated successfully",
    });
  } catch (err: any) {
    console.error("Error updating merchant profile:", err.message);
    toast({
      title: "Merchant Update Error",
      variant: "destructive",
      description: err.message,
    });
    isError.value = true;
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <div class="pt-4">
      <h1 class="md:text-2xl text-lg font-medium">Profile</h1>
      <p class="text-sm text-muted-foreground">Update your profile</p>
    </div>

    <UiCard class="p-6 space-y-8" v-if="isLoading">
      <div class="grid grid-cols-2 gap-8">
        <UiSkeleton class="h-16 w-full" />
        <UiSkeleton class="h-16 w-full" />
        <UiSkeleton class="h-16 w-full" />
        <UiSkeleton class="h-16 w-full" />
        <UiSkeleton class="h-16 w-full" />
        <UiSkeleton class="h-16 w-full" />
        <UiSkeleton class="h-16 w-full" />
        <UiSkeleton class="h-16 w-full" />
      </div>
      <div class="w-full flex justify-between">
        <UiSkeleton class="h-16 w-1/5" />
        <UiSkeleton class="h-16 w-1/5" />
      </div>
    </UiCard>

    <UiCard v-else class="p-6">
      <form @submit="onSubmit">
        <div class="grid md:grid-cols-2 gap-6">
          <FormField v-slot="{ componentField }" name="merchantId">
            <FormItem>
              <FormLabel>Merchant Id </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  disabled
                  placeholder="Enter merchant id"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="businessName">
            <FormItem>
              <FormLabel>Business Name </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter customer business Name"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="businessPhoneNumber">
            <FormItem>
              <FormLabel>Business Phone Number </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter customer business phone number"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="businessNumber">
            <FormItem>
              <FormLabel> Business Number </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter customer business number"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="businessType">
            <FormItem>
              <FormLabel> Business Type </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter customer business type"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="city">
            <FormItem>
              <FormLabel> City </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter city"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="businessEmail">
            <FormItem>
              <FormLabel>Business Email </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter business email"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="postalNumber">
            <FormItem>
              <FormLabel> Postal Number </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter postal number"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="shortCode">
            <FormItem>
              <FormLabel> Short Code </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter short code"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="faxNumber">
            <FormItem>
              <FormLabel> Fax Number </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter fax number"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="tradeLicenseNumber">
            <FormItem>
              <FormLabel> Trade License Number </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter trade license number"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="tradeLicenseIssueDate">
            <FormItem>
              <FormLabel> Trade License Issue Date </FormLabel>
              <FormControl>
                <UiInput
                  type="date"
                  placeholder="Enter trade license Issue Date"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="tradeLicenseExpiryDate">
            <FormItem>
              <FormLabel> Trade License Expiry Date </FormLabel>
              <FormControl>
                <UiInput
                  type="date"
                  placeholder="Enter trade license expiry date"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="taxPayerIdNumber">
            <FormItem>
              <FormLabel> Tax Payer Id Number </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter tax payer id number"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="taxPayerIssueDate">
            <FormItem>
              <FormLabel> Tax Payer Issue Date </FormLabel>
              <FormControl>
                <UiInput
                  type="date"
                  placeholder="Enter tax payer issue date"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="taxPayerExpiryDate">
            <FormItem>
              <FormLabel> Tax Payer Expiry Date </FormLabel>
              <FormControl>
                <UiInput
                  type="date"
                  placeholder="Enter tax payer expiry date"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="col-span-full w-full py-4 flex justify-between">
            <UiButton
              :disabled="isSubmitting"
              variant="outline"
              type="button"
              @click="$router.go(-1)"
            >
              Cancel
            </UiButton>
            <UiButton :disabled="isSubmitting" type="submit">
              <Icon
                name="svg-spinners:8-dots-rotate"
                v-if="isSubmitting"
                class="mr-2 h-4 w-4 animate-spin"
              ></Icon>

              Submit
            </UiButton>
          </div>
        </div>
      </form>
    </UiCard>
  </div>
</template>
