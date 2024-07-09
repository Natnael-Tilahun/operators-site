import type { ColumnDef } from "@tanstack/vue-table";

import { Checkbox } from "../ui/checkbox";
import DataTableColumnHeaderVue from "../ui/dataTable/ColumnHeader.vue";
import CustomerDataTableRowActionsVue from "./DataTableRowActions.vue";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Customer {
  customerId: string;
  customerPhone: string;
  email: string;
  customerName: string;
  accountNumber: string;
}

export const columns: ColumnDef<Customer>[] = [
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
    accessorKey: "customerId",
    header: "Customer Id",
  },
  {
    accessorKey: "customerPhone",
    header: "Phone",
  },
  { accessorKey: "customerName", header: "Customer Name" },
  {
    accessorKey: "email",
    header: ({ column }) =>
      h(DataTableColumnHeaderVue, { column, title: "Email" }),

    cell: ({ row }) =>
      h(
        "div",
        {
          class: "lowercase max-w-[210px] truncate '",
        },
        row.getValue("email")
      ),
  },
  { accessorKey: "accountNumber", header: "Account Number" },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return h(
        "div",
        { class: "relative" },
        h(CustomerDataTableRowActionsVue, {
          row,
        })
      );
    },
  },
];
