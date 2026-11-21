<script setup lang="ts">
import { Download } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import { site } from '@/data/site'
</script>

<template>
  <div
    id="tim"
    data-reveal
    class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5"
  >
    <div class="flex flex-col items-start gap-3.5 rounded-[36px] bg-mint p-10 text-copy">
      <SectionKicker flush>Karier</SectionKicker>
      <h3 class="text-[32px]">Gabung tim FOMO</h3>
      <p>[PENJELASAN SINGKAT: posisi yang dibuka dan budaya kerja tim.]</p>
      <BaseButton class="mt-auto" :href="site.careerUrl">Lamar sekarang</BaseButton>
    </div>

    <div class="flex flex-col items-start gap-3.5 rounded-[36px] bg-mint p-10 text-copy">
      <SectionKicker flush>Untuk tim FOMO</SectionKicker>
      <h3 class="text-[32px]">FOMO Management System</h3>
      <p>Aplikasi internal tim untuk Android, iPhone, dan iPad.</p>
      <BaseButton class="mt-auto" :href="site.appDownloadUrl">
        <Download class="size-5" aria-hidden="true" />
        Unduh aplikasi
      </BaseButton>
    </div>
  </div>
</template>
