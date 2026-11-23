<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import { menuCategories } from '@/data/menu'
import type { MenuCategoryId } from '@/types'

interface MenuPhoto {
  src: string
  label: string
}

const activeCategory = ref<MenuCategoryId>('minuman')

// Foto dibaca otomatis dari src/assets/menu/<kategori>/
const modules = import.meta.glob<string>('/src/assets/menu/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const photosByCategory: Partial<Record<MenuCategoryId, MenuPhoto[]>> = {}
for (const [path, src] of Object.entries(modules)) {
  const parts = path.split('/')
  const folder = parts[parts.length - 2] as MenuCategoryId | undefined
  const file = parts[parts.length - 1] ?? ''
  if (!folder) continue
  const label = file.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')
  const list = photosByCategory[folder] ?? []
  list.push({ src, label })
  photosByCategory[folder] = list
}

const photos = computed<MenuPhoto[]>(() => photosByCategory[activeCategory.value] ?? [])

// Carousel geser otomatis (gap-4 = 16px)
const GAP = 16
const INTERVAL_MS = 3500
const scroller = ref<HTMLElement | null>(null)
const active = ref(0)
const paused = ref(false)
let timer: number | undefined
let reduceMotion = false

function step(el: HTMLElement): number {
  const first = el.children[0] as HTMLElement | undefined
  return first ? first.offsetWidth + GAP : 0
}
function atEnd(el: HTMLElement): boolean {
  return el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
}
function onScroll(): void {
  const el = scroller.value
  if (!el) return
  const s = step(el)
  if (!s) return
  active.value = atEnd(el) ? photos.value.length - 1 : Math.round(el.scrollLeft / s)
}
function goTo(i: number): void {
  const el = scroller.value
  if (!el) return
  el.scrollTo({ left: i * step(el), behavior: reduceMotion ? 'auto' : 'smooth' })
}
function next(): void {
  const el = scroller.value
  if (!el || paused.value || photos.value.length < 2) return
  goTo(atEnd(el) ? 0 : active.value + 1)
}

// Ganti kategori: kembali ke foto pertama (carousel dibuat ulang lewat :key)
watch(activeCategory, () => {
  active.value = 0
})

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduceMotion) timer = window.setInterval(next, INTERVAL_MS)
})
onBeforeUnmount(() => window.clearInterval(timer))
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

      <!-- Susunan atas-bawah di semua ukuran layar: carousel di atas, daftar harga di bawah -->
      <div class="grid items-start gap-8 desk:gap-12">
        <!-- Baru & favorit: foto geser otomatis, berganti sesuai kategori -->
        <section
          v-if="photos.length"
          aria-label="Baru dan favorit"
          class="mx-auto w-full max-w-[460px] desk:max-w-none"
          @mouseenter="paused = true"
          @mouseleave="paused = false"
          @focusin="paused = true"
          @focusout="paused = false"
        >
          <h2 class="mb-3 font-display text-lg font-extrabold text-ink desk:text-xl">
            Baru &amp; favorit
          </h2>

          <div
            ref="scroller"
            :key="activeCategory"
            class="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            @scroll.passive="onScroll"
            @touchstart.passive="paused = true"
            @touchend.passive="paused = false"
          >
            <a
              v-for="photo in photos"
              :key="photo.src"
              :href="photo.src"
              target="_blank"
              rel="noopener"
              :aria-label="`Buka foto ${photo.label} ukuran penuh`"
              class="block w-[calc((100%-16px)/2)] shrink-0 snap-start desk:w-[calc((100%-48px)/4)]"
            >
              <img
                :src="photo.src"
                :alt="`Foto menu ${photo.label}`"
                loading="lazy"
                class="aspect-[4/5] w-full rounded-[20px] border-2 border-line object-cover shadow-[0_12px_40px_-12px_rgba(0,0,0,.25)] desk:rounded-[28px]"
              />
            </a>
          </div>

          <!-- Titik pagination -->
          <div v-if="photos.length > 1" class="mt-3 flex flex-wrap justify-center">
            <button
              v-for="(photo, i) in photos"
              :key="photo.src"
              type="button"
              :aria-label="`Foto ${i + 1}: ${photo.label}`"
              :aria-current="active === i"
              class="grid h-6 place-items-center px-1"
              @click="goTo(i)"
            >
              <span
                class="block h-2 rounded-full transition-[width,background-color] duration-300"
                :class="active === i ? 'w-6 bg-brand' : 'w-2 bg-brand/25'"
              ></span>
            </button>
          </div>
        </section>

        <!-- Daftar harga -->
        <div class="mx-auto w-full desk:max-w-3xl">
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