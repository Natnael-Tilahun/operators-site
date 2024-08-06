<script lang="ts" setup>
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ref } from "vue";
import { toast } from "~/components/ui/toast";
import { newEmployeeFormSchema } from "~/validations/newEmployeeFormSchema";
const { createEmployee } = useEmployees();
const { getBranches } = useBranches();

const isError = ref(false);
const data = ref<Employee>();
const isSubmitting = ref(false);
const isLoading = ref(false);
const branchData = ref<Branch[]>([]);
type OperatorRole = "ADMIN" | "MANAGER" | "ATTENDANT" | "SUPERVISOR" | "NONE";
const operatorRoleData = ref<OperatorRole[]>([
  "ADMIN",
  "MANAGER",
  "ATTENDANT",
  "SUPERVISOR",
  "NONE",
]);

const form = useForm({
  validationSchema: newEmployeeFormSchema,
});

try {
  isLoading.value = true;
  branchData.value = await getBranches();
} catch (error) {
  console.error("Getting branches error: ", error);
} finally {
  isLoading.value = false;
}

const onSubmit = form.handleSubmit(async (values: any) => {
  try {
    isSubmitting.value = true;
    const employeeData = {
      ...values,
      fullName: values.firstName + " " + values.middleName,
    };
    console.log("employeeData:", employeeData);
    data.value = await createEmployee(employeeData); // Call your API function to fetch profile
    navigateTo(`/operators`);
    console.log("New operator data; ", data.value);
    toast({
      title: "Operator Created",
      description: "Operator created successfully",
    });
  } catch (err: any) {
    console.error("Error creating new operator:", err.message);
    isError.value = true;
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <div class="w-full h-full flex flex-col gap-8">
    <div class="pt-4">
      <h1 class="md:text-2xl text-lg font-medium">Create New Operator</h1>
      <p class="text-sm text-muted-foreground">
        Create new operator by including First Name, Last Name, Username,
        Password, Branch Id
      </p>
    </div>

    <UiCard class="w-full flex border-[1px] rounded-lg h-full">
      <div value="roleDetails" class="text-sm md:text-base p-6 basis-full">
        <form @submit="onSubmit">
          <div class="grid md:grid-cols-2 gap-6">
            <FormField v-slot="{ componentField }" name="firstName">
              <FormItem>
                <FormLabel>First Name </FormLabel>
                <FormControl>
                  <UiInput
                    type="text"
                    placeholder="Enter first name"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="middleName">
              <FormItem>
                <FormLabel>Middle Name </FormLabel>
                <FormControl>
                  <UiInput
                    type="text"
                    placeholder="Enter middle name"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="username">
              <FormItem>
                <FormLabel> Username </FormLabel>
                <FormControl>
                  <UiInput
                    type="text"
                    placeholder="Enter username"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel> Password </FormLabel>
                <FormControl>
                  <UiInput
                    type="text"
                    placeholder="Enter password"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="operatorRole">
              <FormItem>
                <FormLabel>Operator Role</FormLabel>

                <UiSelect v-bind="componentField">
                  <FormControl>
                    <UiSelectTrigger>
                      <UiSelectValue placeholder="Select operator role" />
                    </UiSelectTrigger>
                  </FormControl>
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectItem
                        v-for="role in operatorRoleData"
                        :key="role"
                        :value="role"
                      >
                        {{ role }}
                      </UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="branchId">
              <FormItem>
                <FormLabel>Branch Id</FormLabel>

                <UiSelect v-bind="componentField">
                  <FormControl>
                    <UiSelectTrigger>
                      <UiSelectValue placeholder="Select branch" />
                    </UiSelectTrigger>
                  </FormControl>
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectItem
                        v-for="branch in branchData"
                        :key="branch.merchantBranchId"
                        :value="branch.merchantBranchId"
                      >
                        {{ branch.branchName }}
                      </UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
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
      </div>
    </UiCard>
  </div>
</template>
