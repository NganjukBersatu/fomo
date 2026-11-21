<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import { galleryLabels, site } from '@/data/site'

// Posisi tiap foto di grid (index mulai dari 0)
const tileLayout: Record<number, string> = {
  0: 'col-span-2 desk:row-span-2',
  3: 'desk:row-span-2',
  4: 'desk:col-span-2',
}
</script>

<template>
  <section id="kalcer" class="py-[84px] desk:py-28">
    <BaseContainer>
      <div data-reveal>
        <SectionKicker>FOMO kalcer</SectionKicker>
        <h2 class="mb-3">Isi <em>keseharian</em> kami</h2>
      </div>

      <div
        data-reveal
        class="mt-11 mb-7 grid auto-rows-[150px] grid-cols-2 gap-4 desk:auto-rows-[190px] desk:grid-cols-4"
      >
        <ImagePlaceholder
          v-for="(label, index) in galleryLabels"
          :key="label"
          :class="tileLayout[index]"
        >
          {{ label }}
        </ImagePlaceholder>
      </div>

      <BaseButton :href="site.instagramUrl">Ikuti {{ site.instagramHandle }}</BaseButton>
    </BaseContainer>
  </section>
</template>
