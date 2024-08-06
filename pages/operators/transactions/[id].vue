<script setup lang="ts">
import { ref } from "vue";
import { columns } from "~/components/transactions/columns";
import { useTransactions } from "~/composables/useTransactions";

const { getTransactionsByOperatorId } = useTransactions();
const data = ref<Transaction[]>([]);
const isLoading = ref(true);
const isError = ref(false);
const route = useRoute();
const filterValue = ref("");

const handleFilter = (table: any) => {
  table.getColumn("payerName")?.setFilterValue(filterValue.value);
  table.getColumn("payerAccountNumber")?.setFilterValue(filterValue.value);
};

try {
  const id = route.params.id as string;
  data.value = await getTransactionsByOperatorId(id);
} catch (error) {
  console.error("Error fetching transactions:", error);
  isError.value = true;
} finally {
  isLoading.value = false;
}

const refetch = async () => {
  try {
    const id = route.params.id as string;
    isLoading.value = true;
    data.value = await getTransactionsByOperatorId(id);
  } catch (error) {
    console.error("Error fetching operator transactions:", error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <div>
      <h1 class="md:text-2xl text-lg font-medium">
        {{ data[0]?.operatorName && "Operator" + data[0]?.operatorName }}
        Transactions
      </h1>
      <p class="text-sm text-muted-foreground">View and manage transactions</p>
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
