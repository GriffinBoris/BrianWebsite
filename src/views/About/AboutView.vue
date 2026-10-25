<template>
  <PageHero eyebrow="Voice actor" title="About Brian" title-id="about-title" />

  <section class="section about-overview">
    <div class="site-container about-layout">
      <div class="about-biography">
        <p>
          I’m Brian, a voice actor based in Austin, Texas. I work in English and Albanian.
        </p>
        <p>
          For voice projects, I record from a dedicated home studio with a Shure SM7B.
        </p>
        <p>
          I also have a background in dance. I’m nonunion and hold a passport and driver’s license for projects that involve travel.
        </p>
      </div>

      <dl class="casting-profile" aria-label="Casting profile">
        <div v-for="row in specRows" :key="row.label" class="casting-profile__row">
          <dt>{{ row.label }}</dt>
          <dd>{{ row.value }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <section class="section headshots-section" aria-labelledby="headshots-title">
    <div class="site-container">
      <h2 id="headshots-title" class="text-h2 headshots-title">Headshots</h2>
      <div class="headshots-grid">
        <figure v-for="shot in shots" :key="shot.src" class="headshot">
          <img :src="shot.src" :alt="shot.alt" loading="lazy" width="640" height="800" />
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

  const specRows = [
    { label: "Work", value: "Voice acting" },
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

<style scoped>
  .about-overview {
    padding-block: var(--space-10);
  }

  .about-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    align-items: start;
    gap: clamp(2rem, 5vw, 4rem);
  }

  .about-biography {
    max-width: 62ch;
    line-height: 1.65;
  }

  .about-biography p + p {
    margin-top: 1rem;
  }

  .casting-profile {
    border-top: 1px solid rgb(var(--color-line));
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  .casting-profile__row {
    display: grid;
    grid-template-columns: 6.5rem minmax(0, 1fr);
    gap: 1rem;
    padding-block: 0.625rem;
    border-bottom: 1px solid rgb(var(--color-line));
  }

  .casting-profile dt {
    color: rgb(var(--color-secondary));
  }

  .casting-profile dd {
    font-weight: 500;
  }

  .headshots-section {
    border-top: 1px solid rgb(var(--color-line));
  }

  .headshots-title {
    margin-bottom: 1.25rem;
  }

  .headshots-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .headshot {
    aspect-ratio: 3 / 4;
    overflow: hidden;
    border-radius: 0;
    background: rgb(var(--color-surface-muted));
  }

  .headshot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 760px) {
    .about-layout {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  @media (max-width: 520px) {
    .headshots-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
