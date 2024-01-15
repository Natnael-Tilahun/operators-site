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

const isLoading = ref(false);

const form = useForm({
  validationSchema: profileFormSchema,
});

const onSubmit = form.handleSubmit((values: any) => {
  console.log("Form submitted!", values);
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <div class="pb-4">
      <h1 class="md:text-2xl text-lg font-medium">Profile</h1>
      <p class="text-sm text-muted-foreground">Update your profile</p>
    </div>

    <UiCard class="p-6">
      <form @submit="onSubmit">
        <div class="grid grid-cols-2 gap-6">
          <FormField v-slot="{ componentField }" name="firstName">
            <FormItem>
              <FormLabel> First Name </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter First Name"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="lastName">
            <FormItem>
              <FormLabel> Last Name </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter Last Name"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel> Email Address </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter Email Address"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="phone">
            <FormItem>
              <FormLabel> Phone </FormLabel>
              <FormControl>
                <UiInput
                  type="text"
                  placeholder="Enter Phone "
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="col-span-full w-full py-4 flex justify-between">
            <UiButton
              :disabled="isLoading"
              variant="outline"
              type="button"
              size="lg"
              @click="$router.go(-1)"
            >
              Cancel
            </UiButton>
            <UiButton :disabled="isLoading" size="lg" type="submit">
              <Icon
                name="svg-spinners:8-dots-rotate"
                v-if="isLoading"
                class="mr-2 h-4 w-4 animate-spin"
              ></Icon>

              Update
            </UiButton>
          </div>
        </div>
      </form>
    </UiCard>
  </div>
</template>

<style lang="css" scoped></style>
