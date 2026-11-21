<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Branch } from '@/types/branch'

const props = defineProps<{
  branches: readonly Branch[]
  activeId: string
}>()

const emit = defineEmits<{ select: [id: string] }>()

// Sama dengan --breakpoint-desk di CSS utama
const DESKTOP_QUERY = '(min-width: 901px)'
// Lebar area kartu di kiri (430px + jarak) agar pin tidak tertutup kartu
const LEFT_RESERVED_PX = 480
const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

const mapEl = ref<HTMLDivElement | null>(null)
let map: L.Map | null = null
let resizeObserver: ResizeObserver | null = null
const markers = new Map<string, L.Marker>()

const leftPadding = (): number =>
  window.matchMedia(DESKTOP_QUERY).matches ? LEFT_RESERVED_PX : 0
const canAnimate = (): boolean =>
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const pinIcon = (active: boolean): L.DivIcon =>
  L.divIcon({
    className: 'fomo-pin',
    html: `<svg width="40" height="52" viewBox="0 0 40 52" aria-hidden="true"><path d="M20 50C8 36 4 28 4 19a16 16 0 1 1 32 0c0 9-4 17-16 31z" fill="${active ? '#6edc82' : '#2d6a4f'}" stroke="#1b3a2c" stroke-width="3"/><circle cx="20" cy="19" r="7" fill="#f6f1e4"/></svg>`,
    iconSize: [40, 52],
    iconAnchor: [20, 50],
  })

const fitAll = (): void => {
  if (!map) return
  const bounds = L.latLngBounds(
    props.branches.map((b): L.LatLngTuple => [b.lat, b.lng]),
  )
  map.fitBounds(bounds, {
    paddingTopLeft: [leftPadding() + 24, 40],
    paddingBottomRight: [40, 40],
    maxZoom: 14,
    animate: false,
  })
}

const focusBranch = (id: string): void => {
  const branch = props.branches.find((b) => b.id === id)
  if (!map || !branch) return
  const point = L.latLng(branch.lat, branch.lng)
  map.flyToBounds(L.latLngBounds(point, point), {
    paddingTopLeft: [leftPadding(), 0],
    maxZoom: 15,
    animate: canAnimate(),
  })
}

onMounted(() => {
  const el = mapEl.value
  if (!el) return

  map = L.map(el, { scrollWheelZoom: false, zoomControl: false })
  fitAll()
  L.control.zoom({ position: 'topright' }).addTo(map)
  L.tileLayer(TILE_URL, { maxZoom: 19, attribution: ATTRIBUTION }).addTo(map)

  for (const branch of props.branches) {
    const marker = L.marker([branch.lat, branch.lng], {
      icon: pinIcon(branch.id === props.activeId),
      title: branch.name,
      alt: branch.name,
      keyboard: true,
    })
    marker.on('click', () => emit('select', branch.id))
    marker.addTo(map)
    markers.set(branch.id, marker)
  }

  resizeObserver = new ResizeObserver(() => map?.invalidateSize())
  resizeObserver.observe(el)
})

watch(
  () => props.activeId,
  (id) => {
    markers.forEach((marker, key) => marker.setIcon(pinIcon(key === id)))
    focusBranch(id)
  },
)

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  map?.remove()
  map = null
  markers.clear()
})
</script>

<template>
  <div class="relative isolate size-full">
    <div
      ref="mapEl"
      class="size-full"
      role="region"
      aria-label="Peta lokasi cabang FOMO"
    ></div>
  </div>
</template>

<style scoped>
:deep(.leaflet-container) {
  font-family: inherit;
  background: var(--color-soft);
}
:deep(.leaflet-tile-pane) {
  filter: saturate(0.85);
}
@media (min-width: 901px) {
  /* turunkan tombol zoom agar tidak menabrak stiker */
  :deep(.leaflet-top.leaflet-right) {
    margin-top: 170px;
  }
}
</style>