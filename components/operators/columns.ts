import type { ColumnDef } from "@tanstack/vue-table";

import { Checkbox } from "../ui/checkbox";
import DataTableColumnHeaderVue from "../ui/dataTable/ColumnHeader.vue";
import EmployeeDataTableRowActionsVue from "./DataTableRowActions.vue";

export const columns: ColumnDef<Employee>[] = [
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
    accessorKey: "merchantOperatorId",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Operator Id" }),
    cell: ({ row }) => {
      const merchantOperatorId = row.getValue("merchantOperatorId");
      return merchantOperatorId ? h(
        "div",
        { class: "w-[100px] whitespace-nowrap truncate hover:w-full font-medium" },
        row.getValue("merchantOperatorId")
      ) : h("p", "-");
    },
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Full Name" }),
    cell: ({ row }) => {
      const fullName = row.getValue("fullName");
      return fullName ? h("p", fullName) : h("p", "-");
    },
  },
  {
    accessorKey: "operatorRole",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Operator Role" }),
    cell: ({ row }) => {
      const operatorRole = row.getValue("operatorRole");
      return operatorRole ? h("p", operatorRole) : h("p", "-");
    },
  },
  {
    accessorKey: "merchantBranch",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Merchant Branch" }),
    cell: ({ row }) => {
      const merchantBranch = row.getValue("merchantBranch");
      return merchantBranch ? h(
        "div",
        { class: "w-[100px] whitespace-nowrap truncate hover:w-full font-medium" },
        (merchantBranch as Branch).merchantBranchId
      ) : h("p", "-");
      // return merchantBranch ? h("p", (merchantBranch as Branch).merchantBranchId) : h("p", "-");
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
