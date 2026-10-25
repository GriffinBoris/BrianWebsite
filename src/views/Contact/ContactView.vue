<template>
  <section class="section contact-page" aria-labelledby="contact-title">
    <div class="site-container contact-layout">
      <div class="contact-introduction">
        <p class="eyebrow contact-eyebrow">Contact</p>
        <h1 id="contact-title" class="text-h1">Bookings and auditions</h1>
        <p class="contact-copy">
          Email your project details, dates, and a script or brief. Include how the recording will be used.
        </p>
        <p class="contact-email">
          <a href="mailto:brianbakaj@icloud.com">brianbakaj@icloud.com</a>
        </p>
        <div class="contact-actions">
          <AppButton tone="accent" label="Email Brian" href="mailto:brianbakaj@icloud.com" />
          <AppButton tone="ghost" href="https://www.backstage.com/u/brian-bakaj/" target="_blank">
            <span>Backstage profile</span>
            <AppIcon icon="externalLink" class="h-4 w-4" />
            <span class="sr-only"> (opens in a new tab)</span>
          </AppButton>
        </div>
      </div>

      <aside class="contact-profiles" aria-labelledby="profiles-title">
        <h2 id="profiles-title" class="text-h2">Profiles</h2>
        <ul class="profile-links">
          <li v-for="social in socials" :key="social.label">
            <a :href="social.href" target="_blank" rel="noopener noreferrer" :aria-label="`${social.label} (opens in a new tab)`">
              <span>{{ social.label }}</span>
              <AppIcon icon="externalLink" class="h-4 w-4" />
            </a>
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
  import AppButton from "@/components/ui/AppButton.vue";
  import AppIcon from "@/components/ui/AppIcon.vue";

  const socials = [
    { label: "Backstage", href: "https://www.backstage.com/u/brian-bakaj/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/brian-bakaj" },
    { label: "Facebook", href: "https://www.facebook.com/brian.bakaj/" },
  ];
</script>

<style scoped>
  .contact-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(15rem, 0.8fr);
    align-items: start;
    gap: clamp(2rem, 5vw, 4rem);
  }

  .contact-eyebrow {
    margin-bottom: 0.5rem;
  }

  .contact-introduction h1 {
    max-width: 17ch;
  }

  .contact-copy {
    max-width: 55ch;
    margin-top: 1rem;
    color: rgb(var(--color-secondary));
    line-height: 1.65;
  }

  .contact-email {
    margin-top: 1.5rem;
    font-size: clamp(1.125rem, 2vw, 1.5rem);
    font-weight: 500;
    letter-spacing: -0.025em;
    color: rgb(var(--color-body));
    overflow-wrap: anywhere;
  }

  .contact-email a {
    text-decoration: underline;
    text-decoration-color: rgb(var(--color-line));
    text-underline-offset: 0.25em;
  }

  .contact-email a:hover {
    text-decoration-color: rgb(var(--color-accent));
    color: rgb(var(--color-accent));
  }

  .contact-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.25rem;
  }

  .contact-profiles {
    padding-top: 1.875rem;
  }

  .profile-links {
    margin-top: 1rem;
    border-top: 1px solid rgb(var(--color-line));
  }

  .profile-links a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 48px;
    padding-block: 0.75rem;
    border-bottom: 1px solid rgb(var(--color-line));
    color: rgb(var(--color-secondary));
    transition: color var(--duration) var(--ease);
  }

  .profile-links a:hover,
  .profile-links a:focus-visible {
    color: rgb(var(--color-accent));
  }

  @media (max-width: 760px) {
    .contact-layout {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .contact-profiles {
      padding-top: 0;
    }
  }
</style>
