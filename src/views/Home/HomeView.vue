<template>
  <section class="home-hero" aria-labelledby="hero-title">
    <div class="site-container">
      <div class="home-hero__layout">
        <div class="home-hero__intro">
          <p class="eyebrow mb-5">Voice actor</p>
          <h1 id="hero-title" class="home-hero__name"><span>Brian</span> <span>Bakaj</span></h1>
          <p class="lead mt-6 max-w-[35ch]">I’m based in Austin, Texas, and perform in English and Albanian.</p>
          <div class="mt-7">
            <AppButton tone="accent" label="Contact Brian" :to="{ name: 'contact' }" icon="arrowRight" />
          </div>
        </div>

        <figure class="home-hero__portrait">
          <img
            :src="headshot"
            alt="Brian Bakaj, outdoor headshot"
            width="565"
            height="476"
            fetchpriority="high"
            class="block h-auto w-full"
          />
        </figure>
      </div>
    </div>
  </section>

  <section id="reels" class="section demos-section" aria-labelledby="demos-title">
    <div class="site-container">
      <h2 id="demos-title" class="mb-8 text-h2">Voice Over Demos</h2>
      <div class="demo-list">
        <DemoCard v-for="track in demoTracks" :key="track.id" :track="track" />
      </div>
    </div>
  </section>

  <section class="section booking-section" aria-labelledby="book-title">
    <div class="site-container booking-section__layout">
      <div>
        <h2 id="book-title" class="text-h2">Bookings and auditions</h2>
        <p class="lead mt-4 max-w-[42ch]">Tell me about your project, the role, and your timeline.</p>
        <a class="booking-section__email" href="mailto:brianbakaj@icloud.com">brianbakaj@icloud.com</a>
      </div>
      <div class="flex flex-wrap items-center gap-3.5">
        <AppButton tone="accent" label="Contact Brian" :to="{ name: 'contact' }" />
        <AppButton tone="link" label="About Brian" :to="{ name: 'about' }" icon="arrowRight" />
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
  .home-hero {
    padding-block: clamp(2.5rem, 5vw, 4.5rem);
  }

  .home-hero__layout {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    align-items: center;
    gap: clamp(2rem, 7vw, 6rem);
  }

  .home-hero__name {
    font-size: var(--font-size-display);
    font-weight: 500;
    line-height: 0.96;
    letter-spacing: -0.065em;
  }

  .home-hero__name span {
    display: block;
  }

  .home-hero__portrait {
    padding: 0.65rem;
    border: 1px solid rgb(var(--color-line));
    border-radius: var(--radius-sm);
    background: rgb(var(--color-surface));
    transform: rotate(1.5deg);
  }

  .home-hero__portrait img {
    border-radius: calc(var(--radius-sm) / 2);
  }

  .demos-section {
    padding-top: clamp(2rem, 4vw, 3.5rem);
  }

  .demo-list {
    overflow: hidden;
    border: 1px solid rgb(var(--color-line));
    border-radius: var(--radius-md);
    background: rgb(var(--color-surface));
  }

  .booking-section {
    border-top: 1px solid rgb(var(--color-line));
    background: rgb(var(--color-surface-muted));
  }

  .booking-section__layout {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2.5rem;
  }

  .booking-section__email {
    display: inline-block;
    margin-top: 1.5rem;
    color: rgb(var(--color-accent));
    text-decoration: underline;
    text-underline-offset: 0.3em;
  }

  @media (max-width: 720px) {
    .home-hero__layout {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .home-hero__intro {
      order: 1;
    }
    .home-hero__portrait {
      width: min(100%, 18rem);
      justify-self: end;
      margin-right: 0.5rem;
    }
    .home-hero__name span {
      display: inline;
    }
    .booking-section__layout {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .home-hero__portrait {
      transform: none;
    }
  }
</style>
