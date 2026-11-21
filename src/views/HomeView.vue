<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import StatementSection from '@/components/sections/StatementSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import MenuSection from '@/components/sections/MenuSection.vue'
import TestimonialSection from '@/components/sections/TestimonialSection.vue'
import GallerySection from '@/components/sections/GallerySection.vue'
import OrderSection from '@/components/sections/OrderSection.vue'
import VisitSection from '@/components/sections/VisitSection.vue'

let observer: IntersectionObserver | null = null

onMounted(() => {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')

  if (!('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('in'))
    return
  }

  observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('in')
        obs.unobserve(entry.target)
      }
    },
    { threshold: 0.12 },
  )

  targets.forEach((target) => observer?.observe(target))
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <HeroSection />
  <StatementSection />
  <AboutSection />
  <MenuSection />
  <TestimonialSection />
  <GallerySection />
  <OrderSection />
  <VisitSection />
</template>
