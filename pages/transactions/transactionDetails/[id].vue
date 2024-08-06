<!-- pages/transactions/[id].vue -->
<script setup lang="ts">
import { ref, onMounted } from "vue";

const route = useRoute();
const { getTransactionById } = useTransactions();
const isLoading = ref(false);
const transactionData = ref<Transaction | null>(null);

try {
  isLoading.value = true;
  const id = route.params.id as string;
  transactionData.value = await getTransactionById(id);
} catch (error) {
  console.error("Error fetching transaction details:", error);
} finally {
  isLoading.value = false;
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <div class="pt-4">
      <h1 class="md:text-2xl text-lg font-medium">Transaction Details</h1>
      <p class="text-sm text-muted-foreground">View transaction information</p>
    </div>

    <UiCard v-if="isLoading" class="p-6">
      <div class="grid md:grid-cols-2 gap-6">
        <UiSkeleton v-for="n in 8" :key="n" class="h-16 w-full" />
      </div>
    </UiCard>

    <UiCard v-else-if="transactionData" class="p-6">
      <div class="grid md:grid-cols-2 gap-6">
        <TransactionsTransactionDetailItem
          label="Merchant Transaction Id"
          :value="transactionData.merchantTransactionId"
        />
        <TransactionsTransactionDetailItem
          label="Merchant Id"
          :value="transactionData.merchantId"
        />
        <TransactionsTransactionDetailItem
          label="Merchant Name"
          :value="transactionData.merchantName"
        />
        <TransactionsTransactionDetailItem
          label="Merchant City"
          :value="transactionData.merchantCity"
        />
        <TransactionsTransactionDetailItem
          label="Merchant Branch Id"
          :value="transactionData.merchantBranchId"
        />
        <TransactionsTransactionDetailItem
          label="Merchant Branch Name"
          :value="transactionData.merchantBranchName"
        />
        <TransactionsTransactionDetailItem
          label="Operator Id"
          :value="transactionData.operatorId"
        />
        <TransactionsTransactionDetailItem
          label="Operator Name"
          :value="transactionData.operatorName"
        />

        <TransactionsTransactionDetailItem
          label="Amount"
          :value="transactionData.amount + ' ' + transactionData.currencyCode"
        />
        <TransactionsTransactionDetailItem
          label="Currency Code"
          :value="transactionData.currencyCode"
        />
        <TransactionsTransactionDetailItem
          label="PaymentReference"
          :value="transactionData.paymentReference"
        />
        <TransactionsTransactionDetailItem
          label="Tip Amount"
          :value="transactionData.tipAmount"
        />
        <TransactionsTransactionDetailItem
          label="Dynamic Id"
          :value="transactionData.dynamicId"
        />

        <TransactionsTransactionDetailItem
          label="Transaction Status"
          :value="transactionData.paymentStatus"
          :status="true"
        />
        <TransactionsTransactionDetailItem
          label="Expiration Date"
          :value="formatDate(transactionData.expirationDate)"
        />
        <TransactionsTransactionDetailItem
          label="Transaction Initiator"
          :value="transactionData.transactionInitiator"
        />
        <TransactionsTransactionDetailItem
          label="MbTransaction Id"
          :value="transactionData.mbTransactionId"
        />
        <TransactionsTransactionDetailItem
          label="Core Transaction Id"
          :value="transactionData.coreTransactionId"
        />
        <TransactionsTransactionDetailItem
          label="Merchant Account Number"
          :value="transactionData.merchantAccountNumber"
        />
        <TransactionsTransactionDetailItem
          label="Payer AccountNumber"
          :value="transactionData.payerAccountNumber"
        />
        <TransactionsTransactionDetailItem
          label="Payer Id"
          :value="transactionData.payerId"
        />
        <TransactionsTransactionDetailItem
          label="Payer Name"
          :value="transactionData.payerName"
        />
        <TransactionsTransactionDetailItem
          label="Payer Phone"
          :value="transactionData.payerPhone"
        />
      </div>
    </UiCard>

    <UiCard v-else class="p-6">
      <p class="text-center text-muted-foreground">Transaction not found.</p>
    </UiCard>
  </div>
</template>
