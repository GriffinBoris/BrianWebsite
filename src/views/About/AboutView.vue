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
  </div>
</template>

<script setup lang="ts">
  const facts = [
    { label: "Languages", value: "English and Albanian" },
    { label: "Based in", value: "Austin, Texas" },
    { label: "Playing age", value: "18–27" },
    { label: "Union status", value: "Nonunion" },
    { label: "Studio", value: "Home studio, Shure SM7B" },
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

  @media (max-width: 820px) {
    .about-layout {
      grid-template-columns: 1fr;
    }
  }
</style>
