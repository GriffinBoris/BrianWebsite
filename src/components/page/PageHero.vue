<template>
  <section class="page-heading" :aria-labelledby="titleId">
    <div class="site-container">
      <p class="eyebrow page-heading__eyebrow">{{ eyebrow }}</p>
      <h1 :id="titleId" class="text-h1">{{ title }}</h1>
      <p v-if="lead" class="page-heading__lead">{{ lead }}</p>
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

<style scoped>
  .page-heading {
    padding-block: var(--space-10);
    background: rgb(var(--color-intro));
    color: rgb(var(--color-intro-ink));
  }

  .page-heading__eyebrow {
    margin-bottom: var(--space-3);
    color: rgb(var(--color-intro-muted));
  }

  .page-heading__lead {
    max-width: 60ch;
    margin-top: 1rem;
    color: rgb(var(--color-intro-muted));
    line-height: 1.65;
  }
</style>
