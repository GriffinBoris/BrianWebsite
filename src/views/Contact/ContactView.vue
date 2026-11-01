<template>
  <section class="site-container section contact" aria-labelledby="contact-title">
    <div>
      <h1 id="contact-title" class="text-h1">Contact</h1>
      <p class="lead mt-4 max-w-[26rem]">For bookings and auditions, email your project details and I’ll get back to you.</p>
    </div>

    <div class="contact-card">
      <dl>
        <div class="contact-card__row">
          <dt>Email</dt>
          <dd class="contact-card__email">
            <a :href="`mailto:${bookingEmail}`">{{ bookingEmail }}</a>
            <AppButton tone="outline" :aria-label="copied ? 'Email copied' : 'Copy email address'" root-class="min-h-9 px-3" @click="copyEmail">
              <AppIcon :icon="copied ? 'check' : 'copy'" class="h-4 w-4" />
              <span>{{ copied ? "Copied" : "Copy" }}</span>
            </AppButton>
          </dd>
        </div>
        <div class="contact-card__row">
          <dt>Based in</dt>
          <dd>Austin, Texas (Central Time)</dd>
        </div>
      </dl>

      <AppButton tone="accent" size="lg" :href="auditionRequestHref" root-class="mt-6 w-full">Request an audition</AppButton>
    </div>

    <p class="sr-only" role="status" aria-live="polite">{{ copied ? "Email address copied" : "" }}</p>
  </section>
</template>

<script setup lang="ts">
  import AppButton from "@/components/ui/AppButton.vue";
  import AppIcon from "@/components/ui/AppIcon.vue";
  import { auditionRequestHref, bookingEmail } from "@/data/profiles";
  import { ref } from "vue";

  // Email links do nothing for visitors without a desktop mail app, so the address is also copyable.
  const copied = ref(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(bookingEmail);
    copied.value = true;
    window.setTimeout(() => (copied.value = false), 2000);
  }
</script>

<style scoped>
  .contact {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: center;
    gap: clamp(2rem, 6vw, 5rem);
    min-height: calc(100dvh - var(--header-height) - 10rem);
  }

  .contact-card {
    padding: clamp(1.25rem, 3vw, 2rem);
    border: 1px solid rgb(var(--color-line));
    border-radius: var(--radius-lg);
    background: rgb(var(--color-surface));
  }

  .contact-card__row {
    display: grid;
    grid-template-columns: 6.5rem minmax(0, 1fr);
    align-items: center;
    gap: 1rem;
    min-height: 3.5rem;
    padding-block: 0.5rem;
    border-bottom: 1px solid rgb(var(--color-line));
  }

  .contact-card dt {
    font-size: 0.875rem;
    color: rgb(var(--color-secondary));
  }

  .contact-card dd {
    font-weight: 500;
  }

  .contact-card__email {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem 1rem;
  }

  .contact-card__email a {
    color: rgb(var(--color-accent));
    overflow-wrap: anywhere;
  }

  .contact-card__email a:hover {
    color: rgb(var(--color-accent-strong));
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  @media (max-width: 820px) {
    .contact {
      grid-template-columns: 1fr;
      align-items: start;
      min-height: 0;
    }
  }

  @media (max-width: 420px) {
    .contact-card__row {
      grid-template-columns: 1fr;
      gap: 0.25rem;
      padding-block: 0.75rem;
    }
  }
</style>
