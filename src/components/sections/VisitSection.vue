<script setup lang="ts">
import '@fontsource/caveat/700.css'
import { computed, ref } from 'vue'
import { Clock, MapPin, MessageCircle, Star } from 'lucide-vue-next'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import BranchMap from '@/components/sections/BranchMap.vue'
import { branches } from '@/data/branches'
import { site } from '@/data/site'
import type { Branch } from '@/types/branch'

const activeId = ref<string>(branches[0].id)
const active = computed<Branch>(
  () => branches.find((b) => b.id === activeId.value) ?? branches[0],
)

const select = (id: string): void => {
  activeId.value = id
}
const formatRating = (n: number): string => n.toFixed(1).replace('.', ',')
const toWaLink = (phone: string): string =>
  `https://wa.me/62${phone.replace(/\D/g, '').replace(/^0/, '')}`
</script>

<template>
  <section id="kunjungi" class="dark bg-night py-[84px] desk:py-28">
    <BaseContainer>
      <div
        data-reveal
        class="relative flex flex-col overflow-hidden rounded-[36px] border-4 border-paper bg-night desk:block desk:h-[720px]"
      >
        <!-- peta -->
        <div class="order-2 h-[380px] desk:absolute desk:inset-0 desk:h-auto">
          <BranchMap :branches="branches" :active-id="activeId" @select="select" />
        </div>

        <div
          class="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-night/90 via-night/60 via-40% to-transparent to-65% desk:block"
          aria-hidden="true"
        ></div>

        <!-- judul -->
        <div
          class="order-1 p-6 text-paper desk:pointer-events-none desk:absolute desk:top-10 desk:left-12 desk:w-[430px] desk:p-0"
        >
          <p class="inline-block -rotate-3 font-hand text-[32px] text-lime">
            feed the panic, mampir yuk
          </p>
          <h2 class="text-paper">
            Mampir ke
            <span class="font-hand text-[1.3em] font-bold tracking-normal text-white">F.o.m.o</span>
          </h2>
          <p class="mt-3.5 text-[15px] text-paper/80">
            Tiga tempat nongkrong, satu vibe. Pilih yang paling dekat dari kamu.
          </p>
        </div>

        <!-- kartu cabang -->
        <div
          class="order-3 flex flex-col gap-3.5 p-6 desk:absolute desk:bottom-10 desk:left-12 desk:w-[430px] desk:p-0"
        >
          <article
            v-for="(b, i) in branches"
            :key="b.id"
            class="rounded-md text-deep shadow-[0_6px_0_rgba(0,0,0,.35)] transition-transform"
            :class="
              b.id === activeId
                ? 'bg-lime -rotate-1'
                : ['bg-paper', i % 2 === 0 ? '-rotate-[0.5deg]' : 'rotate-1']
            "
          >
            <button
              type="button"
              class="flex w-full items-baseline justify-between gap-3 px-5 py-3.5 text-left"
              :aria-pressed="b.id === activeId"
              @click="select(b.id)"
            >
              <span class="font-display text-[17px] font-extrabold">{{ b.name }}</span>
              <span class="flex items-center gap-1 text-[13px] font-bold">
                <Star class="size-3.5" aria-hidden="true" />
                {{ formatRating(b.rating) }} ({{ b.reviewCount }})
              </span>
            </button>

            <div v-if="b.id === activeId" class="grid gap-1.5 px-5 pb-4 text-sm font-semibold">
              <p class="flex gap-2">
                <MapPin class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {{ b.address }}
              </p>
              <p class="flex gap-2">
                <Clock class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {{ b.openingHours }}
              </p>
              <p class="flex gap-2">
                <MessageCircle class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  <template v-if="b.whatsapp">
                    <a
                      :href="toWaLink(b.whatsapp)"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="underline"
                      >{{ b.whatsapp }}</a
                    >
                    ·
                  </template>
                  <a :href="site.instagramUrl" class="underline">{{ site.instagramHandle }}</a>
                </span>
              </p>
            </div>
          </article>
        </div>

        <!-- tombol -->
        <div class="order-4 px-6 pb-6 desk:absolute desk:right-10 desk:bottom-10 desk:p-0">
          <a
            :href="active.mapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 text-[15px] font-extrabold text-deep shadow-[0_5px_0_rgba(0,0,0,.35)] transition-transform motion-safe:hover:-translate-y-0.5"
          >
            <MapPin class="size-[18px]" aria-hidden="true" />
            Buka di Google Maps
          </a>
        </div>

        <!-- stiker -->
        <div
          class="pointer-events-none absolute top-10 right-10 hidden size-[130px] rotate-12 flex-col items-center justify-center rounded-full border-4 border-paper bg-brand text-paper desk:flex"
          aria-hidden="true"
        >
          <span class="font-display text-[28px] font-extrabold">FOMO</span>
          <span class="text-[11px] tracking-[.1em]">FEED THE PANIC</span>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>