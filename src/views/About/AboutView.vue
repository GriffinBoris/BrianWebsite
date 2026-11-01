<template>
  <section class="section pb-0" aria-labelledby="about-title">
    <div class="site-container">
      <p class="eyebrow">About</p>
      <h1 id="about-title" class="mt-5 font-display text-h1">Meet <em class="text-accent">Brian.</em></h1>

      <div class="about-layout">
        <div class="about-biography">
          <p class="about-biography__lead">I’m Brian, a voice actor based in Austin, Texas. I work in English and Albanian.</p>
          <p>For voice projects, I record from a dedicated home studio with a Shure SM7B.</p>
          <p>I also have a background in dance. I’m nonunion and hold a passport and driver’s license for projects that involve travel.</p>
        </div>

        <div class="casting-profile">
          <h2 class="eyebrow">Casting profile</h2>
          <dl class="mt-4">
            <div v-for="row in specRows" :key="row.label" class="casting-profile__row">
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="headshots-title">
    <div class="site-container">
      <h2 id="headshots-title" class="font-display text-h2">Headshots</h2>
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

  const specRows = [
    { label: "Work", value: "Voice acting" },
    { label: "Playing age", value: "18–27" },
    { label: "Based in", value: "Austin, Texas" },
    { label: "Languages", value: "English and Albanian" },
    { label: "Studio", value: "Shure SM7B home studio" },
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
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    align-items: start;
    gap: clamp(2.5rem, 6vw, 6rem);
    margin-top: clamp(2.5rem, 5vw, 4rem);
  }

  .about-biography {
    max-width: 38rem;
    font-size: 1.0625rem;
    line-height: 1.7;
    color: rgb(var(--color-secondary));
  }

  .about-biography p + p {
    margin-top: 1.25rem;
  }

  .about-biography__lead {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 3vw, 2.375rem);
    line-height: 1.15;
    color: rgb(var(--color-body));
  }

  .casting-profile {
    padding: clamp(1.5rem, 3vw, 2rem);
    border-radius: var(--radius-lg);
    background: rgb(var(--color-surface-muted));
  }

  .casting-profile__row {
    display: grid;
    grid-template-columns: 7.5rem minmax(0, 1fr);
    gap: 1rem;
    padding-block: 0.75rem;
    border-top: 1px solid rgb(var(--color-line));
    font-size: 0.9375rem;
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
    gap: clamp(0.75rem, 2vw, 1.25rem);
    margin-top: 2rem;
  }

  .headshot {
    aspect-ratio: 4 / 5;
    overflow: hidden;
    border-radius: var(--radius-lg);
    background: rgb(var(--color-surface-muted));
  }

  .headshot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 600ms var(--ease);
  }

  .headshot:hover img {
    transform: scale(1.03);
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
