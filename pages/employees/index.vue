<script setup lang="ts">
import { ref, onMounted } from "vue";
import { columns } from "~/components/employees/columns";

const { getEmployees } = useEmployees();
const isError = ref(false);
const isLoading = ref(false);
const data = ref<Employee[]>([]);

try {
  isLoading.value = true;
  data.value = await getEmployees();
} catch (error) {
  console.error("Getting employees error: ", error);
  isError.value = true;
} finally {
  isLoading.value = false;
}

const refetch = async () => {
  try {
    isLoading.value = true;
    data.value = await getEmployees();
  } catch (error) {
    console.error("Getting employees error: ", error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>

<!-- Render DataTable only if data is available -->
<template>
  <div v-if="isLoading" class="py-10 flex justify-center w-full">
    <UiLoading />
  </div>
  <div v-else-if="data && !isError" class="flex flex-col space-y-8 mx-auto">
    <NuxtLink to="/employees/new" class="w-fit self-end">
      <UiButton class="w-fit self-end px-5"
        ><Icon name="material-symbols:add" size="24" class="mr-2"></Icon>Add
        Employee</UiButton
      >
    </NuxtLink>

    <UiDataTable :columns="columns" :data="data">
      <template v-slot:toolbar="{ table }">
        <CustomersDataTableSearchbar :table="table" />
      </template>
    </UiDataTable>
  </div>
  <div v-else-if="isError">
    <UiErrorMessage :retry="refetch" title="Something went wrong." />
  </div>
</template>
