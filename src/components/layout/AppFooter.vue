<script setup lang="ts">
import '@fontsource/caveat/700.css'
import { RouterLink } from 'vue-router'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import { branches } from '@/data/branches'
import { navLinks, site } from '@/data/site'
import fomo from '@/assets/fomo.png'

const year: number = new Date().getFullYear()

// Karier dan Pesan antar tidak dipakai di footer
const HIDDEN_HASHES: readonly string[] = ['#tim', '#pesan']
const footerLinks = navLinks.filter((link) => !HIDDEN_HASHES.includes(link.hash ?? ''))

// Kartu cabang miring bergantian seperti polaroid; di mobile miringnya dibuat tipis
const cardTilt = [
  '-rotate-1 desk:-rotate-2',
  'rotate-1 desk:rotate-[1.5deg] desk:translate-y-4',
  '-rotate-1',
] as const
</script>

<template>
  <footer class="dark overflow-hidden bg-deep pt-12 pb-8 text-soft desk:pt-[72px] desk:pb-9">
    <BaseContainer>
      <div class="grid gap-8 desk:grid-cols-[280px_1fr] desk:gap-10">
        <!-- kiri: logo, tagline, menu -->
        <div>
          <div class="flex items-center gap-4 desk:block">
            <img
              :src="fomo"
              alt="Logo FOMO Cafe"
              width="120"
              height="120"
              class="size-[72px] shrink-0 rotate-12 rounded-full border-4 border-paper shadow-[0_5px_0_rgba(0,0,0,.3)] desk:size-[120px]"
            />
            <p
              class="font-hand text-[28px] leading-none text-lime desk:mt-6 desk:mb-3.5 desk:text-[34px]"
            >
              Tempat kumpul anak FOMO.
            </p>
          </div>

          <nav aria-label="Navigasi footer" class="mt-6 desk:mt-0">
            <ul
              class="grid grid-cols-2 gap-x-4 border-y border-line/30 py-2 text-[15px] font-bold text-paper desk:gap-y-1.5 desk:border-0 desk:py-0"
            >
              <li v-for="link in footerLinks" :key="link.label">
                <RouterLink
                  :to="link.path ?? { path: '/', hash: link.hash }"
                  class="inline-block py-2 hover:text-lime hover:underline desk:py-0"
                >
                  {{ link.label }}
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>

        <!-- kanan: polaroid cabang (informasi saja) -->
        <ul class="grid gap-4 pt-1 desk:grid-cols-3 desk:gap-5 desk:pt-2.5">
          <li
            v-for="(b, i) in branches"
            :key="b.id"
            class="relative grid grid-cols-[1fr_auto] items-baseline gap-x-3 rounded px-4 pt-4 pb-3 text-deep shadow-[0_4px_0_rgba(0,0,0,.35)] desk:block desk:px-5 desk:pt-[22px] desk:pb-[18px] desk:shadow-[0_7px_0_rgba(0,0,0,.35)]"
            :class="[i === 1 ? 'bg-lime' : 'bg-paper', cardTilt[i % cardTilt.length]]"
          >
            <span
              class="absolute -top-2.5 left-1/2 h-[18px] w-[60px] -translate-x-1/2 -rotate-3 bg-[rgba(255,244,180,.85)]"
              aria-hidden="true"
            ></span>
            <h3 class="font-display text-base font-extrabold text-deep desk:text-lg">
              {{ b.name }}
            </h3>
            <p
              class="col-span-2 mt-0.5 font-hand text-[22px] leading-none desk:mt-1 desk:mb-2 desk:text-[26px]"
              :class="i === 1 ? 'text-deep' : 'text-brand'"
            >
              {{ b.note }}
            </p>
            <!-- alamat lengkap hanya di desktop; di mobile sudah ada di section Kunjungi -->
            <p class="hidden text-[13px] leading-normal desk:block">{{ b.address }}</p>
            <!-- mobile: jam buka sejajar dengan nama cabang -->
            <p
              class="col-start-2 row-start-1 text-[13px] font-bold desk:col-auto desk:row-auto desk:mt-2"
            >
              {{ b.openingHours }}
            </p>
          </li>
        </ul>
      </div>

      <div
        class="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-1 border-t border-line/30 pt-5 text-[15px] desk:mt-12 desk:gap-y-4 desk:pt-6"
      >
        <span class="w-full text-soft/80 desk:w-auto desk:text-soft">
          © {{ year }} {{ site.name }}
        </span>
        <a
          class="py-1.5 font-semibold hover:text-lime hover:underline desk:py-0"
          :href="site.instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram {{ site.instagramHandle }}
        </a>
        <a
          class="py-1.5 font-semibold hover:text-lime hover:underline desk:py-0"
          :href="site.appDownloadUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unduh aplikasi
        </a>
      </div>
    </BaseContainer>
  </footer>
</template>