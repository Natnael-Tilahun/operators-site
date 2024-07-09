<script setup lang="ts">
import { ref } from "vue";
import { columns } from "~/components/branches/columns";

const { getBranches } = useBranches();
const isError = ref(false);
const isLoading = ref(false);
const data = ref<Branch[]>([]);

try {
  isLoading.value = true;
  data.value = await getBranches();
  console.log("data: ", data.value);
} catch (error) {
  console.error("Getting branches error: ", error);
} finally {
  isLoading.value = false;
}

const refetch = async () => {
  try {
    isLoading.value = true;
    data.value = await getBranches();
    console.log("data: ", data.value);
  } catch (error) {
    console.error("Getting branches error: ", error);
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
  <div v-else class="flex flex-col space-y-8 mx-auto">
    <NuxtLink to="/branches/new" class="w-fit self-end">
      <UiButton class="w-fit self-end px-5"
        ><Icon name="material-symbols:add" size="24" class="mr-2"></Icon>Add
        Branch</UiButton
      >
    </NuxtLink>
    <UiDataTable :columns="columns" :data="data">
      <template v-slot:toolbar="{ table }">
        <!-- <branchesDataTableSearchbar :table="table" /> -->
      </template>
    </UiDataTable>
  </div>
  <div v-if="isError">
    <UiErrorMessage :retry="refetch" title="Something went wrong." />
  </div>
</template>
