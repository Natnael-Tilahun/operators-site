<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:border-gray-700',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
