<template>
  <header class="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md backdrop-saturate-150">
    <div class="site-container">
      <nav class="flex h-[4.25rem] items-center justify-between gap-3" aria-label="Primary">
        <RouterLink class="brand" :to="{ name: 'home' }">Brian Bakaj <span>Actor</span></RouterLink>

        <ul class="flex items-center gap-0.5 sm:gap-1">
          <li v-for="item in items" :key="item.name">
            <RouterLink :to="{ name: item.name }" class="nav-link" :class="{ 'is-active': route.name === item.name }">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";

  const route = useRoute();

  const items = [
    { name: "about", label: "About" },
    { name: "contact", label: "Contact" },
  ] as const;
</script>

<style scoped>
  .brand {
    display: inline-flex;
    flex: none;
    align-items: baseline;
    gap: 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    white-space: nowrap;
  }

  .brand span {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgb(var(--color-accent));
  }

  /* The "Actor" tag is decorative; drop it on the narrowest phones so the brand
     and the nav links never crowd each other. */
  @media (max-width: 359px) {
    .brand span {
      display: none;
    }
  }

  .nav-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 0.6rem;
    font-size: 0.95rem;
    color: rgb(var(--color-secondary));
    transition: color var(--duration) var(--ease);
  }

  .nav-link:hover {
    color: rgb(var(--color-body));
  }

  .nav-link.is-active {
    color: rgb(var(--color-body));
    font-weight: 600;
  }

  /* An accent underline marks the current page. */
  .nav-link.is-active::after {
    content: "";
    position: absolute;
    left: 0.6rem;
    right: 0.6rem;
    bottom: 0.15rem;
    height: 2px;
    border-radius: 2px;
    background: rgb(var(--color-accent));
  }
</style>
