<template>
  <section class="home-introduction" aria-labelledby="hero-title">
    <div class="site-container home-grid">
      <div class="home-identity">
        <p class="home-role">Voice actor</p>
        <h1 id="hero-title">Brian Bakaj</h1>
      </div>
      <figure class="home-portrait">
        <img :src="headshot" alt="Brian Bakaj, outdoor headshot" width="565" height="476" fetchpriority="high" />
      </figure>
      <div class="home-intro">
        <p>I’m based in Austin, Texas, and perform in English and Albanian.</p>
        <RouterLink class="home-about" :to="{ name: 'about' }">
          <span>About Brian</span>
          <AppIcon icon="arrowRight" class="h-5 w-5" />
        </RouterLink>
      </div>
    </div>
  </section>

  <section id="reels" class="home-demos" aria-labelledby="demos-title">
    <div class="site-container">
      <h2 id="demos-title">Voice Over Demos</h2>
      <div class="demo-list">
        <DemoCard v-for="track in demoTracks" :key="track.id" :track="track" />
      </div>
    </div>
  </section>

  <section class="booking-section" aria-labelledby="book-title">
    <div class="site-container booking-layout">
      <div class="booking-copy">
        <h2 id="book-title">Bookings and auditions</h2>
        <p>Tell me about your project, the role, and your timeline.</p>
        <a href="mailto:brianbakaj@icloud.com">brianbakaj@icloud.com</a>
      </div>
      <AppButton tone="accent" :to="{ name: 'contact' }" root-class="booking-button">
        <span>Contact Brian</span>
        <AppIcon icon="arrowRight" class="h-5 w-5" />
      </AppButton>
    </div>
  </section>
</template>

<script setup lang="ts">
  import headshot from "@/assets/img/headshot.jpg";
  import AppButton from "@/components/ui/AppButton.vue";
  import AppIcon from "@/components/ui/AppIcon.vue";
  import DemoCard from "@/components/player/DemoCard.vue";
  import { usePlayer } from "@/composables/usePlayer";
  import { demoTracks } from "@/data/demos";
  import { onMounted } from "vue";
  import { RouterLink } from "vue-router";

  const { loadDurations } = usePlayer();
  onMounted(() => loadDurations(demoTracks));
</script>

<style scoped>
  .home-introduction {
    color: rgb(var(--color-intro-ink));
    background: rgb(var(--color-intro));
  }

  .home-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    grid-template-areas: "identity portrait" "intro portrait";
    grid-template-rows: min-content 1fr;
    align-content: center;
    column-gap: var(--space-12);
    min-height: 320px;
    padding-top: var(--space-6);
  }

  .home-identity {
    grid-area: identity;
    padding-top: var(--space-2);
  }

  .home-role {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.055em;
    color: rgb(var(--color-intro-muted));
  }

  .home-identity h1 {
    margin-top: var(--space-2);
    font-size: var(--font-size-display);
    line-height: 1.04;
    font-weight: 600;
    letter-spacing: -0.045em;
  }

  .home-portrait {
    grid-area: portrait;
    align-self: center;
    padding-bottom: var(--space-6);
  }

  .home-portrait img {
    width: 100%;
    height: auto;
    border-radius: var(--radius-photo);
    box-shadow: var(--shadow-photo);
  }

  .home-intro {
    grid-area: intro;
    padding-block: var(--space-4) var(--space-6);
  }

  .home-intro p {
    max-width: 30rem;
    font-size: var(--font-size-lead);
    line-height: var(--line-height-lead);
  }

  .home-about {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    min-height: 44px;
    margin-top: var(--space-3);
    color: rgb(var(--color-intro-muted));
    text-decoration: underline;
    text-underline-offset: 6px;
    text-decoration-thickness: 1px;
  }

  .home-about:hover {
    color: rgb(var(--color-intro-ink));
  }

  .home-about:focus-visible {
    outline-color: rgb(var(--color-intro-muted));
  }

  .home-demos {
    padding-block: 28px 20px;
    border-block: 1px solid rgb(var(--color-line));
    background: rgb(var(--color-surface-muted));
  }

  .home-demos h2 {
    margin-bottom: var(--space-4);
    font-size: var(--font-size-h2);
    line-height: 1.2;
    font-weight: 500;
    letter-spacing: -0.035em;
  }

  .booking-section {
    padding-block: var(--space-6);
  }

  .booking-layout {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-8);
  }

  .booking-copy h2 {
    font-size: 24px;
    letter-spacing: -0.03em;
  }

  .booking-copy p {
    margin-top: var(--space-2);
    color: rgb(var(--color-secondary));
  }

  .booking-copy > a {
    display: inline-flex;
    align-items: center;
    min-height: 32px;
    color: rgb(var(--color-accent));
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  .booking-button {
    flex: none;
    gap: var(--space-6);
    min-height: 48px;
    padding-inline: var(--space-6);
    font-size: 15px;
  }

  @media (max-width: 960px) {
    .home-grid {
      grid-template-columns: minmax(0, 1fr) 240px;
      column-gap: var(--space-8);
      min-height: 270px;
    }
    .home-identity h1 {
      font-size: 56px;
    }
    .home-intro p {
      font-size: 17px;
    }
  }

  @media (max-width: 760px) {
    .home-grid {
      grid-template-columns: minmax(0, 1fr) 144px;
      grid-template-areas: "identity portrait" "intro intro";
      align-items: center;
      gap: 0 var(--space-6);
      min-height: 0;
      padding-top: var(--space-6);
    }
    .home-identity {
      padding-top: 0;
    }
    .home-identity h1 {
      font-size: 38px;
    }
    .home-role {
      font-size: 13px;
    }
    .home-portrait {
      align-self: center;
      padding-bottom: 0;
    }
    .home-portrait img {
      aspect-ratio: 4 / 5;
      object-fit: cover;
      object-position: center 40%;
    }
    .home-intro {
      padding-top: var(--space-6);
    }
    .home-intro p {
      max-width: 40ch;
    }
    .home-about {
      margin-top: var(--space-2);
    }
    .home-demos {
      padding-block: var(--space-6);
    }
    .home-demos h2 {
      font-size: 26px;
    }
    .booking-layout {
      align-items: flex-start;
      flex-direction: column;
      gap: var(--space-4);
    }
    .booking-copy h2 {
      font-size: 23px;
    }
  }

  @media (max-width: 420px) {
    .home-grid {
      grid-template-columns: minmax(0, 1fr) 128px;
      column-gap: var(--space-4);
    }
    .home-identity h1 {
      font-size: clamp(28px, 8vw, 34px);
    }
  }
  @media (max-width: 360px) {
    .home-grid {
      grid-template-columns: minmax(0, 1fr) 104px;
    }
    .home-identity h1 {
      font-size: 26px;
    }
  }
</style>
