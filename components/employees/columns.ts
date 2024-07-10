import type { ColumnDef } from "@tanstack/vue-table";

import { Checkbox } from "../ui/checkbox";
import DataTableColumnHeaderVue from "../ui/dataTable/ColumnHeader.vue";
import EmployeeDataTableRowActionsVue from "./DataTableRowActions.vue";

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
    accessorKey: "merchantEmployeeId",
    header: "Merchant Employee Id",
    cell: ({ row }) => {
      const merchantEmployeeId = row.getValue("merchantEmployeeId");
      return merchantEmployeeId ? h(
        "div",
        { class: "w-[100px] whitespace-nowrap truncate hover:w-full font-medium" },
        row.getValue("merchantEmployeeId")
      ) : h("p", "-");
    },
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => {
      const fullName = row.getValue("fullName");
      return fullName ? h("p", fullName) : h("p", "-");
    },
  },
  {
    accessorKey: "merchantBranch",
    header: "Merchant Branch",
    cell: ({ row }) => {
      const merchantBranch = row.getValue("merchantBranch");
      return merchantBranch ? h("p", (merchantBranch as Branch).merchantBranchId) : h("p", "-");
    },
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return h(
        "div",
        { class: "relative" },
        h(EmployeeDataTableRowActionsVue, {
          row,
        })
      );
    },
  },
];
