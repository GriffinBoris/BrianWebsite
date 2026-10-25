<template>
  <PageHero
    eyebrow="Screen and voice"
    title="About Brian"
    title-id="about-title"
  />

  <section class="section pt-[clamp(2.25rem,4vw,3.25rem)]">
    <div class="site-container">
      <div class="grid items-start gap-[clamp(2rem,5vw,4rem)] min-[721px]:grid-cols-[1.1fr_0.9fr]">
        <div class="space-y-4">
          <p>
            I’m Brian, a screen and voice actor based in Austin, Texas. I work in English and Albanian.
          </p>
          <p>
            For voice projects, I record from a dedicated home studio with a Shure SM7B.
          </p>
          <p>
            I also have a background in dance. I’m nonunion and hold a passport and driver’s license for projects that involve travel.
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

  <section class="section section--muted" aria-labelledby="headshots-title">
    <div class="site-container">
      <div class="mb-[clamp(2rem,4vw,3.25rem)]">
        <h2 id="headshots-title" class="text-h2">Headshots</h2>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <figure
          v-for="shot in shots"
          :key="shot.src"
          class="group aspect-[3/4] overflow-hidden rounded-md border border-line bg-surface-muted"
        >
          <img
            :src="shot.src"
            :alt="shot.alt"
            loading="lazy"
            width="640"
            height="800"
            class="h-full w-full object-cover"
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
    { label: "Work", value: "Screen and voice" },
    { label: "Playing age", value: "18–27" },
    { label: "Based in", value: "Austin, Texas" },
    { label: "Languages", value: "English and Albanian" },
    { label: "Union status", value: "Nonunion" },
    { label: "Movement", value: "Dance" },
    { label: "Travel", value: "Passport and driver’s license" },
  ];

  const shots = [
    { src: look01, alt: "Brian Bakaj, portrait" },
    { src: look02, alt: "Brian Bakaj, portrait" },
    { src: headshot, alt: "Brian Bakaj, outdoor headshot" },
  ];
</script>
