<template>
  <section class="home-section" aria-labelledby="hero-title">
    <div class="site-container home-grid">
      <div class="home-identity">
        <p class="eyebrow">Voice actor</p>
        <h1 id="hero-title">Brian Bakaj</h1>
      </div>

      <figure class="home-portrait">
        <img :src="headshot" alt="Brian Bakaj, outdoor headshot" width="565" height="476" fetchpriority="high" />
      </figure>

      <div class="home-intro">
        <p class="lead">I’m based in Austin, Texas, and perform in English and Albanian.</p>
        <AppButton tone="accent" label="Contact Brian" :to="{ name: 'contact' }" />
      </div>

      <section id="reels" class="home-demos" aria-labelledby="demos-title">
        <h2 id="demos-title">Voice Over Demos</h2>
        <div class="demo-list">
          <DemoCard v-for="track in demoTracks" :key="track.id" :track="track" />
        </div>
      </section>
    </div>
  </section>

  <section class="booking-section" aria-labelledby="book-title">
    <div class="site-container booking-layout">
      <div class="booking-copy">
        <h2 id="book-title">Bookings and auditions</h2>
        <p>Tell me about your project, the role, and your timeline.</p>
        <a href="mailto:brianbakaj@icloud.com">brianbakaj@icloud.com</a>
      </div>
      <div class="booking-actions">
        <AppButton tone="accent" label="Contact Brian" :to="{ name: 'contact' }" />
        <AppButton tone="ghost" label="About Brian" :to="{ name: 'about' }" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import headshot from "@/assets/img/headshot.jpg";
  import AppButton from "@/components/ui/AppButton.vue";
  import DemoCard from "@/components/player/DemoCard.vue";
  import { usePlayer } from "@/composables/usePlayer";
  import { demoTracks } from "@/data/demos";
  import { onMounted } from "vue";

  const { loadDurations } = usePlayer();
  onMounted(() => loadDurations(demoTracks));
</script>

<style scoped>
  .home-section {
    padding-block: 36px;
  }

  .home-grid {
    display: grid;
    grid-template-columns: 300px minmax(0, 1fr);
    grid-template-areas: "portrait identity" "portrait intro" "portrait demos";
    align-items: start;
    column-gap: 48px;
    row-gap: 22px;
  }

  .home-identity {
    grid-area: identity;
  }

  .home-identity h1 {
    margin-top: 8px;
    font-size: var(--font-size-display);
    line-height: 1.06;
    font-weight: 600;
    letter-spacing: -0.045em;
  }

  .home-portrait {
    grid-area: portrait;
  }

  .home-portrait img {
    width: 100%;
    aspect-ratio: 4 / 5;
    height: auto;
    object-fit: cover;
    object-position: center 35%;
    border-radius: var(--radius-md);
  }

  .home-intro {
    grid-area: intro;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .home-intro p {
    flex: 1;
    min-width: 0;
    max-width: 40ch;
  }

  .home-intro :deep(a) {
    flex: none;
  }

  .home-demos {
    grid-area: demos;
    min-width: 0;
  }

  .home-demos h2 {
    margin-bottom: 10px;
    font-size: 22px;
    line-height: 1.3;
    font-weight: 600;
    letter-spacing: -0.025em;
  }

  .demo-list {
    border-top: 1px solid rgb(var(--color-line));
  }

  .booking-section {
    border-top: 1px solid rgb(var(--color-line));
    padding-block: 28px;
  }

  .booking-layout {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .booking-layout h2 {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.025em;
  }

  .booking-layout p {
    margin-top: 6px;
    color: rgb(var(--color-secondary));
  }

  .booking-copy > a {
    display: inline-block;
    margin-top: 8px;
    color: rgb(var(--color-accent));
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .booking-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  @media (max-width: 960px) {
    .home-grid {
      grid-template-columns: minmax(0, 1fr) 220px;
      grid-template-areas: "identity portrait" "intro portrait" "demos demos";
      column-gap: 32px;
    }
    .home-identity h1 {
      font-size: 44px;
    }
    .home-intro {
      display: block;
    }
    .home-intro :deep(a) {
      margin-top: 16px;
    }
    .home-portrait img {
      aspect-ratio: 1 / 1;
    }
  }

  @media (max-width: 600px) {
    .home-section {
      padding-block: 24px 28px;
    }
    .home-grid {
      grid-template-columns: minmax(0, 1fr) 104px;
      grid-template-areas: "identity portrait" "intro intro" "demos demos";
      gap: 22px 20px;
    }
    .home-identity h1 {
      font-size: clamp(30px, 8vw, 40px);
      letter-spacing: -0.04em;
    }
    .home-portrait img {
      aspect-ratio: 4 / 5;
    }
    .home-demos h2 {
      font-size: 21px;
    }
    .booking-layout {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }
    .booking-layout h2 {
      font-size: 21px;
    }
  }
</style>
