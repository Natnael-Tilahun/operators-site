import type { ColumnDef } from "@tanstack/vue-table";

import { Checkbox } from "../ui/checkbox";
import BranchesDataTableRowActionsVue from "./DataTableRowActions.vue";
import DataTableColumnHeaderVue from "~/components/ui/dataTable/ColumnHeader.vue";


export const columns: ColumnDef<Branch>[] = [
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
    accessorKey: "merchantBranchId",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Branch Id" }),
    cell: ({ row }) => {
      const merchantBranchId = row.getValue("merchantBranchId");
      return merchantBranchId ? h(
        "div",
        { class: "w-[100px] whitespace-nowrap truncate hover:w-full font-medium" },
        row.getValue("merchantBranchId")
      ) : h("p", "-");
    },
  },
  {
    accessorKey: "branchName",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Branch Name" }),
    cell: ({ row }) => {
      const branchName = row.getValue("branchName");
      return branchName ? h("p", branchName) : h("p", "-");
    },
  },
  {
    accessorKey: "branchCode",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Branch Code" }),
    cell: ({ row }) => {
      const branchCode = row.getValue("branchCode");
      return branchCode ? h("p", branchCode) : h("p", "-");
    },
  },
  {
    accessorKey: "businessPhoneNumber",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Phone" }),
    cell: ({ row }) => {
      const businessPhoneNumber = row.getValue("businessPhoneNumber");
      return businessPhoneNumber ? h("p", businessPhoneNumber) : h("p", "-");
    },
  },
  {
    accessorKey: "faxNumber",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Fax No" }),
    cell: ({ row }) => {
      const faxNumber = row.getValue("faxNumber");
      return faxNumber ? h("p", faxNumber) : h("p", "-");
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "City" }),
    cell: ({ row }) => {
      const city = (row.getValue("address") as Address).city;
      return city ? h("p", city) : h("p", "-");
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Email" }),
    cell: ({ row }) => {
      const businessEmail = (row.getValue("address") as Address).businessEmail;
      return businessEmail ? h("p", businessEmail) : h("p", "-");
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => h(DataTableColumnHeaderVue, { column, title: "Postal No" }),
    cell: ({ row }) => {
      const postalNumber = (row.getValue("address") as Address).postalNumber;
      return postalNumber ? h("p", postalNumber) : h("p", "-");
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
        h(BranchesDataTableRowActionsVue, {
          row,
        })
      );
    },
  },
];
