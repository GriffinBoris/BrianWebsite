<template>
  <section class="section" aria-labelledby="contact-title">
    <div class="site-container site-container--narrow text-center">
      <p class="eyebrow mb-4">Contact</p>
      <h1 id="contact-title" class="mt-1 text-h1">Book Brian</h1>
      <p class="lead mx-auto mt-5 max-w-[40ch]">
        Available for on-camera and voice work — commercial, narrative, explainer, and corporate — with live remote sessions on request. Send a
        script, sides, or a few details, and Brian will follow up with reels, rates, and availability.
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-3.5">
        <!-- TODO(Brian): replace with your booking email -->
        <a class="btn btn--accent" href="mailto:hello@example.com">Email Brian</a>
        <a class="btn btn--ghost" href="https://www.backstage.com/u/brian-bakaj/" target="_blank" rel="noopener">
          View casting profile
          <ExternalArrow />
        </a>
      </div>

      <div class="mt-[clamp(2.5rem,6vw,4rem)] border-t border-line pt-[clamp(2.5rem,6vw,4rem)]">
        <p class="eyebrow mb-5">Find Brian elsewhere</p>
        <div class="flex flex-wrap justify-center gap-3.5">
          <a v-for="link in elsewhere" :key="link.label" class="btn btn--ghost" :href="link.href" target="_blank" rel="noopener">
            {{ link.label }}
            <ExternalArrow />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import ExternalArrow from "@/components/ui/icons/ExternalArrow.vue";

  const elsewhere = [
    { label: "Backstage", href: "https://www.backstage.com/u/brian-bakaj/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/brian-bakaj" },
    { label: "Facebook", href: "https://www.facebook.com/brian.bakaj/" },
  ];
</script>
