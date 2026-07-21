<template>
  <footer class="border-t border-line py-11 text-[0.9rem] text-secondary">
    <div class="site-container flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
      <p>&copy; {{ year }} Brian Bakaj. Actor.</p>
      <p>Austin, TX · Screen &amp; voice · Remote-ready</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
  const year = new Date().getFullYear();
</script>
