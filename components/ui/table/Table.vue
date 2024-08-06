<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div class="w-full overflow-auto">
    <table
      :class="
        cn(
          'w-full caption-bottom text-sm bg-white dark:bg-gray-800 dark:text-gray-200 dark:border dark:border-gray-700',
          props.class
        )
      "
    >
      <slot />
    </table>
  </div>
</template>
