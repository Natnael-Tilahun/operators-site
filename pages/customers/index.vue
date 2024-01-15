<script setup lang="ts">
import { ref, onMounted } from "vue";
import { columns, type Customer } from "~/components/customers/columns";

const data = ref<Customer[]>([]);

async function getData(): Promise<Customer[]> {
  // Fetch data from your API here.
  return [
    {
      customerId: "728ed52f",
      customerPhone: "933665566",
      email: "abebekebede@example.com",
      customerName: "Abebe Kebede",
      accountNumber: "1000179835597",
    },
    {
      customerId: "hh448ed52f",
      customerPhone: "923334455",
      email: "dsdfs@example.com",
      customerName: "Abebe Kebede",
      accountNumber: "1000433433234334",
    },
    {
      customerId: "55ddd52f",
      customerPhone: "911223344",
      email: "dsdsd@example.com",
      customerName: "Abebe Kebede",
      accountNumber: "1000433433234334",
    },
    {
      customerId: "gg33d52f",
      customerPhone: "944554433",
      email: "ggdfd@example.com",
      customerName: "Abebe Kebede",
      accountNumber: "1000433433234334",
    },
    {
      customerId: "728ed52f",
      customerPhone: "974635322",
      email: "m@example.com",
      customerName: "Abebe Kebede",
      accountNumber: "1000433433234334",
    },
    {
      customerId: "728ed52f",
      customerPhone: "923453322",
      email: "m@example.com",
      customerName: "Abebe Kebede",
      accountNumber: "1000433433234334",
    },
    {
      customerId: "728ed52f",
      customerPhone: "964534222",
      email: "m@example.com",
      customerName: "Abebe Kebede",
      accountNumber: "1000433433234334",
    },
    {
      customerId: "728ed52f",
      customerPhone: "933665566",
      email: "m@example.com",
      customerName: "Abebe Kebede",
      accountNumber: "1000433433234334",
    },
    {
      customerId: "728ed52f",
      customerPhone: "933665566",
      email: "m@example.com",
      customerName: "Abebe Kebede",
      accountNumber: "1000433433234334",
    },
    {
      customerId: "728ed52f",
      customerPhone: "933665566",
      email: "m@example.com",
      customerName: "Abebe Kebede",
      accountNumber: "1000433433234334",
    },
    {
      customerId: "728ed52f",
      customerPhone: "933665566",
      email: "m@example.com",
      customerName: "Abebe Kebede",
      accountNumber: "1000433433234334",
    },
    {
      customerId: "728ed52f",
      customerPhone: "933665566",
      email: "m@example.com",
      customerName: "Abebe Kebede",
      accountNumber: "1000433433234334",
    },
    {
      customerId: "728ed52f",
      customerPhone: "933665566",
      email: "m@example.com",
      customerName: "Abebe Kebede",
      accountNumber: "1000433433234334",
    },
    {
      customerId: "728ed52f",
      customerPhone: "933665566",
      email: "m@example.com",
      customerName: "Abebe Kebede",
      accountNumber: "1000433433234334",
    },
    // ...
  ];
}

onMounted(async () => {
  data.value = await getData();
});
</script>

<!-- Render DataTable only if data is available -->
<template>
  <div v-if="data.length > 0" class="flex flex-col space-y-0 mx-auto">
    <!-- <UiButton class="w-fit self-end px-5"
      ><Icon name="material-symbols:add" size="24" class="mr-2"></Icon>Create
      Customer</UiButton
    > -->

    <UiDataTable :columns="columns" :data="data">
      <template v-slot:toolbar="{ table }">
        <CustomersDataTableSearchbar :table="table" />
      </template>
    </UiDataTable>
  </div>
  <div v-else class="py-10 flex justify-center w-full">
    <UiLoading />
  </div>
</template>
