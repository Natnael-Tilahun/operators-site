<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import { toast } from "../ui/toast";
const { deleteEmployee } = useEmployees();
const isLoading = ref(false);
const isError = ref(false);
const route = useRoute();

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
const props = defineProps<DataTableRowActionsProps<any>>();

function viewEmployeeDetail(id: string) {
  navigateTo(`/operators/operatorDetails/${id}`);
  navigator.clipboard.writeText(id);
}

function viewTransactionHistory(id: string) {
  navigateTo(`/operators/transactions/${id}`);
}

function resetEmployeePassword(id: string) {
  navigateTo(`/operators/resetPassword/${id}`);
}

async function deleteEmployees(id: string) {
  try {
    isLoading.value = true;
    await deleteEmployee(id); // Call your API function to fetch roles
    console.log("Operator deleted successfully");
    toast({
      title: "Operator deleted successfully",
    });
    // Reload the window after deleting the role
    window.location.reload();
  } catch (err) {
    console.error("Error deleting Operator:", err);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton
        variant="ghost"
        class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <Icon name="majesticons:dots-horizontal" class="h-4 w-4"></Icon>
        <span class="sr-only">Open menu</span>
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end" class="w-[160px]">
      <UiDropdownMenuItem
        @click="viewEmployeeDetail(row.original.merchantOperatorId)"
        >View Operator</UiDropdownMenuItem
      >
      <UiDropdownMenuItem
        @click="viewTransactionHistory(row.original.merchantOperatorId)"
        >Transaction History</UiDropdownMenuItem
      >
      <UiDropdownMenuItem
        @click="resetEmployeePassword(row.original.merchantOperatorId)"
        >Reset Password</UiDropdownMenuItem
      >
      <UiDropdownMenuItem
        @click="deleteEmployees(row.original.merchantOperatorId)"
        class="text-red-600"
      >
        Delete
        <UiDropdownMenuShortcut>⌘⌫</UiDropdownMenuShortcut>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
