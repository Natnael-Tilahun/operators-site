<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import { toast } from "../ui/toast";
const { deleteBranch } = useBranches();
const isLoading = ref(false);
const isError = ref(false);
const route = useRoute();

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
const props = defineProps<DataTableRowActionsProps<any>>();

function viewBranchDetail(id: string) {
  navigateTo(`/branches/branchDetails/${id}`);
  navigator.clipboard.writeText(id);
}

function viewTransactionHistory(id: string) {
  navigateTo(`/branches/transactions/${id}`);
}

function viewOperators(id: string) {
  navigateTo(`/branches/operators/${id}`);
}

async function deleteMerchants(id: string) {
  try {
    isLoading.value = true;
    await deleteBranch(id); // Call your API function to fetch roles
    console.log("Branch deleted successfully");
    toast({
      title: "Branch deleted successfully",
    });
    // Reload the window after deleting the role
    window.location.reload();
  } catch (err) {
    console.error("Error deleting merchant:", err);
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
        @click="viewBranchDetail(row.original.merchantBranchId)"
        >View Branch</UiDropdownMenuItem
      >
      <UiDropdownMenuItem
        @click="viewTransactionHistory(row.original.merchantBranchId)"
        >Transaction History</UiDropdownMenuItem
      >
      <UiDropdownMenuItem @click="viewOperators(row.original.merchantBranchId)"
        >Operators</UiDropdownMenuItem
      >
      <UiDropdownMenuItem
        @click="deleteMerchants(row.original.merchantBranchId)"
        class="text-red-600"
      >
        Delete
        <UiDropdownMenuShortcut>⌘⌫</UiDropdownMenuShortcut>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
