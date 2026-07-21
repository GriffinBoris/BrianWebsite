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
        <div class="flex flex-wrap justify-center gap-3.5">
          <AppButton v-for="link in elsewhere" :key="link.label" tone="ghost" :href="link.href" target="_blank">
            <span>{{ link.label }}</span>
            <AppIcon icon="externalLink" class="h-[15px] w-[15px]" />
            <span class="sr-only"> (opens in a new tab)</span>
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import AppButton from "@/components/ui/AppButton.vue";
  import AppIcon from "@/components/ui/AppIcon.vue";

  const elsewhere = [
    { label: "Backstage", href: "https://www.backstage.com/u/brian-bakaj/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/brian-bakaj" },
    { label: "Facebook", href: "https://www.facebook.com/brian.bakaj/" },
  ];
</script>
