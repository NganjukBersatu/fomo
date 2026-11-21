<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import MenuFavoriteCard from '@/components/ui/MenuFavoriteCard.vue'
import MenuTabs from '@/components/ui/MenuTabs.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import { favoriteMenus, menuCategories } from '@/data/menu'
import { site } from '@/data/site'
import type { MenuCategoryId } from '@/types'

const activeCategory = ref<MenuCategoryId>('minuman')
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

      <div data-reveal class="mt-24 grid gap-14 desk:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionKicker>Menu lengkap</SectionKicker>
          <h2 class="mb-8 text-[clamp(34px,4.6vw,56px)]">Pilih <em>kategori</em></h2>
          <MenuTabs v-model="activeCategory" :categories="menuCategories" />
        </div>

        <div>
          <ul
            v-for="category in menuCategories"
            v-show="activeCategory === category.id"
            :id="`panel-${category.id}`"
            :key="category.id"
            role="tabpanel"
            :aria-labelledby="`tab-${category.id}`"
          >
            <li
              v-for="item in category.items"
              :key="item.name"
              class="flex items-baseline gap-3 border-b-2 border-line py-5"
            >
              <span class="font-display text-2xl font-extrabold text-ink">
                {{ item.name }}
                <small class="block font-sans text-[15px] font-normal text-copy">
                  {{ item.description }}
                </small>
              </span>
              <i class="-translate-y-[5px] flex-1 border-b-[3px] border-dotted border-lime"></i>
              <b class="text-lg text-brand">{{ item.price }}</b>
            </li>
          </ul>

          <BaseButton class="mt-7" :href="site.instagramUrl">
            Lihat menu terbaru di Instagram
          </BaseButton>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>
