<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue'
import { site } from '@/data/site'

const year: number = new Date().getFullYear()
</script>

<template>
  <footer class="dark overflow-hidden bg-deep pt-[72px] pb-9 text-soft">
    <BaseContainer>
      <p
        class="mb-12 font-display text-[clamp(56px,15vw,230px)] leading-[.82] font-extrabold tracking-[-.06em] whitespace-nowrap text-lime"
        aria-hidden="true"
      >
        FEED THE PANIC.
      </p>
      <div
        class="flex flex-wrap justify-between gap-x-8 gap-y-4 border-t border-line/30 pt-6 text-[15px]"
      >
        <span>© {{ year }} {{ site.name }}</span>
        <a class="hover:text-lime hover:underline" :href="site.instagramUrl">
          Instagram {{ site.instagramHandle }}
        </a>
        <a class="hover:text-lime hover:underline" :href="site.appDownloadUrl">Unduh aplikasi</a>
      </div>
    </BaseContainer>
  </footer>
</template>
