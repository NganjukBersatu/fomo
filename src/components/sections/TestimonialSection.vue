<script setup lang="ts">
import { ref } from 'vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import { branchShots, reviewShots, type ReviewShot } from '@/data/testimonials'

// rating & count opsional: isi di data/testimonials.ts kalau mau tampil di kartu ringkas mobile
type BranchShot = ReviewShot & { rating?: string; count?: string }
const branches = branchShots as BranchShot[]

// rating cabang untuk kartu ringkas mobile (kunci = label di data/testimonials.ts)
// field rating/count di data, kalau ada, lebih diutamakan
const branchInfo: Record<string, { rating: string; count: string }> = {
  'FOMO Pusat': { rating: '4,5', count: '101 ulasan' },
  'FOMO A. Yani': { rating: '4,7', count: '30 ulasan' },
  'FOMO Ngronggot': { rating: '4,8', count: '24 ulasan' },
  // 'FOMO Ngeronggot': { rating: '0,0', count: '0 ulasan' }, // isi lalu aktifkan
}

function info(shot: BranchShot) {
  const extra = branchInfo[shot.label ?? '']
  return {
    rating: shot.rating ?? extra?.rating,
    count: shot.count ?? extra?.count,
  }
}

// kemiringan bergantian supaya terlihat seperti ditempel manual
const tilts = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1']

// kartu polaroid (dipakai desktop & carousel ulasan mobile)
const cardBtn =
  'relative flex w-full flex-col rounded-[10px] bg-white p-2 pb-3 text-left shadow-[0_6px_18px_rgba(40,89,68,0.14)] transition duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.03] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285944] motion-reduce:transition-none'

// kartu ringkas rating cabang (mobile)
const chipBtn =
  'relative flex w-full flex-col gap-1 rounded-[10px] bg-white px-2 pb-2.5 pt-3 text-left shadow-[0_6px_18px_rgba(40,89,68,0.14)] transition duration-300 active:scale-[0.98] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285944] motion-reduce:transition-none'

// desktop: dua kelompok, rating cabang di atas, ulasan pelanggan di bawahnya
const groups = [
  { key: 'cabang', shots: branchShots },
  { key: 'ulasan', shots: reviewShots },
]

// mobile: posisi geser carousel ulasan
const scroller = ref<HTMLUListElement | null>(null)
const current = ref(0)

function onScroll() {
  const el = scroller.value
  const first = el?.children[0] as HTMLElement | undefined
  if (!el || !first) return
  const step = first.offsetWidth + 32 // lebar kartu + gap-8
  const idx = Math.round(el.scrollLeft / step)
  current.value = Math.min(reviewShots.length - 1, Math.max(0, idx))
}

const dialog = ref<HTMLDialogElement | null>(null)
const active = ref<ReviewShot | null>(null)

function open(shot: ReviewShot) {
  active.value = shot
  dialog.value?.showModal()
}

function close() {
  dialog.value?.close()
}
</script>

<template>
  <section
    id="teman"
    class="-mt-14 rounded-[36px] bg-soft pt-[84px] pb-[84px] desk:rounded-[56px] desk:pt-[168px] desk:pb-28"
  >
    <BaseContainer>
      <div data-reveal class="text-center">
        <SectionKicker>Kata teman FOMO</SectionKicker>
        <h2>Kata mereka <em>tentang kami</em></h2>
        <p
          class="mt-4 inline-block -rotate-2 rounded-2xl rounded-bl-sm bg-[#285944] px-4 py-2 text-sm font-semibold text-white"
        >
          ulasan asli, tanpa filter
        </p>
      </div>

      <!-- MOBILE: rating cabang, tiga kartu ringkas sebaris -->
      <div data-reveal class="mt-10 desk:hidden">
        <h3
          class="text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#285944]"
        >
          Rating cabang
        </h3>
        <ul class="mt-5 flex gap-2">
          <li
            v-for="(shot, i) in branches"
            :key="shot.id"
            class="flex min-w-0 flex-1"
          >
            <button
              type="button"
              aria-haspopup="dialog"
              :aria-label="`Lihat ulasan ${shot.label ?? shot.alt}${info(shot).rating ? ', rating ' + info(shot).rating : ''}`"
              :class="[chipBtn, tilts[i % tilts.length]]"
              @click="open(shot)"
            >
              <span
                aria-hidden="true"
                class="absolute -top-[7px] left-1/2 h-4 w-11 -translate-x-1/2 -rotate-3 rounded-[3px] bg-[#9fd9a8]/70"
              />
              <span class="text-xs font-bold text-[#1f3a2e]">
                {{ shot.label ?? shot.alt }}
              </span>
              <span
                v-if="info(shot).rating"
                class="text-2xl font-extrabold leading-tight text-[#1f3a2e]"
              >
                {{ info(shot).rating }}
              </span>
              <span
                aria-hidden="true"
                class="text-[13px] leading-none tracking-tight text-[#f4b400]"
              >
                ★★★★★
              </span>
              <span class="mt-auto pt-0.5 text-[11px] text-[#4d5f56]">
                {{ info(shot).count ?? 'ketuk untuk lihat' }}
              </span>
            </button>
          </li>
        </ul>
      </div>

      <!-- DESKTOP: dinding polaroid (tidak berubah) -->
      <div class="mt-16 hidden flex-col gap-14 desk:flex">
        <ul
          v-for="group in groups"
          :key="group.key"
          class="flex flex-wrap justify-center gap-5"
        >
          <li
            v-for="(shot, i) in group.shots"
            :key="shot.id"
            data-reveal
            class="flex w-[calc((100%-2.5rem)/3)]"
          >
            <button
              type="button"
              aria-haspopup="dialog"
              :class="[cardBtn, tilts[i % tilts.length]]"
              @click="open(shot)"
            >
              <!-- selotip -->
              <span
                aria-hidden="true"
                class="absolute -top-2 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-3 rounded-[3px] bg-[#9fd9a8]/70"
              />
              <!-- area foto: ikut tinggi baris, foto di tengah -->
              <span class="grid flex-1 place-items-center">
                <img
                  :src="shot.image"
                  :alt="shot.alt"
                  loading="lazy"
                  decoding="async"
                  class="block h-auto w-full"
                />
              </span>
              <span
                v-if="shot.label"
                class="mt-2 block text-center text-sm font-semibold text-[#285944]"
              >
                {{ shot.label }}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </BaseContainer>

    <!-- MOBILE: kata pelanggan, carousel geser samping (di luar container supaya tembus sampai tepi layar) -->
    <div data-reveal class="mt-11 desk:hidden">
      <div class="flex items-baseline justify-between px-6">
        <h3
          class="text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#285944]"
        >
          Kata pelanggan
        </h3>
        <span class="text-[13px] font-bold text-[#285944]">
          {{ current + 1 }} / {{ reviewShots.length }}
        </span>
      </div>

      <ul
        ref="scroller"
        class="flex snap-x snap-mandatory scroll-pl-6 gap-8 overflow-x-auto px-6 pb-3 pt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        @scroll.passive="onScroll"
      >
        <li
          v-for="(shot, i) in reviewShots"
          :key="shot.id"
          class="flex w-full shrink-0 snap-start snap-always"
        >
          <button
            type="button"
            aria-haspopup="dialog"
            :class="[cardBtn, tilts[i % tilts.length]]"
            @click="open(shot)"
          >
            <span
              aria-hidden="true"
              class="absolute -top-2 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-3 rounded-[3px] bg-[#9fd9a8]/70"
            />
            <span class="grid flex-1 place-items-center">
              <img
                :src="shot.image"
                :alt="shot.alt"
                loading="lazy"
                decoding="async"
                class="block h-auto w-full"
              />
            </span>
            <span
              v-if="shot.label"
              class="mt-2 block text-center text-sm font-semibold text-[#285944]"
            >
              {{ shot.label }}
            </span>
          </button>
        </li>
      </ul>

      <!-- penanda titik -->
      <div aria-hidden="true" class="flex items-center justify-center gap-[5px]">
        <span
          v-for="(shot, n) in reviewShots"
          :key="shot.id"
          class="h-1.5 rounded-[3px] transition-all duration-300 motion-reduce:transition-none"
          :class="n === current ? 'w-[18px] bg-[#285944]' : 'w-1.5 bg-[#9fd9a8]'"
        />
      </div>

      <p
        aria-hidden="true"
        class="mt-7 flex items-center justify-center gap-2 text-[13px] font-bold text-[#285944] transition-opacity duration-300"
        :class="current === 0 ? 'opacity-100' : 'opacity-0'"
      >
        geser ke samping
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </p>
    </div>

    <!-- foto diperbesar -->
    <dialog
      ref="dialog"
      class="m-auto overflow-visible bg-transparent p-0 backdrop:bg-black/70"
      @click.self="close"
      @close="active = null"
    >
      <div v-if="active" class="relative">
        <img
          :src="active.image"
          :alt="active.alt"
          class="block max-h-[85vh] max-w-[92vw] rounded-2xl bg-white"
        />
        <button
          type="button"
          aria-label="Tutup"
          class="absolute -right-3 -top-3 grid h-9 w-9 place-items-center rounded-full bg-[#285944] text-lg text-white"
          @click="close"
        >
          ✕
        </button>
      </div>
    </dialog>
  </section>
</template>