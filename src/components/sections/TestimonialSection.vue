<script setup lang="ts">
import { ref } from 'vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import { branchShots, reviewShots, type ReviewShot } from '@/data/testimonials'

// kemiringan bergantian supaya terlihat seperti ditempel manual
const tilts = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1']

// dua kelompok: rating cabang di atas, ulasan pelanggan di bawahnya
const groups = [
  {
    key: 'cabang',
    shots: branchShots,
    itemClass: 'w-full desk:w-[calc((100%-2.5rem)/3)]',
  },
  {
    key: 'ulasan',
    shots: reviewShots,
    itemClass: 'w-[calc((100%-0.75rem)/2)] desk:w-[calc((100%-2.5rem)/3)]',
  },
]

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

      <div class="mt-12 flex flex-col gap-10 desk:mt-16 desk:gap-14">
        <ul
          v-for="group in groups"
          :key="group.key"
          class="flex flex-wrap justify-center gap-3 desk:gap-5"
        >
          <li
            v-for="(shot, i) in group.shots"
            :key="shot.id"
            data-reveal
            class="flex"
            :class="group.itemClass"
          >
            <button
              type="button"
              aria-haspopup="dialog"
              class="relative flex w-full flex-col rounded-[10px] bg-white p-2 pb-3 text-left shadow-[0_6px_18px_rgba(40,89,68,0.14)] transition duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.03] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285944] motion-reduce:transition-none"
              :class="tilts[i % tilts.length]"
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