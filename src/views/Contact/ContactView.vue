<template>
  <section class="section" aria-labelledby="contact-title">
    <div class="site-container contact-layout">
      <div>
        <p class="eyebrow">Contact</p>
        <h1 id="contact-title" class="mt-5 font-display text-h1">Bookings and <em class="text-accent">auditions.</em></h1>
        <p class="lead mt-6 max-w-[34rem]">Email your project details and I’ll get back to you.</p>

        <a class="contact-email" :href="`mailto:${bookingEmail}`">{{ bookingEmail }}</a>

        <div class="mt-8 flex flex-wrap gap-3">
          <AppButton tone="accent" size="lg" :href="`mailto:${bookingEmail}`">
            <AppIcon icon="mail" class="h-5 w-5" />
            <span>Email Brian</span>
          </AppButton>
          <AppButton tone="outline" size="lg" :to="{ name: 'home', hash: '#demos' }">
            <AppIcon icon="play" class="h-5 w-5 fill-current" />
            <span>Hear the demos</span>
          </AppButton>
        </div>
      </div>

      <aside class="contact-aside">
        <div>
          <h2 class="eyebrow">What to include</h2>
          <ul class="contact-list">
            <li v-for="item in briefItems" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div>
          <h2 class="eyebrow">Profiles</h2>
          <ul class="contact-list">
            <li v-for="profile in profiles" :key="profile.label">
              <a :href="profile.href" target="_blank" rel="noopener noreferrer" class="profile-link">
                <span>{{ profile.label }}</span>
                <AppIcon icon="externalLink" class="h-4 w-4" />
                <span class="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
  import AppButton from "@/components/ui/AppButton.vue";
  import AppIcon from "@/components/ui/AppIcon.vue";
  import { bookingEmail, profiles } from "@/data/profiles";

  const briefItems = ["The project and the role", "Your dates and timeline", "A script or brief", "How the recording will be used"];
</script>

<style scoped>
  .contact-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.5fr) minmax(16rem, 0.8fr);
    align-items: start;
    gap: clamp(3rem, 7vw, 6rem);
  }

  .contact-email {
    display: inline-block;
    margin-top: clamp(2rem, 5vw, 3.5rem);
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.75rem);
    line-height: 1.1;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-decoration-color: rgb(var(--color-accent));
    text-underline-offset: 0.18em;
    overflow-wrap: anywhere;
    transition: color var(--duration) var(--ease);
  }

  .contact-email:hover {
    color: rgb(var(--color-accent));
  }

  .contact-aside {
    display: grid;
    gap: 2.5rem;
    padding: clamp(1.5rem, 3vw, 2rem);
    border-radius: var(--radius-lg);
    background: rgb(var(--color-surface-muted));
  }

  .contact-list {
    margin-top: 0.75rem;
  }

  .contact-list li {
    border-top: 1px solid rgb(var(--color-line));
  }

  .contact-list li:not(:has(a)) {
    padding-block: 0.75rem;
  }

  .profile-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 3rem;
    font-weight: 500;
    transition: color var(--duration) var(--ease);
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
