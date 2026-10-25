<template>
  <header class="site-header">
    <div class="site-container">
      <nav class="site-nav" aria-label="Primary">
        <RouterLink class="site-brand" :to="{ name: 'home' }">Brian Bakaj</RouterLink>
        <ul class="site-nav__links">
          <li v-for="item in items" :key="item.name">
            <RouterLink :to="{ name: item.name }" class="nav-link" :class="{ 'is-active': route.name === item.name }">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";
  const route = useRoute();
  const items = [{ name: "about", label: "About" }, { name: "contact", label: "Contact" }] as const;
</script>

<style scoped>
  .site-header {
    border-bottom: 1px solid rgb(var(--color-line));
    background: rgb(var(--color-background));
  }

  .site-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    min-height: 64px;
  }

  .site-brand {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.025em;
    white-space: nowrap;
  }

  .site-nav__links {
    display: flex;
    align-items: center;
    gap: 24px;
    list-style: none;
  }

  .nav-link {
    display: flex;
    align-items: center;
    min-height: 44px;
    font-size: 14px;
    color: rgb(var(--color-secondary));
    text-underline-offset: 6px;
  }

  .nav-link:hover, .nav-link.is-active {
    color: rgb(var(--color-body));
  }

  .nav-link.is-active {
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
</style>
