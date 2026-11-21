<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import { galleryPhotos, site } from '@/data/site'

// kemiringan kecil bergantian supaya terasa "ditempel", tapi tetap rapi
const tilts = ['-rotate-1', 'rotate-1', 'rotate-[0.5deg]', '-rotate-[0.5deg]']

// stiker bubble, menempel di sudut jendela tertentu (index mulai dari 0)
const stickers: Record<number, { text: string; class: string }> = {
  1: {
    text: "this week's recap",
    class: '-right-3 -top-4 -rotate-3 bg-[#285944] text-white rounded-bl-[4px]',
  },
  4: {
    text: 'love the vibes!',
    class: '-bottom-4 -left-3 rotate-2 border-2 border-[#285944] bg-white text-[#285944] rounded-br-[4px]',
  },
  8: {
    text: 'open 24 hours',
    class: '-bottom-4 -right-3 -rotate-2 bg-[#9fd9a8] text-[#1d4433] rounded-bl-[4px]',
  },
}

// di HP (2 kolom) foto terakhir sendirian: taruh di tengah
const isLonely = (index: number) =>
  galleryPhotos.length % 2 === 1 && index === galleryPhotos.length - 1
</script>

<template>
  <section id="kalcer" class="py-[84px] desk:py-28">
    <BaseContainer>
      <div data-reveal class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionKicker>FOMO kalcer</SectionKicker>
          <h2 class="mb-3">Isi <em>keseharian</em> kami</h2>
        </div>
        <BaseButton :href="site.instagramUrl">Ikuti {{ site.instagramHandle }}</BaseButton>
      </div>

      <div
        data-reveal
        class="mt-10 grid grid-cols-2 gap-x-3 gap-y-6 desk:mt-14 desk:grid-cols-3 desk:gap-x-6 desk:gap-y-10"
      >
        <figure
          v-for="(photo, index) in galleryPhotos"
          :key="photo.src"
          class="relative m-0 flex flex-col rounded-[14px] bg-white shadow-[0_10px_28px_rgba(40,89,68,0.18)] transition duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.02] motion-reduce:transition-none"
          :class="[
            tilts[index % tilts.length],
            isLonely(index) &&
              'col-span-2 mx-auto w-[calc(50%-0.375rem)] desk:col-span-1 desk:mx-0 desk:w-auto',
          ]"
        >
          <!-- bilah judul jendela -->
          <div class="flex h-7 shrink-0 items-center gap-1.5 px-3" aria-hidden="true">
            <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span class="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span class="ml-2 truncate text-[11px] font-semibold text-[#3f6b57]">
              kalcer_{{ String(index + 1).padStart(2, '0') }}.jpg
            </span>
          </div>

          <!-- area foto 4:5 (portrait). Ganti aspect-[4/5] kalau fotomu beda rasio -->
          <div class="relative m-2 mt-0 aspect-[4/5] overflow-hidden rounded-lg">
            <img
              :src="photo.src"
              :alt="photo.alt"
              loading="lazy"
              decoding="async"
              class="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <!-- stiker, hanya di desktop -->
          <span
            v-if="stickers[index]"
            aria-hidden="true"
            class="pointer-events-none absolute z-[3] hidden whitespace-nowrap rounded-[18px] px-4 py-2 text-[15px] font-semibold desk:block"
            :class="stickers[index].class"
          >
            {{ stickers[index].text }}
          </span>
        </figure>
      </div>
    </BaseContainer>
  </section>
</template>