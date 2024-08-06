<script setup lang="ts">
import { ref } from "vue";
import { columns } from "~/components/operators/columns";
import { useEmployees } from "~/composables/useEmployees";

const { getBranchOperators } = useEmployees();
const data = ref<Employee[]>([]);
const isLoading = ref(true);
const isError = ref(false);
const route = useRoute();

try {
  const id = route.params.id as string;
  data.value = await getBranchOperators(id);
} catch (error) {
  console.error("Error fetching branch operators:", error);
  isError.value = true;
} finally {
  isLoading.value = false;
}

const refetch = async () => {
  try {
    const id = route.params.id as string;
    isLoading.value = true;
    data.value = await getBranchOperators(id);
  } catch (error) {
    console.error("Error fetching branch operators:", error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <div>
      <h1 class="md:text-2xl text-lg font-medium">
        {{
          data[0]?.merchantBranch.branchName &&
          "Branch" + data[0]?.merchantBranch.branchName
        }}
        Operators
      </h1>
      <p class="text-sm text-muted-foreground">View and manage operators</p>
    </div>

    <div v-if="isLoading" class="py-10 flex justify-center w-full">
      <UiLoading />
    </div>

    <UiCard v-else-if="data && !isError" class="p-6">
      <UiDataTable :columns="columns" :data="data">
        <template v-slot:toolbar="{ table }">
          <div class="flex flex-1 items-center space-x-2">
            <UiInput
              placeholder="Filter by operator name"
              :model-value="(table?.getColumn('fullName')?.getFilterValue() as string) ?? ''"
              class="h-8 w-[150px] lg:w-[250px]"
              @input="
                table
                  ?.getColumn('fullName')
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
