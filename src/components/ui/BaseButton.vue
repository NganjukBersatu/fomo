<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

type ButtonVariant = 'lime' | 'ghost' | 'solid' | 'deep'

const props = withDefaults(
  defineProps<{
    href: string
    variant?: ButtonVariant
  }>(),
  { variant: 'solid' },
)

const baseClass =
  'inline-flex items-center gap-2 rounded-full border-2 px-[30px] py-4 text-base font-bold transition-[translate,background-color,color] duration-150 hover:-translate-y-[3px] motion-reduce:transition-none'

const variantClass: Record<ButtonVariant, string> = {
  lime: 'border-transparent bg-lime text-deep hover:bg-[#9BEFAE]',
  ghost: 'border-white text-white hover:bg-white hover:text-ink',
  solid: 'border-transparent bg-ink text-white hover:bg-brand',
  deep: 'border-transparent bg-deep text-white hover:bg-ink',
}

// "#menu" dst. = tautan ke section di halaman utama, lewat router
const isSectionLink = computed<boolean>(() => props.href.length > 1 && props.href.startsWith('#'))
// "/" dst. = halaman internal lain
const isRouteLink = computed<boolean>(() => props.href.startsWith('/'))
</script>

<template>
  <RouterLink
    v-if="isSectionLink"
    :to="{ path: '/', hash: href }"
    :class="[baseClass, variantClass[variant]]"
  >
    <slot />
  </RouterLink>
  <RouterLink v-else-if="isRouteLink" :to="href" :class="[baseClass, variantClass[variant]]">
    <slot />
  </RouterLink>
  <a v-else :href="href" :class="[baseClass, variantClass[variant]]">
    <slot />
  </a>
</template>
