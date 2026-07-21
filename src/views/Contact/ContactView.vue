<template>
  <section class="section flex flex-col justify-center sm:min-h-[calc(100dvh-4.25rem)]" aria-labelledby="contact-title">
    <div class="site-container site-container--narrow text-center">
      <p class="eyebrow mb-4">Contact</p>
      <h1 id="contact-title" class="mt-1 text-h1">Book Brian</h1>
      <p class="lead mx-auto mt-5 max-w-[42ch]">
        Available for commercial, narrative, explainer, and corporate work. Send a script or a few details, and I’ll reply with reels, rates, and availability.
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-3.5">
        <!-- TODO(Brian): replace with your booking email -->
        <AppButton tone="accent" label="Email Brian" href="mailto:hello@example.com" />
        <AppButton tone="ghost" href="https://www.backstage.com/u/brian-bakaj/" target="_blank">
          <span>View casting profile</span>
          <AppIcon icon="externalLink" class="h-[15px] w-[15px]" />
          <span class="sr-only"> (opens in a new tab)</span>
        </AppButton>
      </div>

      <div class="mt-[clamp(2.5rem,6vw,4rem)] border-t border-line pt-[clamp(2.5rem,6vw,4rem)]">
        <p class="eyebrow mb-5">Find Brian elsewhere</p>
        <ul class="flex flex-wrap justify-center gap-3.5">
          <li v-for="social in socials" :key="social.label">
            <a
              class="social"
              :style="{ '--brand': social.brand, '--brand-ink': social.ink }"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${social.label} (opens in a new tab)`"
              v-tooltip="buildAppTooltipBinding({ text: social.label })"
            >
              <svg v-if="social.path" class="social__glyph" :viewBox="social.viewBox" aria-hidden="true">
                <path :d="social.path" />
              </svg>
              <span v-else class="social__mark" aria-hidden="true">{{ social.mark }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import AppButton from "@/components/ui/AppButton.vue";
  import AppIcon from "@/components/ui/AppIcon.vue";
  import { buildAppTooltipBinding } from "@/components/ui/AppTooltip";

  // Icon marks link out to Brian's profiles. Each carries its own brand colour,
  // used only on hover/focus so the resting row stays on the site's neutral ink.
  const socials = [
    {
      label: "Backstage",
      href: "https://www.backstage.com/u/brian-bakaj/",
      brand: "#f5b400",
      ink: "#141018",
      mark: "b",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/brian-bakaj",
      brand: "#0a66c2",
      ink: "#ffffff",
      viewBox: "0 0 448 512",
      path: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/brian.bakaj/",
      brand: "#1877f2",
      ink: "#ffffff",
      viewBox: "0 0 320 512",
      path: "M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z",
    },
  ];
</script>

<style scoped>
  .social {
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: var(--radius-pill);
    border: 1px solid rgb(var(--color-line));
    background: rgb(var(--color-surface));
    color: rgb(var(--color-body));
    transition:
      background-color var(--duration) var(--ease),
      border-color var(--duration) var(--ease),
      color var(--duration) var(--ease),
      transform var(--duration) var(--ease);
  }

  .social:hover,
  .social:focus-visible {
    background: var(--brand);
    border-color: var(--brand);
    color: var(--brand-ink);
    transform: translateY(-1px);
  }

  .social__glyph {
    width: 1.05rem;
    height: 1.05rem;
    fill: currentColor;
  }

  .social__mark {
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1;
  }
</style>
