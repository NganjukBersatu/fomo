<script setup lang="ts">
import ImagePlaceholder from '@/components/ui/ImagePlaceholder.vue'
import type { FavoriteMenu } from '@/types'

withDefaults(
  defineProps<{
    menu: FavoriteMenu
    featured?: boolean
  }>(),
  { featured: false },
)
</script>

<template>
  <article
    class="rounded-[32px] border-2 px-3.5 pt-3.5 pb-7 transition-[translate,rotate] hover:-translate-y-2 hover:-rotate-[.6deg]"
    :class="featured ? 'border-brand bg-brand text-soft' : 'border-line bg-mint'"
  >
    <ImagePlaceholder class="mb-[22px] h-60">{{ menu.photoLabel }}</ImagePlaceholder>
    <p
      class="mx-3.5 text-[13px] font-bold tracking-[.1em] uppercase"
      :class="featured ? 'text-line' : 'text-brand'"
    >
      {{ menu.badge }}
    </p>
    <h3 class="mx-3.5 mb-2 text-[28px]" :class="featured ? 'text-white' : ''">{{ menu.name }}</h3>
    <p class="mx-3.5">{{ menu.description }}</p>
    <div class="mx-3.5 mt-[18px] flex items-center justify-between">
      <span
        class="rounded-full px-4 py-1.5 text-sm font-bold"
        :class="featured ? 'bg-lime text-deep' : 'bg-ink text-white'"
      >
        {{ menu.price }}
      </span>
    </div>
  </article>
</template>
