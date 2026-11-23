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
const shortName = (name: string): string => name.replace(/^FOMO\s+/i, '')
const toWaLink = (phone: string): string =>
  `https://wa.me/62${phone.replace(/\D/g, '').replace(/^0/, '')}`
</script>

<template>
  <section id="kunjungi" class="dark bg-night py-[84px] desk:py-28">
    <BaseContainer>
      <div
        data-reveal
class="relative -mx-7 flex flex-col overflow-hidden bg-night desk:mx-0 desk:block desk:h-[720px] desk:rounded-[36px] desk:border-4 desk:border-paper"
      >
        <!-- MOBILE: peta + judul menyatu (K2). DESKTOP: wrapper "menghilang" (contents) -->
        <div class="relative h-[460px] overflow-hidden desk:contents">

<!-- penutup tepi atas & bawah (mobile) supaya tidak ada garis tipis -->
<div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 bg-night desk:hidden" aria-hidden="true"></div>
<div class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1 bg-night desk:hidden" aria-hidden="true"></div>

          <!-- peta -->
          <div class="absolute inset-0">
            <BranchMap :branches="branches" :active-id="activeId" @select="select" />
          </div>

          <!-- fade judul -> peta (mobile) -->
          <div
  class="pointer-events-none absolute -inset-px bg-linear-to-b from-night via-night/85 via-35% to-transparent to-60% desk:hidden"
  aria-hidden="true"
></div>

          <!-- fade peta -> halaman (mobile, bawah) -->
<div
  class="pointer-events-none absolute -inset-x-px -bottom-px h-24 bg-linear-to-t from-night to-transparent desk:hidden"
  aria-hidden="true"
></div>

          <!-- fade kiri -> kanan (desktop, tetap) -->
          <div
            class="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-night/90 via-night/60 via-40% to-transparent to-65% desk:block"
            aria-hidden="true"
          ></div>

          <!-- judul -->
          <div
            class="pointer-events-none relative p-6 pt-8 text-paper desk:absolute desk:top-10 desk:left-12 desk:w-[430px] desk:p-0"
          >
            <p class="inline-block -rotate-3 font-hand text-[28px] text-lime desk:text-[32px]">
              feed the panic<span class="hidden desk:inline">, mampir yuk</span>
            </p>
            <h2 class="text-paper">
              Mampir ke
              <span class="font-hand text-[1.3em] font-bold tracking-normal text-white"
                >F.o.m.o</span
              >
            </h2>
            <p class="mt-3.5 hidden text-[15px] text-paper/80 desk:block">
              Tiga tempat nongkrong, satu vibe. Pilih yang paling dekat dari kamu.
            </p>
          </div>
        </div>

        <!-- MOBILE: tab cabang (K1) -->
        <div class="flex gap-2 px-6 pt-5 desk:hidden" role="tablist" aria-label="Pilih cabang">
          <button
            v-for="b in branches"
            :key="b.id"
            type="button"
            role="tab"
            :aria-selected="b.id === activeId"
            class="flex min-w-0 flex-1 flex-col gap-0.5 rounded-xl border px-2.5 py-2.5 text-left transition-colors"
            :class="
              b.id === activeId
                ? 'border-transparent bg-lime text-deep'
                : 'border-paper/25 bg-transparent text-paper'
            "
            @click="select(b.id)"
          >
            <span class="truncate text-[13px] font-extrabold">{{ shortName(b.name) }}</span>
            <span class="flex items-center gap-1 text-xs font-bold">
              <Star class="size-3" aria-hidden="true" />
              {{ formatRating(b.rating) }}
            </span>
          </button>
        </div>

        <!-- MOBILE: kartu detail cabang aktif (K1) -->
        <article
          class="mx-6 mt-4 -rotate-1 rounded-md bg-lime px-5 py-4 text-deep shadow-[0_6px_0_rgba(0,0,0,.35)] desk:hidden"
        >
          <div class="flex items-baseline justify-between gap-3">
            <h3 class="font-display text-[17px] font-extrabold">{{ active.name }}</h3>
            <span class="flex items-center gap-1 text-[13px] font-bold">
              <Star class="size-3.5" aria-hidden="true" />
              {{ formatRating(active.rating) }} ({{ active.reviewCount }})
            </span>
          </div>
          <div class="mt-3 grid gap-1.5 text-sm font-semibold">
            <p class="flex gap-2">
              <MapPin class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {{ active.address }}
            </p>
            <p class="flex gap-2">
              <Clock class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {{ active.openingHours }}
            </p>
            <p class="flex gap-2">
              <MessageCircle class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                <template v-if="active.whatsapp">
                  <a
                    :href="toWaLink(active.whatsapp)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="underline"
                    >{{ active.whatsapp }}</a
                  >
                  ·
                </template>
                <a :href="site.instagramUrl" class="underline">{{ site.instagramHandle }}</a>
              </span>
            </p>
          </div>
        </article>

        <!-- DESKTOP: kartu cabang (tidak berubah) -->
        <div
          class="hidden flex-col gap-3.5 desk:absolute desk:bottom-10 desk:left-12 desk:flex desk:w-[430px]"
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
        <div class="px-6 py-6 desk:absolute desk:right-10 desk:bottom-10 desk:p-0">
          <a
            :href="active.mapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper px-6 py-3.5 text-[15px] font-extrabold text-deep shadow-[0_5px_0_rgba(0,0,0,.35)] transition-transform motion-safe:hover:-translate-y-0.5 desk:w-auto"
          >
            <MapPin class="size-[18px]" aria-hidden="true" />
            Buka di Google Maps
          </a>
        </div>

        <!-- stiker (desktop) -->
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