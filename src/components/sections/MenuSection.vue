<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import MenuFavoriteCard from '@/components/ui/MenuFavoriteCard.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import { favoriteMenus } from '@/data/menu'
</script>

<template>
  <section
    id="menu"
    class="rounded-[36px] bg-white py-[84px] shadow-[0_-1px_0_var(--color-line)] desk:rounded-[56px] desk:py-28"
  >
    <BaseContainer>
      <div data-reveal class="mb-12 flex flex-wrap items-end justify-between gap-5">
        <div>
          <SectionKicker>Menu andalan</SectionKicker>
          <h2>Yang bikin <em>balik lagi</em></h2>
        </div>
      </div>

      <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[22px]">
        <MenuFavoriteCard
          v-for="(menu, index) in favoriteMenus"
          :key="menu.name"
          data-reveal
          :menu="menu"
          :featured="index === 1"
        />
      </div>

      <div data-reveal class="mt-14 flex justify-center">
        <RouterLink
          to="/menu"
          class="inline-flex items-center rounded-full bg-brand px-7 py-4 font-bold text-white transition-[translate,background-color] hover:-translate-y-1 hover:bg-ink"
        >
          Lihat menu lengkap
        </RouterLink>
      </div>
    </BaseContainer>
  </section>
</template>