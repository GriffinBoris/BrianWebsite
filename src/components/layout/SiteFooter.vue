<template>
  <footer class="site-footer">
    <div class="site-container site-footer__layout">
      <RouterLink class="site-footer__brand" :to="{ name: 'home' }">Brian Bakaj</RouterLink>
      <div class="site-footer__details">
        <p>Voice actor based in Austin, Texas.</p>
        <ThemeToggle />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import ThemeToggle from "@/components/ui/ThemeToggle.vue";
  import { RouterLink } from "vue-router";
</script>

<style scoped>
  .site-footer {
    border-top: 1px solid rgb(var(--color-line));
    padding-block: 16px;
    color: rgb(var(--color-secondary));
    font-size: 13px;
  }

  .site-footer__layout {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px 20px;
  }

  .site-footer__brand {
    color: rgb(var(--color-body));
    font-weight: 600;
  }

  .site-footer__details {
    display: flex;
    align-items: center;
    gap: 16px;
  }
</style>
