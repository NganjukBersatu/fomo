<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import MenuFavoriteCard from '@/components/ui/MenuFavoriteCard.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import { favoriteMenus } from '@/data/menu'

// Pagination carousel mobile (gap-4 = 16px)
const GAP = 16
const scroller = ref<HTMLElement | null>(null)
const active = ref(0)

function step(el: HTMLElement) {
  return (el.children[0] as HTMLElement).offsetWidth + GAP
}
function onScroll() {
  const el = scroller.value
  if (!el) return
  active.value = Math.round(el.scrollLeft / step(el))
}
function goTo(i: number) {
  const el = scroller.value
  if (!el) return
  el.scrollTo({ left: i * step(el), behavior: 'smooth' })
}
</script>

<template>
  <section
    id="menu"
    class="rounded-[36px] bg-white pt-14 pb-24 shadow-[0_-1px_0_var(--color-line)] desk:rounded-[56px] desk:pt-28 desk:pb-28"
  >
    <BaseContainer>
      <div data-reveal class="mb-6 flex flex-wrap items-end justify-between gap-5 desk:mb-12">
        <div>
          <SectionKicker>Menu terbaru</SectionKicker>
          <h2>Yang bikin <em>balik lagi</em></h2>
        </div>
      </div>

      <!--
        Mobile: carousel 1 kartu per geser, kartu pas selebar container (tidak ada kartu lain
        yang mengintip). Desktop: grid seperti semula.
      -->
      <div
        ref="scroller"
        class="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden desk:grid desk:items-stretch desk:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] desk:gap-[22px] desk:overflow-visible"
        @scroll.passive="onScroll"
      >
        <MenuFavoriteCard
          v-for="(menu, index) in favoriteMenus"
          :key="menu.name"
          data-reveal
          :menu="menu"
          :featured="index === 1"
          class="w-full shrink-0 snap-start snap-always desk:w-auto"
        />
      </div>

      <!-- Pagination titik, hanya mobile -->
      <div class="mt-5 flex justify-center gap-2 desk:hidden" role="tablist" aria-label="Pilih menu">
        <button
          v-for="(menu, i) in favoriteMenus"
          :key="menu.name"
          type="button"
          role="tab"
          :aria-selected="active === i"
          :aria-label="`Menu ${i + 1}: ${menu.name}`"
          class="h-2 rounded-full transition-[width,background-color] duration-300"
          :class="active === i ? 'w-6 bg-brand' : 'w-2 bg-brand/25'"
          @click="goTo(i)"
        ></button>
      </div>

      <div data-reveal class="mt-6 flex justify-center desk:mt-14">
        <RouterLink
          to="/menu"
          class="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-[15px] font-bold text-white desk:px-7 desk:py-4 desk:text-base transition-[translate,background-color] hover:-translate-y-1 hover:bg-ink"
        >
          Lihat menu lengkap
        </RouterLink>
      </div>
    </BaseContainer>
  </section>
</template>