<script setup lang="ts">
import { type Table } from "@tanstack/vue-table";
import { computed } from "vue";
// import { type Task } from "../data/schema";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const props = defineProps<DataTableToolbarProps<any>>();

const hideAdvancedSearch = ref<boolean>(true);
const customerPhone = ref();

const clearAllFilters = () => {
  const columnKeys = [
    "customerPhone",
    "email",
    "userId",
    "customerId",
    "customerName",
    "accountNumber",
    "identification",
    // Add other column keys here if needed
  ];

  columnKeys.forEach((key) => {
    const column = props.table.getColumn(key);
    if (column) {
      column.setFilterValue("");
    }
  });
};

// const isFiltered = computed(
//   () => props.table.getState().columnFilters.length > 0
// );
</script>

<template>
  <UiCard
    class="flex flex-col gap-2 w-full lg:w-1/2 rounded-lg p-4 md:p-6 border-[1px] mb-6 h-full justify-between"
  >
    <h1 class="text-left pb-2">Search Customer By</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
      <UiInput
        placeholder="Phone Number"
        :model-value="(table.getColumn('customerPhone')?.getFilterValue() as string) ?? ''"
        class="h-10"
        @input="
          table.getColumn('customerPhone')?.setFilterValue($event.target.value)
        "
        ref="customerPhone"
      />
      <UiInput
        placeholder="Account Number"
        :model-value="(table.getColumn('accountNumber')?.getFilterValue() as string) ?? ''"
        class="h-10"
        @input="
          table.getColumn('accountNumber')?.setFilterValue($event.target.value)
        "
      />
    </div>
  </UiCard>
  <DataTableViewOptionsVue :table="table" />
</template>
