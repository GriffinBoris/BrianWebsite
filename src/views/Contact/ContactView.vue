<template>
  <section class="site-container contact" aria-labelledby="contact-title">
    <h1 id="contact-title" class="text-h1">Bookings and auditions</h1>
    <p class="lead mt-4">Email your project details and I’ll get back to you.</p>

    <a class="contact__email" :href="`mailto:${bookingEmail}`">{{ bookingEmail }}</a>

    <AppButton tone="accent" size="lg" :href="auditionRequestHref" root-class="mt-8">Request an audition</AppButton>

    <ul class="contact__profiles">
      <li v-for="profile in profiles" :key="profile.label">
        <a :href="profile.href" target="_blank" rel="noopener noreferrer" class="contact__profile">
          <span>{{ profile.label }}</span>
          <AppIcon icon="externalLink" class="h-4 w-4" />
          <span class="sr-only"> (opens in a new tab)</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
  import AppButton from "@/components/ui/AppButton.vue";
  import AppIcon from "@/components/ui/AppIcon.vue";
  import { auditionRequestHref, bookingEmail, profiles } from "@/data/profiles";
</script>

<style scoped>
  /* One centred block: the page exists to get an email sent. */
  .contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 40rem;
    padding-block: clamp(4rem, 12vh, 8rem);
    text-align: center;
  }

  .contact__email {
    margin-top: 2.5rem;
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    font-weight: 650;
    letter-spacing: -0.03em;
    color: rgb(var(--color-accent));
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 0.2em;
    overflow-wrap: anywhere;
  }

  .contact__email:hover {
    color: rgb(var(--color-accent-strong));
  }

  .contact__profiles {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    min-width: 16rem;
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgb(var(--color-line));
  }

  .contact__profile {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    min-height: 2.75rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: rgb(var(--color-secondary));
  }

  .contact__profile:hover {
    color: rgb(var(--color-body));
  }
</style>
