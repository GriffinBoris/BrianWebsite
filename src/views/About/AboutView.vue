<template>
  <div class="site-container section">
    <h1 class="text-h1">About Brian</h1>

    <div class="about-layout">
      <div class="about-biography">
        <p>I’m Brian, a voice actor based in Austin, Texas. I work in English and Albanian.</p>
        <p>For voice projects, I record from a dedicated home studio with a Shure SM7B.</p>
      </div>

      <section aria-labelledby="profile-title">
        <h2 id="profile-title" class="text-h3">Casting profile</h2>
        <dl class="mt-3">
          <div v-for="fact in facts" :key="fact.label" class="profile-row">
            <dt>{{ fact.label }}</dt>
            <dd>{{ fact.value }}</dd>
          </div>
        </dl>
      </section>
    </div>

    <section class="mt-14" aria-labelledby="headshots-title">
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

  const facts = [
    { label: "Languages", value: "English and Albanian" },
    { label: "Based in", value: "Austin, Texas" },
    { label: "Playing age", value: "18–27" },
    { label: "Union status", value: "Nonunion" },
    { label: "Studio", value: "Home studio, Shure SM7B" },
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
    margin-top: 1.5rem;
  }

  .about-biography {
    max-width: 38rem;
    font-size: 1.0625rem;
    line-height: 1.7;
  }

  .profile-row {
    display: grid;
    grid-template-columns: 7rem minmax(0, 1fr);
    gap: 1rem;
    padding-block: 0.625rem;
    border-top: 1px solid rgb(var(--color-line));
    font-size: 0.875rem;
  }

  .profile-row:last-child {
    border-bottom: 1px solid rgb(var(--color-line));
  }

  .profile-row dt {
    color: rgb(var(--color-secondary));
  }

  .profile-row dd {
    font-weight: 500;
  }

  .about-biography p + p {
    margin-top: 1rem;
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
