<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import TeamCards from '@/components/sections/TeamCards.vue'
import { deliveryApps } from '@/data/site'
</script>

<template>
  <section
    id="pesan"
    class="dark rounded-[36px] bg-brand py-[84px] text-white desk:rounded-[56px] desk:py-28"
  >
    <BaseContainer>
      <div data-reveal>
        <SectionKicker tone="light">Pesan antar</SectionKicker>
        <h2 class="text-white">Tak sempat <em>mampir?</em></h2>
      </div>

      <div
        data-reveal
        class="mt-11 mb-[72px] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4"
      >
        <a
          v-for="app in deliveryApps"
          :key="app.name"
          :href="app.url"
          class="flex flex-col gap-1.5 rounded-[30px] bg-ink p-[30px] font-display text-[30px] font-extrabold text-white transition-[translate,background-color,color] hover:-translate-y-1.5 hover:bg-lime hover:text-deep"
        >
          {{ app.name }}
          <span class="flex items-center gap-1.5 font-sans text-[15px] font-semibold">
            Pesan sekarang
            <ArrowRight class="size-4" aria-hidden="true" />
          </span>
        </a>
      </div>

      <TeamCards />
    </BaseContainer>
  </section>
</template>
