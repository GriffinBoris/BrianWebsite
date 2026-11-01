<template>
  <footer class="border-t border-line bg-surface-muted">
    <div class="site-container site-footer">
      <p class="site-footer__name">Brian Bakaj</p>
      <a class="site-footer__email" :href="`mailto:${bookingEmail}`">{{ bookingEmail }}</a>
      <ul class="site-footer__profiles">
        <li v-for="profile in profiles" :key="profile.label">
          <a :href="profile.href" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center hover:text-body">
            {{ profile.label }}<span class="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      </ul>
      <ThemeToggle class="site-footer__theme" />
    </div>
  </footer>
</template>

<script setup lang="ts">
  import ThemeToggle from "@/components/ui/ThemeToggle.vue";
  import { bookingEmail, profiles } from "@/data/profiles";
</script>

<style scoped>
  /* Phones: two full-width rows (name and theme toggle, then email and profiles). Wider: one row. */
  .site-footer {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas: "name theme" "email profiles";
    align-items: center;
    column-gap: 1.5rem;
    padding-block: 1.5rem;
    font-size: 0.875rem;
  }

  .site-footer__name {
    grid-area: name;
    font-weight: 600;
  }

  .site-footer__email {
    grid-area: email;
    justify-self: start;
    color: rgb(var(--color-secondary));
    text-decoration: underline;
    text-underline-offset: 4px;
    overflow-wrap: anywhere;
  }

  .site-footer__email:hover {
    color: rgb(var(--color-body));
  }

  .site-footer__profiles {
    grid-area: profiles;
    display: flex;
    gap: 1.25rem;
    color: rgb(var(--color-secondary));
  }

  .site-footer__theme {
    grid-area: theme;
    justify-self: end;
  }

  @media (min-width: 640px) {
    .site-footer {
      grid-template-columns: auto minmax(0, 1fr) auto auto;
      grid-template-areas: "name email profiles theme";
      padding-block: 2rem;
    }
  }
</style>
