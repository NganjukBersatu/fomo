<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import logoUrl from '@/assets/logo.png'
import { navLinks } from '@/data/site'

const isOpen = ref<boolean>(false)

function toggleMenu(): void {
  isOpen.value = !isOpen.value
}

function closeMenu(): void {
  isOpen.value = false
}
</script>

<template>
  <header class="fixed inset-x-0 top-3 z-50 px-4">
    <div
      class="relative mx-auto flex max-w-[1100px] items-center gap-5 rounded-full border-2 border-line bg-mint/95 py-2 pr-2.5 pl-3 backdrop-blur-[10px]"
    >
      <RouterLink
        to="/"
        class="flex items-center gap-2.5 font-display text-[22px] font-extrabold text-ink"
        @click="closeMenu"
      >
        <img
          :src="logoUrl"
          width="44"
          height="44"
          alt="Logo FOMO Cafe: Feed the panic"
          class="size-11 rounded-full"
        />
        <span>FOMO</span>
      </RouterLink>

      <nav
        id="mnav"
        aria-label="Navigasi utama"
        class="absolute inset-x-0 top-[calc(100%+8px)] flex-col rounded-[28px] border-2 border-line bg-mint p-2.5 desk:static desk:ml-auto desk:flex-row desk:gap-1 desk:rounded-none desk:border-0 desk:bg-transparent desk:p-0"
        :class="isOpen ? 'flex' : 'hidden desk:flex'"
        @click="closeMenu"
      >
        <RouterLink
          v-for="link in navLinks"
          :key="link.hash"
          :to="{ path: '/', hash: link.hash }"
          class="rounded-full px-[18px] py-3.5 text-[15px] font-semibold text-ink hover:bg-soft desk:px-3.5 desk:py-2.5"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <RouterLink
        :to="{ path: '/', hash: '#kunjungi' }"
        class="hidden rounded-full bg-ink px-[22px] py-3 text-[15px] font-bold text-white hover:bg-brand desk:block"
      >
        Kunjungi kami
      </RouterLink>

      <button
        type="button"
        class="ml-auto grid size-[46px] cursor-pointer place-items-center rounded-full border-0 bg-soft p-0 text-ink desk:hidden"
        aria-label="Buka menu navigasi"
        aria-controls="mnav"
        :aria-expanded="isOpen"
        @click="toggleMenu"
      >
        <X v-if="isOpen" class="size-5" aria-hidden="true" />
        <Menu v-else class="size-5" aria-hidden="true" />
      </button>
    </div>
  </header>
</template>
