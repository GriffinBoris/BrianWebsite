<template>
  <section class="section contact-page" aria-labelledby="contact-title">
    <div class="site-container contact-layout">
      <div>
        <p class="eyebrow mb-5">Contact</p>
        <h1 id="contact-title" class="text-h1">Bookings and auditions</h1>
        <p class="lead mt-6 max-w-[42ch]">
          Email your project details, dates, and a script or brief. Include how the recording will be used.
        </p>
        <p class="contact-email">
          <a href="mailto:brianbakaj@icloud.com">brianbakaj@icloud.com</a>
        </p>
        <div class="mt-8 flex flex-wrap gap-3.5">
          <AppButton tone="accent" label="Email Brian" href="mailto:brianbakaj@icloud.com" />
          <AppButton tone="ghost" href="https://www.backstage.com/u/brian-bakaj/" target="_blank">
            <span>Backstage profile</span>
            <AppIcon icon="externalLink" class="h-[15px] w-[15px]" />
            <span class="sr-only"> (opens in a new tab)</span>
          </AppButton>
        </div>
      </div>
      <aside class="contact-profiles" aria-labelledby="profiles-title">
        <h2 id="profiles-title" class="eyebrow mb-5">Profiles</h2>
        <ul class="flex flex-col gap-3">
          <li v-for="social in socials" :key="social.label">
            <a
              class="social"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${social.label} (opens in a new tab)`"
            >
              <svg v-if="social.path" class="social__glyph" :viewBox="social.viewBox" aria-hidden="true"><path :d="social.path" /></svg>
              <span v-else class="social__mark" aria-hidden="true">{{ social.mark }}</span>
              <span>{{ social.label }}</span>
              <AppIcon icon="externalLink" class="ml-auto h-4 w-4" />
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

  // Visible names make profile destinations clear without relying on icons.
  const socials = [
    {
      label: "Backstage",
      href: "https://www.backstage.com/u/brian-bakaj/",
      mark: "b",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/brian-bakaj",
      viewBox: "0 0 448 512",
      path: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/brian.bakaj/",
      viewBox: "0 0 320 512",
      path: "M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z",
    },
  ];
</script>

<style scoped>
  .contact-page {
    min-height: calc(100dvh - 9rem);
    display: flex;
    align-items: center;
  }

  .contact-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 15rem;
    align-items: start;
    gap: clamp(2.5rem, 8vw, 8rem);
  }

  .contact-email {
    margin-top: 1.75rem;
    font-size: clamp(1.1rem, 2vw, 1.45rem);
    letter-spacing: -0.025em;
    color: rgb(var(--color-accent));
  }

  .contact-email a {
    text-decoration: underline;
    text-underline-offset: 0.3em;
  }

  .contact-profiles {
    border-left: 1px solid rgb(var(--color-line));
    padding-left: 1.75rem;
  }

  .social {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    min-height: 48px;
    color: rgb(var(--color-secondary));
    transition: color var(--duration) var(--ease);
  }

  .social:hover, .social:focus-visible {
    color: rgb(var(--color-accent));
  }

  .social__glyph {
    flex: none;
    width: 1.05rem;
    height: 1.05rem;
    fill: currentColor;
  }

  .social__mark {
    flex: none;
    width: 1.05rem;
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1;
  }

  @media (max-width: 720px) {
    .contact-layout {
      grid-template-columns: 1fr;
    }
    .contact-profiles {
      border-left: 0;
      border-top: 1px solid rgb(var(--color-line));
      padding-left: 0;
      padding-top: 2rem;
    }
  }
</style>
