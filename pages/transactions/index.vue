<script setup lang="ts">
import { ref, computed } from "vue";
import { columns } from "~/components/transactions/columns";
import { useTransactions } from "~/composables/useTransactions";

const { getTransactions } = useTransactions();
const data = ref<Transaction[]>([]);
const isLoading = ref(true);
const isError = ref(false);

const initiatorOptions = computed(() => [
  { value: "", label: "All Initiators" },
  ...[
    "MERCHANT_INITIATED",
    "MERCHANT_OPERATOR_INITIATED",
    "PAYER_INITIATED",
    "NONE",
  ].map((initiator) => ({
    value: initiator,
    label: initiator.replace(/_/g, " ").toLowerCase(),
  })),
]);

const filterValue = ref("");

const handleFilter = (table: any) => {
  table.getColumn("payerName")?.setFilterValue(filterValue.value);
  table.getColumn("payerAccountNumber")?.setFilterValue(filterValue.value);
};

try {
  data.value = await getTransactions();
} catch (error) {
  console.error("Error fetching transactions:", error);
  isError.value = true;
} finally {
  isLoading.value = false;
}

const refetch = async () => {
  try {
    isLoading.value = true;
    data.value = await getTransactions();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <div class="flex justify-between pt-4">
      <div>
        <h1 class="md:text-2xl text-lg font-medium">Transactions</h1>
        <p class="text-sm text-muted-foreground">
          View and manage transactions
        </p>
      </div>
      <NuxtLink to="/transactions/initiate" class="w-fit self-end">
        <UiButton class="w-fit self-end px-5"
          ><Icon name="material-symbols:add" size="24" class="mr-2"></Icon
          >Initiate Transaction</UiButton
        >
      </NuxtLink>
    </div>
    <div v-if="isLoading" class="py-10 flex justify-center w-full">
      <UiLoading />
    </div>

    <UiCard v-else-if="data && !isError" class="p-6">
      <UiDataTable :columns="columns" :data="data">
        <template v-slot:toolbar="{ table }">
          <div class="flex flex-1 items-center space-x-2">
            <UiInput
              placeholder="Filter by payer name or account number"
              v-model="filterValue"
              class="h-8 w-[250px] lg:w-[350px]"
              @input="handleFilter(table)"
            />
          </div>
        </template>
      </UiDataTable>
    </UiCard>

    <div v-else-if="isError">
      <UiErrorMessage :retry="refetch" title="Something went wrong." />
    </div>
  </div>
</template>
