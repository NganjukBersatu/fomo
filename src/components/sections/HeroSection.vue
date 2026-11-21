<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder.vue'
import logoUrl from '@/assets/logo.png'
import { site } from '@/data/site'
</script>

<template>
  <!-- Desktop: tinggi pas 1 layar (svh). Mobile: minimal 1 layar, boleh lebih kalau konten panjang. -->
  <section
    class="dark relative flex min-h-svh items-center overflow-hidden bg-brand pt-[104px] pb-10 text-white desk:h-svh desk:min-h-[640px]"
  >
    <div
      class="absolute -top-[240px] -right-[220px] size-[760px] rounded-full bg-ink"
      aria-hidden="true"
    ></div>

    <BaseContainer class="relative grid w-full items-center gap-6 desk:grid-cols-[1.15fr_.85fr] desk:gap-10">
      <div>
        <p
          class="mb-5 inline-block rounded-full border-2 border-line px-4 py-1.5 text-sm font-bold text-line"
        >
          {{ site.community }}
        </p>
        <h1
          class="text-[clamp(56px,min(12vw,16svh),176px)] leading-[.86] tracking-[-.05em] text-white"
        >
          <span class="block">Feed</span>
          <span class="block">the</span>
          <em class="text-[1.02em] text-lime italic">panic.</em>
        </h1>
        <p class="mt-6 mb-7 max-w-[440px] text-[clamp(17px,2.6svh,21px)] text-soft">
          {{ site.description }}
        </p>
        <div class="flex flex-wrap gap-3">
          <BaseButton href="#menu" variant="lime">Lihat menu</BaseButton>
          <BaseButton href="#kunjungi" variant="ghost">Cari kami</BaseButton>
        </div>
      </div>

      <div class="relative h-[320px] desk:h-[min(540px,64svh)]">
        <div
          class="absolute top-[40px] left-0 z-[2] grid size-[190px] place-items-center rounded-full bg-mint shadow-[0_20px_50px_rgba(27,58,44,.35)] desk:top-[16%] desk:size-[min(290px,38svh)]"
        >
          <svg
            class="absolute inset-0 size-full animate-orbit motion-reduce:animate-none"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <defs>
              <path id="badge-circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
            </defs>
            <text class="fill-brand text-[13px] font-extrabold tracking-[2px]">
              <textPath href="#badge-circle" textLength="500" lengthAdjust="spacing">
                {{ site.badgeText }}
              </textPath>
            </text>
          </svg>
          <img :src="logoUrl" width="150" height="150" alt="" class="w-[56%] rounded-full" />
        </div>

        <ImagePlaceholder
          class="absolute top-0 right-0 h-[190px] w-[140px] rotate-5 desk:h-[min(290px,40svh)] desk:w-[min(220px,30svh)]"
        >
          [FOTO SUASANA CAFE]
        </ImagePlaceholder>
        <ImagePlaceholder
          class="absolute right-5 bottom-0 h-[160px] w-[130px] -rotate-6 desk:right-[60px] desk:h-[min(250px,34svh)] desk:w-[min(210px,28svh)]"
        >
          [FOTO PRODUK ANDALAN]
        </ImagePlaceholder>
      </div>
    </BaseContainer>
  </section>
</template>