<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import logoUrl from '@/assets/fomo.png'
import heroBgUrl from '@/assets/hero2.png' // foto tempat / cafe (hanya tampil di mobile)
import hero1Url from '@/assets/hero1.png'
import hero2Url from '@/assets/hero2.png'
import { site } from '@/data/site'

</script>

<template>
  <!-- Mobile: background foto tempat, tanpa pill. Desktop: kolase foto besar. -->
  <section
    class="dark relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-ink pt-[104px] pb-44 text-white desk:h-svh desk:justify-center desk:bg-brand desk:pt-[100px] desk:pb-[10svh]"
  >
    <!-- MOBILE ONLY: foto background + overlay -->
    <img
      :src="heroBgUrl"
      alt="Suasana FOMO Cafe"
      class="absolute inset-0 -z-20 size-full object-cover object-[center_30%] desk:hidden"
      fetchpriority="high"
    />
    <div
      class="absolute inset-0 -z-10 bg-linear-to-b from-[rgba(27,58,44,.15)] via-[rgba(27,58,44,.62)] to-[rgba(15,34,26,.96)] desk:hidden"
      aria-hidden="true"
    ></div>

    <!-- DESKTOP ONLY: lingkaran gelap di belakang kolase -->
    <div
      class="absolute top-1/2 -right-[200px] hidden size-[820px] -translate-y-1/2 rounded-full bg-ink desk:block"
      aria-hidden="true"
    ></div>

    <BaseContainer class="relative grid w-full items-center gap-6 desk:grid-cols-[1.05fr_.95fr] desk:gap-12">
      <div>
        <!-- DESKTOP ONLY: tulisan di atas judul -->
        <p
          class="mb-5 hidden rounded-full border-2 border-line px-4 py-1.5 text-sm font-bold text-line desk:inline-block"
        >
          {{ site.community }}
        </p>

        <h1
          class="text-[clamp(68px,20vw,120px)] leading-[.88] tracking-[-.05em] text-white desk:text-[clamp(56px,min(10vw,15svh),168px)] desk:leading-[.86]"
        >
          <span class="block">Feed</span>
          <span class="block">the</span>
          <em class="text-[1.02em] text-lime italic">panic.</em>
        </h1>

        <p class="mt-5 mb-6 max-w-[440px] text-[19px] leading-relaxed text-soft desk:mt-[3svh] desk:mb-[3.5svh] desk:max-w-[480px] desk:text-[clamp(18px,2.8svh,22px)] desk:leading-normal">
          {{ site.description }}
        </p>

        <div class="grid grid-cols-2 gap-3 desk:flex desk:flex-wrap">
          <BaseButton
            href="#menu"
            variant="lime"
            class="w-full justify-center text-center whitespace-nowrap max-desk:px-3! max-desk:py-3.5! max-desk:text-base! desk:w-auto"
          >
            Lihat menu
          </BaseButton>
          <BaseButton
            href="#kunjungi"
            variant="ghost"
            class="w-full justify-center text-center whitespace-nowrap max-desk:px-3! max-desk:py-3.5! max-desk:text-base! desk:w-auto"
          >
            Cari kami
          </BaseButton>
        </div>
      </div>

      <!-- DESKTOP ONLY: kolase foto besar, logo jadi stiker di antara dua foto -->
      <div class="relative hidden desk:block desk:h-[min(560px,64svh)]">
        <img
          :src="hero1Url"
          alt="Suasana FOMO Cafe"
          class="absolute top-0 right-[2%] h-[78%] w-[52%] rotate-3 rounded-[28px] border-4 border-mint object-cover shadow-[0_24px_60px_rgba(10,30,20,.45)]"
        />
        <img
          :src="hero2Url"
          alt="Produk andalan FOMO Cafe"
          class="absolute bottom-0 left-[4%] h-[52%] w-[50%] -rotate-4 rounded-[28px] border-4 border-mint object-cover shadow-[0_24px_60px_rgba(10,30,20,.45)]"
        />

        <img
          :src="logoUrl"
          alt="Logo FOMO"
          class="absolute top-[14%] left-[20%] z-[2] size-[min(190px,25svh)] animate-orbit rounded-full shadow-[0_20px_50px_rgba(10,30,20,.45)] motion-reduce:animate-none"
        />
      </div>
    </BaseContainer>
  </section>
</template>