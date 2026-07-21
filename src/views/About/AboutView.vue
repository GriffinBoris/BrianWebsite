<template>
  <PageHero
    eyebrow="About"
    title="About Brian"
    title-id="about-title"
    lead="Austin actor for screen and voice, with real range across the two."
  />

  <!-- Bio + casting profile -->
  <section class="section pt-[clamp(2.25rem,4vw,3.25rem)]">
    <div class="site-container">
      <div class="grid items-start gap-[clamp(2rem,5vw,4rem)] min-[721px]:grid-cols-[1.1fr_0.9fr]">
        <div class="space-y-4">
          <p>
            I’m an actor in Austin working on camera and in voiceover. I go for honest, lived-in performances that feel less like acting and more
            like watching a real person.
          </p>
          <p>
            My voice runs from bright commercial spots to steady long-form narration, recorded broadcast-ready on a Shure SM7B with remote
            direction on request. English and Albanian; dance is part of the kit.
          </p>
        </div>

        <AppSurface>
          <dl class="grid" aria-label="Casting profile">
            <div
              v-for="(row, index) in specRows"
              :key="row.label"
              class="flex justify-between gap-4 border-b border-line py-[0.85rem]"
              :class="{ 'pt-0': index === 0, 'border-b-0 pb-0': index === specRows.length - 1 }"
            >
              <dt class="text-[0.9rem] text-secondary">{{ row.label }}</dt>
              <dd class="text-right font-medium">{{ row.value }}</dd>
            </div>
          </dl>
        </AppSurface>
      </div>
    </div>
  </section>

  <!-- Headshots -->
  <section class="section section--muted" aria-labelledby="headshots-title">
    <div class="site-container">
      <div class="mb-[clamp(2rem,4vw,3.25rem)]">
        <p class="eyebrow mb-4">Headshots</p>
        <h2 id="headshots-title" class="text-h2">Recent looks</h2>
      </div>

      <div class="grid grid-cols-3 gap-4 max-[620px]:grid-cols-2">
        <figure
          v-for="shot in shots"
          :key="shot.src"
          class="group aspect-[3/4] overflow-hidden rounded-md border border-line bg-surface-muted"
        >
          <img
            :src="shot.src"
            :alt="shot.alt"
            loading="lazy"
            class="h-full w-full object-cover transition-transform duration-[400ms] ease-smooth group-hover:scale-[1.03]"
          />
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import look01 from "@/assets/img/brian-look-01.jpg";
  import look02 from "@/assets/img/brian-look-02.jpg";
  import headshot from "@/assets/img/headshot.jpg";
  import PageHero from "@/components/page/PageHero.vue";
  import AppSurface from "@/components/ui/AppSurface.vue";

  const specRows = [
    { label: "Works in", value: "Screen · Voice" },
    { label: "Playing age", value: "18–27" },
    { label: "Based in", value: "Austin, TX" },
    { label: "Languages", value: "English · Albanian" },
    { label: "Union", value: "Nonunion" },
    { label: "Voice", value: "Warm · Conversational" },
    { label: "Movement", value: "Dance" },
    { label: "Travel", value: "Passport · Driver’s license" },
  ];

  const shots = [
    { src: look01, alt: "Brian Bakaj, portrait" },
    { src: look02, alt: "Brian Bakaj, portrait" },
    { src: headshot, alt: "Brian Bakaj, outdoor headshot" },
  ];
</script>
