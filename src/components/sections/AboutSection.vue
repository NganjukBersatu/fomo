<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import { perks } from '@/data/perks'
import tentangFoto from '@/assets/tentang-kami.jpg'
</script>

<template>
  <section id="tentang" class="scroll-mt-24 pb-[84px] desk:pb-28">
    <BaseContainer>
      <div class="grid items-center gap-8 desk:grid-cols-2 desk:gap-16">
        <!-- Teks dulu di mobile supaya langsung terbaca, foto di kiri pada desktop -->
        <div data-reveal class="desk:order-2">
          <SectionKicker>Tentang kami</SectionKicker>
          <h2 class="mb-4 desk:mb-6">Cerita di balik <em>FOMO</em></h2>
          <p class="max-w-[480px] text-[17px] leading-relaxed desk:text-lg">
            Lampu hangat, aroma kopi yang baru diseduh, dan kursi yang bikin betah
            duduk lama. Di FOMO, obrolan mengalir pelan, tawa pecah di tiap meja,
            dan kamu pulang bawa cerita. Makanya namanya FOMO biar nggak
            ketinggalan kumpul, cerita, dan rasa.
          </p>
        </div>

        <div data-reveal class="relative mx-1 desk:order-1 desk:mx-0">
          <!-- Blok lime di belakang foto sebagai aksen -->
          <div
            class="absolute inset-0 translate-x-2 translate-y-2 rotate-2 rounded-[28px] bg-lime desk:translate-x-3 desk:translate-y-3"
            aria-hidden="true"
          ></div>
          <img
            :src="tentangFoto"
            alt="FOMO Culture: Prambon, Ngronggot, A. Yani Nganjuk"
            loading="lazy"
            class="relative h-auto w-full rounded-[28px] border-2 border-line object-cover desk:aspect-[4/5]"
          />
          <!-- Label lokasi -->
          <p
            class="absolute bottom-3 left-3 rounded-full bg-mint/95 px-3.5 py-1.5 text-[12px] font-bold text-brand shadow-[0_8px_20px_rgba(27,58,44,.25)] desk:bottom-5 desk:left-5 desk:text-[13px]"
          >
            Prambon · Ngronggot · A. Yani, Nganjuk
          </p>
        </div>
      </div>

      <ul
        data-reveal
        class="mt-10 grid grid-cols-3 divide-x-2 divide-line overflow-hidden rounded-[22px] border-2 border-line bg-white shadow-[0_12px_30px_rgba(27,58,44,.12)] desk:mt-14 desk:gap-3 desk:divide-x-0 desk:overflow-visible desk:rounded-none desk:border-0 desk:bg-transparent desk:shadow-none"
      >
        <li
          v-for="perk in perks"
          :key="perk.title"
          class="flex flex-col items-center gap-2 px-2 py-4 text-center transition-[translate,background-color] desk:grid desk:grid-cols-[auto_1fr] desk:items-center desk:gap-x-4 desk:gap-y-0.5 desk:rounded-[22px] desk:border-2 desk:border-line desk:bg-white desk:px-6 desk:py-5 desk:text-left desk:hover:-translate-y-1 desk:hover:bg-soft"
        >
          <span
            class="grid size-11 place-items-center rounded-full border-2 border-ink bg-lime text-ink desk:row-span-2 desk:size-12"
          >
            <component :is="perk.icon" class="size-5 desk:size-6" :stroke-width="2.25" />
          </span>
          <strong class="font-display text-[13px] leading-tight text-ink desk:text-xl">{{ perk.title }}</strong>
          <span class="hidden text-[15px] leading-snug desk:block">{{ perk.description }}</span>
        </li>
      </ul>
    </BaseContainer>
  </section>
</template>