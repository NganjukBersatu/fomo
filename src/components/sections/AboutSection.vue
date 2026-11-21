<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import { perks } from '@/data/perks'
</script>

<template>
  <section id="tentang" class="pb-[84px] desk:pb-28">
    <BaseContainer class="grid items-start gap-16 desk:grid-cols-2">
      <div data-reveal>
        <SectionKicker>Tentang kami</SectionKicker>
        <h2 class="mb-6">Siapa di balik <em>FOMO</em></h2>
        <p class="max-w-[480px] text-lg">
          [CERITA CAFE: kapan berdiri, siapa di baliknya, dan kenapa dinamakan FOMO.]
        </p>
      </div>

      <ul data-reveal class="grid gap-3.5">
        <li
          v-for="perk in perks"
          :key="perk.number"
          class="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-1 rounded-[28px] border-2 border-line bg-white px-[30px] py-[26px] transition-[translate,background-color] hover:translate-x-2 hover:bg-soft"
        >
          <b
            class="row-span-2 font-display text-[40px] text-lime [-webkit-text-stroke:1.5px_var(--color-ink)]"
          >
            {{ perk.number }}
          </b>
          <strong class="font-display text-2xl text-ink">{{ perk.title }}</strong>
          <span>{{ perk.description }}</span>
        </li>
      </ul>
    </BaseContainer>
  </section>
</template>
