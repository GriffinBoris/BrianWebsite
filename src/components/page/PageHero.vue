<template>
  <section class="pt-[clamp(3rem,7vw,5.5rem)]" :aria-labelledby="titleId">
    <div class="site-container">
      <p class="eyebrow mb-4">{{ eyebrow }}</p>
      <h1 :id="titleId" class="mt-1 text-h1">{{ title }}</h1>
      <p v-if="lead" class="lead mt-5 max-w-[46ch]">{{ lead }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
  defineProps<{
    eyebrow: string;
    title: string;
    titleId: string;
    lead?: string;
  }>();
</script>
