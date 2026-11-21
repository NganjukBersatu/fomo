<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'
</script>

<template>
  <section class="flex min-h-[80vh] items-center pt-32 pb-24">
    <BaseContainer>
      <p class="mb-4 text-sm font-bold tracking-[.16em] text-brand uppercase">Error 404</p>
      <h1 class="mb-6 text-[clamp(56px,10vw,140px)] tracking-[-.05em]">
        Yah, <em class="text-brand">ketinggalan.</em>
      </h1>
      <p class="mb-8 max-w-[440px] text-lg">
        Halaman yang kamu cari tidak ada. Balik lagi ke FOMO biar nggak ketinggalan apa-apa.
      </p>
      <BaseButton href="/">Kembali ke beranda</BaseButton>
    </BaseContainer>
  </section>
</template>
