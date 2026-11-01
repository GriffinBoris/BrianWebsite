<template>
  <div class="site-container section">
    <h1 id="about-title" class="text-h1">About Brian</h1>

    <div class="about-layout">
      <div class="about-biography">
        <p>I’m Brian, a voice actor based in Austin, Texas. I work in English and Albanian.</p>
        <p>For voice projects, I record from a dedicated home studio with a Shure SM7B.</p>
        <p>I also have a background in dance. I’m nonunion and hold a passport and driver’s license for projects that involve travel.</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <AppButton tone="accent" size="lg" :href="auditionRequestHref">Request an audition</AppButton>
          <AppButton tone="outline" size="lg" :to="{ name: 'home', hash: '#demos' }">Listen to demos</AppButton>
        </div>
      </div>

      <section class="casting-profile" aria-labelledby="profile-title">
        <h2 id="profile-title" class="text-h3">Casting profile</h2>
        <dl class="mt-3">
          <div v-for="row in specRows" :key="row.label" class="casting-profile__row">
            <dt>{{ row.label }}</dt>
            <dd>{{ row.value }}</dd>
          </div>
        </dl>
      </section>
    </div>

    <section class="mt-16" aria-labelledby="headshots-title">
      <h2 id="headshots-title" class="text-h2">Headshots</h2>
      <div class="headshots-grid">
        <img v-for="shot in shots" :key="shot.src" class="headshot" :src="shot.src" :alt="shot.alt" loading="lazy" width="640" height="800" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import look01 from "@/assets/img/brian-look-01.jpg";
  import look02 from "@/assets/img/brian-look-02.jpg";
  import headshot from "@/assets/img/headshot.jpg";
  import AppButton from "@/components/ui/AppButton.vue";
  import { auditionRequestHref } from "@/data/profiles";

  const specRows = [
    { label: "Work", value: "Voice acting" },
    { label: "Playing age", value: "18–27" },
    { label: "Based in", value: "Austin, Texas" },
    { label: "Languages", value: "English and Albanian" },
    { label: "Studio", value: "Home studio, Shure SM7B" },
    { label: "Union status", value: "Nonunion" },
    { label: "Movement", value: "Dance" },
    { label: "Travel", value: "Passport and driver’s license" },
  ];

  const shots = [
    { src: look01, alt: "Brian Bakaj, portrait against a yellow wall" },
    { src: look02, alt: "Brian Bakaj, portrait against a gray wall" },
    { src: headshot, alt: "Brian Bakaj, outdoor headshot" },
  ];
</script>

<style scoped>
  .about-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    align-items: start;
    gap: clamp(2rem, 5vw, 4rem);
    margin-top: 2rem;
  }

  .about-biography {
    max-width: 38rem;
    font-size: 1.0625rem;
    line-height: 1.7;
  }

  .about-biography p + p {
    margin-top: 1rem;
  }

  .casting-profile {
    padding: 1.5rem;
    border: 1px solid rgb(var(--color-line));
    border-radius: var(--radius-lg);
  }

  .casting-profile__row {
    display: grid;
    grid-template-columns: 7rem minmax(0, 1fr);
    gap: 1rem;
    padding-block: 0.625rem;
    border-top: 1px solid rgb(var(--color-line));
    font-size: 0.875rem;
  }

  .casting-profile dt {
    color: rgb(var(--color-secondary));
  }

  .casting-profile dd {
    font-weight: 500;
  }

  .headshots-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 1.25rem;
  }

  .headshot {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    border-radius: var(--radius-lg);
    background: rgb(var(--color-surface-muted));
  }

  @media (max-width: 820px) {
    .about-layout {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 560px) {
    .headshots-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
