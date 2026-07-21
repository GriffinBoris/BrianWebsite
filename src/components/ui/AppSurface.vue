<template>
  <Card
    unstyled
    :pt="{
      root: cn('rounded-lg border border-line bg-surface shadow-sm', rootClass),
      body: cn('h-full', bodyClass),
      content: cn('p-5 sm:p-7', contentClass),
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

  interface Props {
    bodyClass?: string;
    contentClass?: string;
    rootClass?: string;
  }

  defineProps<Props>();
</script>
