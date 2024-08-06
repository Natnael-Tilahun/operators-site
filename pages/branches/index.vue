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
} catch (error) {
  console.error("Getting branches error: ", error);
  isError.value = true;
} finally {
  isLoading.value = false;
}

const refetch = async () => {
  try {
    isLoading.value = true;
    data.value = await getBranches();
  } catch (error) {
    console.error("Getting branches error: ", error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>

<!-- Render DataTable only if data is available -->
<template>
  <div class="flex flex-col space-y-8 mx-auto">
    <div class="flex justify-between pt-4">
      <div>
        <h1 class="md:text-2xl text-lg font-medium">Branches</h1>
        <p class="text-sm text-muted-foreground">View and manage branches</p>
      </div>
      <NuxtLink to="/branches/new" class="w-fit self-end">
        <UiButton class="w-fit self-end px-5"
          ><Icon name="material-symbols:add" size="24" class="mr-2"></Icon>Add
          Branch</UiButton
        >
      </NuxtLink>
    </div>
    <div v-if="isLoading" class="py-10 flex justify-center w-full">
      <UiLoading />
    </div>
    <UiCard v-else-if="data && !isError" class="p-6">
      <UiDataTable :columns="columns" :data="data">
        <template v-slot:toolbar="{ table }">
          <div class="flex flex-1 items-center space-x-2">
            <UiInput
              placeholder="Filter by branch name"
              :model-value="(table?.getColumn('branchName')?.getFilterValue() as string) ?? ''"
              class="h-8 w-[150px] lg:w-[250px]"
              @input="
                table
                  ?.getColumn('branchName')
                  ?.setFilterValue($event.target.value)
              "
            />
          </div>
        </template>
      </UiDataTable>
    </UiCard>
    <div v-else-if="isError">
      <UiErrorMessage :retry="refetch" title="Something went wrong." />
    </div>
  </div>
</template>
