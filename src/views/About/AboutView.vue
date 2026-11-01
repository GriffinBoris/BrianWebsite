<template>
  <div class="site-container section">
    <h1 class="text-h1">About Brian</h1>

    <div class="about-biography">
      <p>I’m Brian, a voice actor based in Austin, Texas. I work in English and Albanian.</p>
      <p>For voice projects, I record from a dedicated home studio with a Shure SM7B.</p>
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

  const shots = [
    { src: look01, alt: "Brian Bakaj, portrait against a yellow wall" },
    { src: look02, alt: "Brian Bakaj, portrait against a gray wall" },
    { src: headshot, alt: "Brian Bakaj, outdoor headshot" },
  ];
</script>

<style scoped>
  .about-biography {
    max-width: 38rem;
    margin-top: 1.5rem;
    font-size: 1.0625rem;
    line-height: 1.7;
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

  @media (max-width: 560px) {
    .headshots-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
