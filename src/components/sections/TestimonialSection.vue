<script setup lang="ts">
import BaseContainer from '@/components/ui/BaseContainer.vue'
import SectionKicker from '@/components/ui/SectionKicker.vue'
import TestimonialBubble from '@/components/ui/TestimonialBubble.vue'
import { testimonials } from '@/data/testimonials'
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
      </div>

      <div class="mx-auto mt-12 flex max-w-[820px] flex-col gap-[18px]">
        <TestimonialBubble
          v-for="testimonial in testimonials"
          :key="testimonial.quote"
          data-reveal
          :testimonial="testimonial"
        />
      </div>
    </BaseContainer>
  </section>
</template>
