<template>
  <div class="site-container section contact-layout">
    <section aria-labelledby="contact-title">
      <h1 id="contact-title" class="text-h1">Bookings and auditions</h1>
      <p class="lead mt-4 max-w-[34rem]">Email your project details and I’ll get back to you.</p>

      <dl class="mt-8">
        <dt class="text-sm text-secondary">Email</dt>
        <dd class="mt-1">
          <a class="contact-email" :href="`mailto:${bookingEmail}`">{{ bookingEmail }}</a>
        </dd>
      </dl>

      <div class="mt-8 flex flex-wrap gap-3">
        <AppButton tone="accent" size="lg" :href="auditionRequestHref">Request an audition</AppButton>
        <AppButton tone="outline" size="lg" :to="{ name: 'home', hash: '#demos' }">Listen to demos</AppButton>
      </div>
    </section>

    <aside class="contact-aside">
      <section aria-labelledby="brief-title">
        <h2 id="brief-title" class="text-h3">What to include</h2>
        <ul class="contact-list">
          <li v-for="item in briefItems" :key="item">{{ item }}</li>
        </ul>
      </section>

      <section aria-labelledby="profiles-title">
        <h2 id="profiles-title" class="text-h3">Profiles</h2>
        <ul class="contact-list">
          <li v-for="profile in profiles" :key="profile.label">
            <a :href="profile.href" target="_blank" rel="noopener noreferrer" class="profile-link">
              <span>{{ profile.label }}</span>
              <AppIcon icon="externalLink" class="h-4 w-4" />
              <span class="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </section>
    </aside>
  </div>
</template>

<script setup lang="ts">
  import AppButton from "@/components/ui/AppButton.vue";
  import AppIcon from "@/components/ui/AppIcon.vue";
  import { auditionRequestHref, bookingEmail, profiles } from "@/data/profiles";

  const briefItems = ["The project and the role", "Your dates and timeline", "A script or brief", "How the recording will be used"];
</script>

<style scoped>
  .contact-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(16rem, 0.8fr);
    align-items: start;
    gap: clamp(2.5rem, 6vw, 5rem);
  }

  .contact-email {
    font-size: clamp(1.25rem, 2.5vw, 1.625rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: rgb(var(--color-accent));
    text-decoration: underline;
    text-underline-offset: 0.2em;
    overflow-wrap: anywhere;
  }

  .contact-email:hover {
    color: rgb(var(--color-accent-strong));
  }

  .contact-aside {
    display: grid;
    gap: 2rem;
    padding: 1.5rem;
    border: 1px solid rgb(var(--color-line));
    border-radius: var(--radius-lg);
  }

  .contact-list {
    margin-top: 0.5rem;
    font-size: 0.9375rem;
  }

  .contact-list li {
    border-top: 1px solid rgb(var(--color-line));
  }

  .contact-list li:not(:has(a)) {
    padding-block: 0.625rem;
  }

  .profile-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 2.75rem;
    font-weight: 500;
  }

  .profile-link:hover {
    color: rgb(var(--color-accent));
  }

  @media (max-width: 820px) {
    .contact-layout {
      grid-template-columns: 1fr;
    }
  }
</style>
