<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import { site } from '@/data/site'
</script>

<template>
  <section id="kunjungi" class="pt-[84px] pb-[140px] desk:pt-28">
    <BaseContainer>
      <div
        data-reveal
        class="grid items-center gap-12 rounded-[48px] bg-lime px-7 py-9 text-deep desk:grid-cols-[1.1fr_.9fr] desk:p-16"
      >
        <div>
          <h2 class="text-[clamp(44px,7vw,92px)] text-deep">Mampir ke <em>FOMO.</em></h2>
          <div class="mt-[30px] flex flex-wrap gap-3">
            <BaseButton variant="deep" :href="site.mapsUrl">
              <MapPin class="size-5" aria-hidden="true" />
              Buka di Google Maps
            </BaseButton>
          </div>
        </div>

        <div class="grid gap-[22px]">
          <div>
            <b class="mb-0.5 block text-[13px] tracking-[.14em] uppercase">Alamat</b>
            <p class="font-semibold text-deep">{{ site.address }}</p>
          </div>
          <div>
            <b class="mb-0.5 block text-[13px] tracking-[.14em] uppercase">Jam buka</b>
            <p class="font-semibold text-deep">{{ site.openingHours }}</p>
          </div>
          <div>
            <b class="mb-0.5 block text-[13px] tracking-[.14em] uppercase">Hubungi</b>
            <p class="font-semibold text-deep">
              {{ site.whatsapp }} ·
              <a :href="site.instagramUrl">{{ site.instagramHandle }}</a>
            </p>
          </div>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>
