<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <a
    class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[99] focus:rounded-lg focus:bg-white focus:px-3.5 focus:py-2.5"
    href="#isi"
  >
    Lewati ke konten
  </a>

  <AppNavbar />

  <main id="isi">
    <RouterView />
  </main>

  <AppFooter />
</template>
