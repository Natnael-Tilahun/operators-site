<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useTransactions } from "~/composables/useTransactions";
import { toast } from "~/components/ui/toast";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const { initiateTransaction } = useTransactions();
const isSubmitting = ref(false);

const formSchema = toTypedSchema(
  z.object({
    amount: z.number().min(0),
    paymentReference: z.string().min(1),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

type TransactionResult = { merchantTransactionId: string };

const onSubmit = form.handleSubmit(async (values) => {
  try {
    isSubmitting.value = true;
    const result = (await initiateTransaction(values)) as TransactionResult;
    toast({
      title: "Transaction Initiated",
      description: `Transaction ID: ${result.merchantTransactionId}`,
    });
    form.resetForm();
    navigateTo(`/transactions`);
  } catch (error) {
    console.error("Error initiating transaction:", error);
    toast({
      title: "Error",
      description: "Failed to initiate transaction",
      variant: "destructive",
    });
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <div>
      <h1 class="md:text-2xl text-lg font-medium">Initiate Transaction</h1>
      <p class="text-sm text-muted-foreground">Create a new transaction</p>
    </div>

    <UiCard class="p-6">
      <form @submit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="amount">
          <FormItem>
            <FormLabel>Amount</FormLabel>
            <FormControl>
              <UiInput
                type="number"
                placeholder="Enter amount"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="paymentReference">
          <FormItem>
            <FormLabel>Payment Reference</FormLabel>
            <FormControl>
              <UiInput
                type="text"
                placeholder="Enter payment reference"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <UiButton type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "Initiating..." : "Initiate Transaction" }}
        </UiButton>
      </form>
    </UiCard>
  </div>
</template>
