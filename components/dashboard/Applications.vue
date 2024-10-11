<script lang="ts" setup>
import { Icons } from "../icons";
</script>

<template>
  <UiCard class="col-span-1 md:p-8 p-6 border- space-y-6 w-full lg:w-[90%]">
    <h1 class="font-semibold text-xl">Applications</h1>
    <div class="inline-grid lg:grid-cols-4 grid-cols-2 gap-5 w-full">
      <UiCard
        class="min-w-max col-span-1 hover:bg-purple-100 flex items-center justify-center p-6 flex-col gap-1.5"
      >
        <Icons.transfer class="w-7" />
        <p class="text-lg">Transfer</p>
      </UiCard>
      <UiCard
        class="min-w-max col-span-1 flex hover:bg-purple-100 items-center justify-center p-6 flex-col gap-1.5"
      >
        <Icons.utility class="w-7" />
        <p class="text-lg">Utility</p>
      </UiCard>
      <UiCard
        class="min-w-max col-span-1 flex hover:bg-purple-100 items-center justify-center p-6 flex-col gap-1.5"
      >
        <Icons.topUp class="w-7" />
        <p class="text-lg">Top Up</p>
      </UiCard>
    </div>
  </UiCard>
</template>

<style lang="postcss" scoped></style>
