<template>
  <AppIconButton size="sm" tone="ghost" :icon="isDark ? 'sun' : 'moon'" :label="isDark ? 'Switch to light theme' : 'Switch to dark theme'" @click="toggle" />
</template>

<script setup lang="ts">
  import AppIconButton from "@/components/ui/AppIconButton.vue";
  import { useTheme } from "@/composables/useTheme";

  const { isDark, toggle } = useTheme();
</script>
