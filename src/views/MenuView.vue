<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import { menuCategories } from '@/data/menu'
import type { MenuCategoryId } from '@/types'
import menuMinuman from '@/assets/minuman.png'
import menuMakanan from '@/assets/makanan.png'
import menuCamilan from '@/assets/cemilan.png'

const activeCategory = ref<MenuCategoryId>('minuman')

const photos: Record<MenuCategoryId, { src: string; alt: string }> = {
  minuman: { src: menuMinuman, alt: 'Daftar menu minuman FOMO' },
  makanan: { src: menuMakanan, alt: 'Daftar menu makanan FOMO' },
  camilan: { src: menuCamilan, alt: 'Daftar menu camilan FOMO' },
}

const activePhoto = computed(() => photos[activeCategory.value])
</script>

<template>
  <main class="pt-[clamp(104px,12vw,140px)] pb-16 desk:pb-28">
    <BaseContainer>
      <header class="mb-6 desk:mb-8">
        <SectionKicker>Menu lengkap</SectionKicker>
        <h1
          class="font-display text-[clamp(38px,6vw,72px)] leading-[1.05] font-extrabold tracking-[-.03em] text-ink"
        >
          Semua menu
          <em class="font-serif font-normal italic text-brand">FOMO</em>
        </h1>
      </header>

      <!-- Kategori: mobile 3 kolom sama lebar (selalu 1 baris), desktop seperti semula -->
      <div
        role="tablist"
        aria-label="Kategori menu"
        class="mb-7 grid grid-flow-col auto-cols-fr gap-2 desk:mb-10 desk:flex desk:flex-wrap desk:gap-2.5"
      >
        <button
          v-for="category in menuCategories"
          :id="`tab-${category.id}`"
          :key="category.id"
          type="button"
          role="tab"
          :aria-selected="activeCategory === category.id"
          :aria-controls="`panel-${category.id}`"
          class="rounded-full border-2 px-2 py-2.5 text-center font-display text-sm font-extrabold transition-[background-color,color,translate] hover:-translate-y-0.5 desk:px-5 desk:py-2 desk:text-[15px]"
          :class="
            activeCategory === category.id
              ? 'border-brand bg-brand text-white'
              : 'border-line bg-white text-ink hover:bg-soft'
          "
          @click="activeCategory = category.id"
        >
          {{ category.label }}
        </button>
      </div>

      <div class="grid items-start gap-8 desk:grid-cols-[.8fr_1.2fr] desk:gap-16">
        <!-- Foto menu: di atas daftar harga (mobile), di kiri (desktop) -->
        <a
          :href="activePhoto.src"
          target="_blank"
          rel="noopener"
          class="mx-auto block w-full max-w-[460px] desk:sticky desk:top-28"
          :aria-label="`Buka ${activePhoto.alt} ukuran penuh`"
        >
          <img
            :key="activePhoto.src"
            :src="activePhoto.src"
            :alt="activePhoto.alt"
            loading="lazy"
            class="h-auto w-full rounded-[24px] border-2 border-line shadow-[0_12px_40px_-12px_rgba(0,0,0,.25)] transition-transform hover:-translate-y-1 desk:rounded-[28px]"
          />
        </a>

        <div>
          <div
            v-for="category in menuCategories"
            v-show="activeCategory === category.id"
            :id="`panel-${category.id}`"
            :key="category.id"
            role="tabpanel"
            :aria-labelledby="`tab-${category.id}`"
            class="space-y-6 desk:space-y-8"
          >
            <section
              v-for="group in category.groups"
              :key="group.title"
              :class="
                group.highlight
                  ? 'rounded-[22px] border-2 border-line bg-soft px-4 py-4 desk:rounded-[28px] desk:px-6 desk:py-5'
                  : ''
              "
            >
              <div class="mb-1 flex items-center gap-3 desk:mb-2">
                <h2 class="font-display text-lg font-extrabold text-ink desk:text-xl">
                  {{ group.title }}
                </h2>
                <span
                  v-if="group.note"
                  class="shrink-0 rounded-full bg-lime px-2.5 py-0.5 text-xs font-bold text-deep"
                >
                  {{ group.note }}
                </span>
                <i class="h-0.5 flex-1 rounded-full bg-line"></i>
              </div>

              <ul>
                <li
                  v-for="item in group.items"
                  :key="item.name"
                  class="flex items-baseline gap-2.5 border-b border-line py-2.5 last:border-b-0 desk:gap-3 desk:py-3"
                >
                  <span class="min-w-0 text-base font-semibold text-ink desk:text-[17px]">
                    {{ item.name }}
                    <small v-if="item.description" class="block text-[13px] font-normal text-copy desk:text-sm">
                      {{ item.description }}
                    </small>
                  </span>
                  <i class="-translate-y-[4px] flex-1 border-b-[3px] border-dotted border-lime"></i>
                  <b class="shrink-0 text-[15px] whitespace-nowrap text-brand desk:text-base">
                    {{ item.price }}
                  </b>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </BaseContainer>
  </main>
</template>