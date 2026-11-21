<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import { perks } from '@/data/perks'
import tentangFoto from '@/assets/tentang-kami.jpg'
</script>

<template>
  <section id="tentang" class="scroll-mt-24 pb-[84px] desk:pb-28">
    <BaseContainer>
      <div class="grid items-center gap-10 desk:grid-cols-2 desk:gap-16">
       <img
  data-reveal
  :src="tentangFoto"
  alt="FOMO Culture: Prambon, Ngronggot, A. Yani Nganjuk"
  loading="lazy"
  class="aspect-[4/5] w-full rounded-[28px] border-2 border-line object-cover"
/>

        <div data-reveal>
          <SectionKicker>Tentang kami</SectionKicker>
          <h2 class="mb-6">Cerita Dibalik <em>FOMO</em></h2>
          <p class="max-w-[480px] text-lg">
            Lampu hangat, aroma kopi yang baru diseduh, dan kursi yang bikin betah
            duduk lama. Di FOMO, obrolan mengalir pelan, tawa pecah di tiap meja,
            dan kamu pulang bawa cerita. Makanya namanya FOMO biar nggak
            ketinggalan kumpul, cerita, dan rasa.
          </p>
        </div>
      </div>

      <ul data-reveal class="mt-12 grid gap-3 desk:grid-cols-3">
        <li
          v-for="perk in perks"
          :key="perk.title"
          class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-0.5 rounded-[22px] border-2 border-line bg-white px-6 py-5 transition-[translate,background-color] hover:-translate-y-1 hover:bg-soft"
        >
          <span
            class="row-span-2 grid size-12 place-items-center rounded-full border-2 border-ink bg-lime text-ink"
          >
            <component :is="perk.icon" class="size-6" :stroke-width="2.25" />
          </span>
          <strong class="font-display text-xl text-ink">{{ perk.title }}</strong>
          <span class="text-[15px] leading-snug">{{ perk.description }}</span>
        </li>
      </ul>
    </BaseContainer>
  </section>
</template>