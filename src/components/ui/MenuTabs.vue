<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { MenuCategory, MenuCategoryId } from '@/types'

const props = defineProps<{
  categories: MenuCategory[]
}>()

const activeId = defineModel<MenuCategoryId>({ required: true })

const tabEls: (HTMLButtonElement | null)[] = []

function setTabEl(el: Element | ComponentPublicInstance | null, index: number): void {
  tabEls[index] = el instanceof HTMLButtonElement ? el : null
}

const KEY_DELTA: Record<string, number> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
}

function onKeydown(event: KeyboardEvent, index: number): void {
  const delta = KEY_DELTA[event.key]
  if (delta === undefined) return
  event.preventDefault()

  const total = props.categories.length
  const nextIndex = (index + delta + total) % total
  const next = props.categories[nextIndex]
  if (!next) return

  activeId.value = next.id
  tabEls[nextIndex]?.focus()
}
</script>

<template>
  <div class="flex flex-row flex-wrap gap-2.5 desk:flex-col" role="tablist" aria-label="Kategori menu">
    <button
      v-for="(category, index) in categories"
      :id="`tab-${category.id}`"
      :key="category.id"
      :ref="(el) => setTabEl(el, index)"
      type="button"
      role="tab"
      class="cursor-pointer rounded-full border-2 px-5 py-3 text-left font-display text-lg font-extrabold transition-[background-color,translate] desk:px-6 desk:py-[18px] desk:text-[22px]"
      :class="
        activeId === category.id
          ? 'border-ink bg-ink text-white hover:bg-brand desk:translate-x-2.5'
          : 'border-line bg-mint text-ink hover:bg-soft'
      "
      :aria-selected="activeId === category.id"
      :aria-controls="`panel-${category.id}`"
      :tabindex="activeId === category.id ? 0 : -1"
      @click="activeId = category.id"
      @keydown="onKeydown($event, index)"
    >
      {{ category.label }}
    </button>
  </div>
</template>
