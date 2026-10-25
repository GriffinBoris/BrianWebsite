<template>
  <PageHero
    eyebrow="Contact"
    title="Bookings and auditions"
    title-id="contact-title"
    lead="Email your project details, dates, and a script or brief. Include how the recording will be used."
  />

  <section class="section contact-page" aria-labelledby="contact-title">
    <div class="site-container contact-layout">
      <div class="contact-introduction">
        <p class="contact-email">
          <a href="mailto:brianbakaj@icloud.com">brianbakaj@icloud.com</a>
        </p>
        <div class="contact-actions">
          <AppButton tone="accent" href="mailto:brianbakaj@icloud.com">
            <span>Email Brian</span>
            <AppIcon icon="arrowRight" class="h-5 w-5" />
          </AppButton>
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
  import PageHero from "@/components/page/PageHero.vue";
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
    gap: var(--space-12);
  }

  .contact-email {
    font-size: clamp(1.25rem, 3vw, 2rem);
    font-weight: 500;
    letter-spacing: -0.035em;
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
    gap: var(--space-3);
    margin-top: var(--space-6);
  }

  .profile-links {
    margin-top: var(--space-6);
    border-top: 1px solid rgb(var(--color-line));
  }

  .profile-links a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    min-height: 52px;
    padding-block: var(--space-3);
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
      gap: var(--space-10);
    }
  }
</style>
