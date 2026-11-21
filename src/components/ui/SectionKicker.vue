<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'brand' | 'light'
    flush?: boolean
  }>(),
  { tone: 'brand', flush: false },
)
</script>

<template>
  <p
    class="inline-block text-[13px] font-bold tracking-[.16em] uppercase"
    :class="[tone === 'light' ? 'text-line' : 'text-brand', flush ? 'mb-0' : 'mb-[18px]']"
  >
    <slot />
  </p>
</template>
