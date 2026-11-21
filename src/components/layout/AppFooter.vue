<script setup lang="ts">
import '@fontsource/caveat/700.css'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import { branches } from '@/data/branches'
import { site } from '@/data/site'
import fomo from '@/assets/fomo.png'

interface FooterLink {
  label: string
  href: string
}

const year: number = new Date().getFullYear()

const links: readonly FooterLink[] = [
  { label: 'Tentang', href: '#tentang' },
  { label: 'Menu', href: '#menu' },
  { label: 'Kata teman', href: '#kata-teman' },
  { label: 'Kalcer', href: '#kalcer' },
  { label: 'Pesan antar', href: '#pesan-antar' },
  { label: 'Karier', href: '#karier' },
]

// Kartu cabang dibuat miring bergantian, seperti polaroid yang ditempel
const cardTilt = ['-rotate-2', 'rotate-[1.5deg] desk:translate-y-4', '-rotate-1'] as const
</script>

<template>
  <footer class="dark overflow-hidden bg-deep pt-[72px] pb-9 text-soft">
    <BaseContainer>
      <div class="grid gap-12 desk:grid-cols-[280px_1fr] desk:gap-10">
        <!-- kiri: stiker, tagline, menu -->
        <div>
          <img
  :src="fomo"
  alt="Logo FOMO Cafe"
  width="120"
  height="120"
  class="size-[120px] rotate-12 rounded-full border-4 border-paper shadow-[0_5px_0_rgba(0,0,0,.3)]"
/>

          <p class="mt-6 mb-3.5 font-hand text-[34px] leading-none text-lime">
            Tempat kumpul anak FOMO.
          </p>

          <nav aria-label="Navigasi footer">
            <ul class="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[15px] font-bold text-paper">
              <li v-for="link in links" :key="link.href">
                <a class="hover:text-lime hover:underline" :href="link.href">{{ link.label }}</a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- kanan: polaroid cabang -->
        <ul class="grid gap-7 pt-2.5 desk:grid-cols-3 desk:gap-5">
          <li
            v-for="(b, i) in branches"
            :key="b.id"
            class="relative rounded px-5 pt-[22px] pb-[18px] text-deep shadow-[0_7px_0_rgba(0,0,0,.35)]"
            :class="[i === 1 ? 'bg-lime' : 'bg-paper', cardTilt[i % cardTilt.length]]"
          >
            <span
              class="absolute -top-2.5 left-1/2 h-[18px] w-[60px] -translate-x-1/2 -rotate-3 bg-[rgba(255,244,180,.85)]"
              aria-hidden="true"
            ></span>
            <h3 class="font-display text-lg font-extrabold text-deep">{{ b.name }}</h3>
            <p class="mt-1 mb-2 font-hand text-[26px] leading-none" :class="i === 1 ? 'text-deep' : 'text-brand'">
              {{ b.note }}
            </p>
            <p class="text-[13px] leading-normal">{{ b.address }}</p>
            <p class="mt-2 text-[13px] font-bold">{{ b.openingHours }}</p>
          </li>
        </ul>
      </div>

      <div
        class="mt-12 flex flex-wrap justify-between gap-x-8 gap-y-4 border-t border-line/30 pt-6 text-[15px]"
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