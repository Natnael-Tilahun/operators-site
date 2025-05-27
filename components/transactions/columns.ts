import type { ColumnDef } from "@tanstack/vue-table";
import { Checkbox } from "../ui/checkbox";
import DataTableColumnHeaderVue from "~/components/ui/dataTable/ColumnHeader.vue";
import TransactionsDataTableRowActionsVue from "./DataTableRowActions.vue";
import { NuxtLink } from "#components";
import type { Transaction } from "~/types";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        "onUpdate:checked": (value: boolean) =>
          table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "payerName",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Payer Name" }),
    cell: ({ row }) => {
      const payerName = row.getValue("payerName");
      const merchantTransactionId = row.original.merchantTransactionId;
      const route = useRoute();
      return h(
        NuxtLink,
        {
          class:
            "font-medium text-primary w-fit whitespace-nowrap truncate hover:w-full",
          to: merchantTransactionId ? `${route.path}/transactionDetails/${merchantTransactionId}` : route.path,
        },
        payerName || "View"
      ) 
    },
  },
  {
    accessorKey: "payerAccountNumber",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Payer Account Number" }),
    cell: ({ row }) => {
      const payerAccountNumber = row.getValue("payerAccountNumber");
      return payerAccountNumber ? h("p", payerAccountNumber) : h("p", "-");
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Amount" }),
  },
  {
    accessorKey: "tipAmount",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "tipAmount" }),
  },
  {
    accessorKey: "currencyCode",
    header: ({ column }) =>
      h(DataTableColumnHeaderVue, { column, title: "currencyCode" }),
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "paymentStatus" }),
  },
  {
    accessorKey: "paymentReference",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "paymentReference" }),
  },
  {
    accessorKey: "transactionInitiator",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "transactionInitiator" }),
  },
  {
    accessorKey: "expirationDate",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Expiration Date" }),
    cell: ({ row }) => new Date(row.getValue("expirationDate")).toLocaleDateString(),
  },
  {
    accessorKey: "completedDate",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Completed Date" }),
    cell: ({ row }) => new Date(row.getValue("completedDate")).toLocaleDateString(),
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return h(
        "div",
        { class: "relative" },
        h(TransactionsDataTableRowActionsVue, {
          row,
        })
      );
    },
  },
];
