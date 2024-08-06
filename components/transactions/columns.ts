import type { ColumnDef } from "@tanstack/vue-table";
import { Checkbox } from "../ui/checkbox";
import DataTableColumnHeaderVue from "~/components/ui/dataTable/ColumnHeader.vue";
import TransactionsDataTableRowActionsVue from "./DataTableRowActions.vue";

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
    accessorKey: "merchantTransactionId",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Transaction ID" }),
    cell: ({ row }) => {
      const merchantTransactionId = row.getValue("merchantTransactionId");
      return merchantTransactionId ? h(
        "div",
        { class: "w-[100px] whitespace-nowrap truncate hover:w-full font-medium" },
        row.getValue("merchantTransactionId")
      ) : h("p", "-");
    },
  },
  {
    accessorKey: "payerName",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Payer Name" }),
    cell: ({ row }) => {
      const payerName = row.getValue("payerName");
      return payerName ? h("p", payerName) : h("p", "-");
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
