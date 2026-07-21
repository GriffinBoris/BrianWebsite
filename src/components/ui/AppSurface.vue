<template>
  <Card
    unstyled
    :pt="{
      root: cn('rounded-lg border border-line bg-surface shadow-sm', rootClass),
      body: 'h-full',
      content: 'p-5 sm:p-7',
    }"
  >
    <template #content>
      <slot />
    </template>
  </Card>
</template>

<script setup lang="ts">
  import { cn } from "@/utils/className";
  import Card from "primevue/card";

  defineProps<{ rootClass?: string }>();
</script>
