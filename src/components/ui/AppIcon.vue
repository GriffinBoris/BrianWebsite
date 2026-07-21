<template>
  <component :is="resolvedIcon" v-if="resolvedIcon" :class="iconClass" aria-hidden="true" />
</template>

<script setup lang="ts">
  import { type AppIconName, appIcons } from "@/components/ui/appIcons";
  import { cn } from "@/utils/className";
  import type { LucideIcon } from "@lucide/vue";
  import { computed } from "vue";

  const props = defineProps<{
    class?: string;
    icon: AppIconName | LucideIcon;
  }>();

  const resolvedIcon = computed(() => (typeof props.icon === "string" ? appIcons[props.icon] : props.icon));
  const iconClass = computed(() => cn("shrink-0", props.class));
</script>
