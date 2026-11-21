<script setup lang="ts">
import { computed } from 'vue'
import type { Testimonial } from '@/types'

const props = defineProps<{
  testimonial: Testimonial
}>()

const isRight = computed<boolean>(() => props.testimonial.align === 'right')
</script>

<template>
  <blockquote
    class="max-w-[92%] px-7 py-6 text-xl desk:max-w-[78%]"
    :class="
      isRight
        ? 'self-end rounded-[30px_30px_8px_30px] bg-ink text-white'
        : 'rounded-[30px_30px_30px_8px] border-2 border-line bg-white'
    "
  >
    <p>{{ testimonial.quote }}</p>
    <cite
      class="mt-2.5 block text-sm font-bold not-italic"
      :class="isRight ? 'text-line' : 'text-brand'"
    >
      {{ testimonial.author }}
    </cite>
  </blockquote>
</template>
