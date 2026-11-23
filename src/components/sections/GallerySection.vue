<script setup lang="ts">
// src/components/sections/EventSection.vue
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { events } from '../../data/events'

// Kemiringan tiap kartu (diulang kalau event lebih dari 3)
const tilts = ['-rotate-2', 'rotate-[1.5deg]', '-rotate-1']

// ---- Carousel ----
const track = ref<HTMLElement | null>(null)
const dragging = ref(false)
const pageCount = ref(1)
const activePage = ref(0)

// Jarak geser satu kartu (lebar kartu + jarak antar kartu)
function getStep() {
  const el = track.value
  const first = el?.firstElementChild as HTMLElement | null
  if (!el || !first) return 0
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0
  return first.offsetWidth + gap
}

function updateState() {
  const el = track.value
  if (!el) return
  const step = getStep()
  if (!step) return
  const max = el.scrollWidth - el.clientWidth
  pageCount.value = Math.max(1, Math.round(max / step) + 1)
  const atEnd = el.scrollLeft >= max - 4
  activePage.value = atEnd
    ? pageCount.value - 1
    : Math.min(pageCount.value - 1, Math.round(el.scrollLeft / step))
}

function goTo(i: number) {
  const el = track.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  el.scrollTo({ left: Math.min(i * getStep(), max), behavior: 'smooth' })
}

// Drag pakai mouse (di layar sentuh sudah otomatis bisa di-swipe)
let startX = 0
let startLeft = 0

function onMouseDown(e: MouseEvent) {
  const el = track.value
  if (!el) return
  dragging.value = true
  startX = e.pageX
  startLeft = el.scrollLeft
}
function onMouseMove(e: MouseEvent) {
  const el = track.value
  if (!dragging.value || !el) return
  el.scrollLeft = startLeft - (e.pageX - startX)
}
function endDrag() {
  dragging.value = false
  updateState()
}

onMounted(() => {
  updateState()
  window.addEventListener('resize', updateState)
})
onBeforeUnmount(() => window.removeEventListener('resize', updateState))
</script>

<template>
  <!-- Pemisah: sudut section dibuat membulat (tanpa gelombang) -->
  <section
    id="event"
    class="w-full rounded-[36px] bg-[#e2f6df] px-[5%] py-24 desk:rounded-[56px] desk:py-28"
  >
    <!-- Kepala section -->
    <div class="flex flex-col items-center">
      <div
        data-reveal
        class="text-sm font-extrabold uppercase tracking-[0.2em] text-brand"
      >
        Event FOMO
      </div>

      <h2 data-reveal class="mt-5 text-center">
        Seru-seruan di FOMO,<br />selalu ada yang <em class="text-brand">kalcer.</em>
      </h2>

      <p data-reveal class="mt-5 max-w-[580px] text-center text-lg">
        Dari badut sulap, fotografer kalcer, sampai gowes bareng. Ini momen-momen yang pernah
        bikin FOMO rame.
      </p>
    </div>

    <!-- Carousel poster -->
    <div data-reveal class="mx-auto mt-12 w-full max-w-[1280px]">
      <div
        ref="track"
        class="flex gap-8 overflow-x-auto px-4 py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-px-4"
        :class="
          dragging
            ? 'cursor-grabbing select-none snap-none'
            : 'cursor-grab snap-x snap-mandatory scroll-smooth'
        "
        @scroll.passive="updateState"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="endDrag"
        @mouseleave="endDrag"
      >
        <div
          v-for="(e, i) in events"
          :key="e.id"
          class="shrink-0 snap-start basis-[85%] desk:basis-[calc((100%-4rem)/3)]"
        >
          <article
            class="h-full rounded-[34px] border-2 border-line bg-white px-3.5 pb-7 pt-3.5 transition-transform duration-300 hover:-translate-y-2 hover:rotate-0 motion-reduce:transition-none"
            :class="tilts[i % tilts.length]"
          >
            <!-- Poster -->
            <img
              v-if="e.poster"
              :src="e.poster"
              :alt="`Poster event ${e.title}`"
              class="aspect-[4/5] w-full rounded-3xl object-cover"
              loading="lazy"
              draggable="false"
            />
            <div v-else class="ph aspect-[4/5] rounded-3xl">
              <div>
                <div>{{ e.id }}.png</div>
                <div class="mt-1.5 opacity-70">poster event</div>
              </div>
            </div>

            <!-- Info -->
            <div class="px-3 pt-5">
              <div
                class="inline-flex items-center gap-2 rounded-full bg-lime px-3.5 py-1.5 text-[13px] font-extrabold text-deep"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="16" rx="3" />
                  <path d="M8 3v4M16 3v4M3 10h18" />
                </svg>
                {{ e.date }}
              </div>

              <div class="mt-4 text-sm font-bold text-brand">{{ e.kicker }}</div>
              <h3 class="mt-1.5 text-[28px] leading-[1.05]">{{ e.title }}</h3>
              <p class="mt-2.5 text-base leading-normal">{{ e.description }}</p>

              <div class="mt-4 flex items-start gap-2 text-[15px] font-bold text-ink">
                <svg
                  class="mt-0.5 shrink-0"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span>{{ e.place }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Pagination titik -->
      <div v-if="pageCount > 1" class="mt-4 flex items-center justify-center gap-2.5">
        <button
          v-for="n in pageCount"
          :key="n"
          type="button"
          :aria-label="`Ke halaman ${n}`"
          :aria-current="activePage === n - 1"
          class="h-2.5 rounded-full transition-all duration-300"
          :class="activePage === n - 1 ? 'w-7 bg-brand' : 'w-2.5 bg-brand/30 hover:bg-brand/50'"
          @click="goTo(n - 1)"
        />
      </div>
    </div>

    <!-- Ajakan bikin event -->
    <div
      data-reveal
      class="mx-auto mt-20 flex w-full max-w-[1120px] flex-wrap items-center justify-between gap-x-8 gap-y-5 rounded-[48px] bg-deep py-7 pl-8 pr-8 desk:pl-12 desk:pr-9"
    >
      <div>
        <div
          class="font-display text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-mint"
        >
          Punya ide event? <em class="text-lime">Ajak FOMO.</em>
        </div>
        <div class="mt-2 text-base text-[#d8f5c9]">
          Ceritakan idemu, kita bikin jadi kalcer bareng.
        </div>
      </div>
      <a
        href="#kunjungi"
        class="rounded-full bg-lime px-[34px] py-4 text-base font-extrabold text-deep no-underline transition hover:brightness-95"
      >
        Hubungi kami
      </a>
    </div>
  </section>
</template>