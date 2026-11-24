<script setup lang="ts">
// src/components/sections/EventSection.vue
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import { events } from '@/data/events'

// Kemiringan kartu hanya di desktop (di HP lurus supaya tidak terpotong)
const tilts = ['desk:-rotate-2', 'desk:rotate-[1.5deg]', 'desk:-rotate-1']

// ---- Carousel ----
const track = ref<HTMLElement | null>(null)
const dragging = ref(false)
const pageCount = ref(1)
const activePage = ref(0)

// ---- Lihat selengkapnya ----
// Semua kartu dipotong setinggi kartu pertama (collapsedH)
const collapsedH = ref<number | null>(null)
const expanded = reactive<Record<string, boolean>>({}) // kartu yang sedang dibuka
const needsMore = reactive<Record<string, boolean>>({}) // kartu yang lebih tinggi dari kartu 1

function toggle(id: string) {
  expanded[id] = !expanded[id]
}

// Ukur tinggi alami semua kartu, lalu pakai tinggi kartu pertama sebagai patokan
// Ukur tinggi alami semua kartu, lalu pakai tinggi kartu pertama sebagai patokan
async function measure() {
  collapsedH.value = null // lepas dulu supaya terukur tinggi aslinya
  await nextTick()
  const el = track.value
  if (!el) return
  const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-card]'))
  const first = cards[0]
  if (!first) return
  const base = first.offsetHeight
  cards.forEach((c) => {
    needsMore[c.dataset.card as string] = c.offsetHeight > base + 1
  })
  collapsedH.value = base
}

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

function onResize() {
  updateState()
  measure()
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

onMounted(async () => {
  updateState()
  await measure()
  // ukur ulang setelah font selesai dimuat (tinggi teks bisa berubah)
  document.fonts?.ready.then(measure)
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => window.removeEventListener('resize', onResize))
</script>

<template>
  <section
    id="event"
    class="rounded-t-[36px] bg-[#e2f6df] pt-14 pb-36 shadow-[0_-1px_0_var(--color-line)] desk:rounded-t-[56px] desk:pt-28 desk:pb-44"
  >
    <BaseContainer>
      <!-- Kepala section -->
      <div data-reveal class="flex flex-col items-center text-center">
        <SectionKicker>Event FOMO</SectionKicker>
        <h2>Seru-seruan di FOMO,<br />selalu ada yang <em>kalcer.</em></h2>
        <p class="mt-4 max-w-[580px] text-base desk:mt-5 desk:text-lg">
          Dari badut sulap, fotografer kalcer, sampai gowes bareng. Ini momen-momen yang pernah
          bikin FOMO rame.
        </p>
      </div>

      <!-- Carousel poster -->
      <div data-reveal class="mt-6 w-full desk:mt-12">
        <div
          ref="track"
          class="flex items-start gap-4 overflow-x-auto px-[9%] py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden desk:gap-8 desk:px-4 desk:py-8 desk:scroll-px-4"
          :class="
            dragging
              ? 'cursor-grabbing select-none snap-none'
              : 'snap-x snap-mandatory scroll-smooth desk:cursor-grab'
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
            class="shrink-0 basis-[82%] snap-center snap-always desk:basis-[calc((100%-4rem)/3)] desk:snap-start"
          >
            <!-- Tinggi kartu dikunci = tinggi kartu pertama, kecuali kalau sedang dibuka -->
            <article
              :data-card="e.id"
              :style="collapsedH && !expanded[e.id] ? { height: collapsedH + 'px' } : undefined"
              class="relative overflow-hidden rounded-[28px] border-2 border-line bg-white px-3 pb-6 pt-3 transition-transform duration-300 desk:rounded-[34px] desk:px-3.5 desk:pb-7 desk:pt-3.5 desk:hover:-translate-y-2 desk:hover:rotate-0 motion-reduce:transition-none"
              :class="tilts[i % tilts.length]"
            >
              <!-- Poster -->
              <img
                v-if="e.poster"
                :src="e.poster"
                :alt="`Poster event ${e.title}`"
                class="aspect-[4/5] w-full rounded-[20px] object-cover desk:rounded-3xl"
                loading="lazy"
                draggable="false"
              />
              <div v-else class="ph aspect-[4/5] rounded-[20px] desk:rounded-3xl">
                <div>
                  <div>{{ e.id }}.png</div>
                  <div class="mt-1.5 opacity-70">poster event</div>
                </div>
              </div>

              <!-- Info -->
              <div class="px-2 pt-4 desk:px-3 desk:pt-5">
                <div
                  class="inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1.5 text-xs font-extrabold text-deep desk:px-3.5 desk:text-[13px]"
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

                <div class="mt-3 text-[13px] font-bold text-brand desk:mt-4 desk:text-sm">
                  {{ e.kicker }}
                </div>

                <h3 class="mt-1 text-2xl leading-[1.1] desk:mt-1.5 desk:text-[28px] desk:leading-[1.05]">
                  {{ e.title }}
                </h3>

                <p class="mt-2 text-[15px] leading-normal desk:mt-2.5 desk:text-base">
                  {{ e.description }}
                </p>

                <div class="mt-3 flex items-start gap-2 text-sm font-bold text-ink desk:mt-4 desk:text-[15px]">
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

                <!-- Tombol saat kartu SUDAH dibuka (ada di bawah isi) -->
                <div v-if="expanded[e.id]" class="mt-5 flex justify-center">
                  <button
                    type="button"
                    class="rounded-full border-2 border-ink bg-lime px-5 py-2 text-sm font-extrabold text-deep transition hover:brightness-95"
                    aria-expanded="true"
                    @click="toggle(e.id)"
                  >
                    Lihat lebih sedikit
                  </button>
                </div>
              </div>

              <!-- Pudar + tombol saat kartu TERPOTONG (menempel di dasar kartu) -->
              <div
                v-if="needsMore[e.id] && !expanded[e.id]"
                class="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white via-white/95 to-transparent px-3 pb-5 pt-16"
              >
                <button
                  type="button"
                  class="rounded-full border-2 border-ink bg-lime px-5 py-2 text-sm font-extrabold text-deep transition hover:brightness-95"
                  aria-expanded="false"
                  @click="toggle(e.id)"
                >
                  Lihat selengkapnya
                </button>
              </div>
            </article>
          </div>
        </div>

        <!-- Pagination titik -->
        <div v-if="pageCount > 1" class="mt-2 flex items-center justify-center gap-2.5 desk:mt-4">
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
        class="mx-auto mt-12 flex w-full max-w-[1120px] flex-col items-start gap-5 rounded-[32px] bg-deep px-6 py-7 desk:mt-20 desk:flex-row desk:flex-wrap desk:items-center desk:justify-between desk:gap-x-8 desk:rounded-[48px] desk:pl-12 desk:pr-9"
      >
        <div>
          <div
            class="font-display text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-mint"
          >
            Punya ide event? <em class="text-lime">Ajak FOMO.</em>
          </div>
          <div class="mt-2 text-[15px] text-[#d8f5c9] desk:text-base">
            Ceritakan idemu, kita bikin jadi kalcer bareng.
          </div>
        </div>
       <a
  href="https://www.instagram.com/fomo.pusat/"
  target="_blank"
  rel="noopener noreferrer"
  class="w-full rounded-full bg-lime px-8 py-3.5 text-center text-base font-extrabold text-deep no-underline transition hover:brightness-95 desk:w-auto desk:px-[34px] desk:py-4"
>
  Hubungi kami
</a>
      </div>
    </BaseContainer>
  </section>
</template>