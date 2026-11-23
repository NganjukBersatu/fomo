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
// Mobile: tinggi area judul di atas peta (pin harus muncul di bawahnya)
const MOBILE_TOP_RESERVED_PX = 280
// Mobile: setengah lebar label pin + jarak, agar label tidak terpotong tepi
const MOBILE_SIDE_PX = 64
const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

const mapEl = ref<HTMLDivElement | null>(null)
let map: L.Map | null = null
let resizeObserver: ResizeObserver | null = null
const markers = new Map<string, L.Marker>()

const isDesktop = (): boolean => window.matchMedia(DESKTOP_QUERY).matches
const canAnimate = (): boolean =>
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Padding area peta yang boleh dipakai pin (label + pin tingginya ±80px)
const fitPadding = (): { tl: L.PointTuple; br: L.PointTuple } =>
  isDesktop()
    ? { tl: [LEFT_RESERVED_PX + 24, 40], br: [40, 40] }
    : { tl: [MOBILE_SIDE_PX, MOBILE_TOP_RESERVED_PX], br: [MOBILE_SIDE_PX, 90] }
    
const shortName = (name: string): string => name.replace(/^FOMO\s+/i, '')

const pinIcon = (branch: Branch, active: boolean): L.DivIcon =>
  L.divIcon({
    className: 'fomo-pin',
    html: `
      <div class="fomo-pin__wrap">
        <span class="fomo-pin__label${active ? ' is-active' : ''}">${shortName(branch.name)}</span>
        <svg width="40" height="52" viewBox="0 0 40 52" aria-hidden="true"><path d="M20 50C8 36 4 28 4 19a16 16 0 1 1 32 0c0 9-4 17-16 31z" fill="${active ? '#6edc82' : '#2d6a4f'}" stroke="#1b3a2c" stroke-width="3"/><circle cx="20" cy="19" r="7" fill="${active ? '#1b3a2c' : '#f6f1e4'}"/></svg>
      </div>`,
    // tinggi 80 = label (24) + jarak (4) + pin (52); ujung pin ada di y=78
    iconSize: [110, 80],
    iconAnchor: [55, 78],
  })

const fitAll = (): void => {
  if (!map) return
  const bounds = L.latLngBounds(
    props.branches.map((b): L.LatLngTuple => [b.lat, b.lng]),
  )
  const { tl, br } = fitPadding()
  map.fitBounds(bounds, {
    paddingTopLeft: tl,
    paddingBottomRight: br,
    maxZoom: 14,
    animate: false,
  })
}

const focusBranch = (id: string): void => {
  const branch = props.branches.find((b) => b.id === id)
  if (!map || !branch) return
  const point = L.latLng(branch.lat, branch.lng)
  const { tl, br } = fitPadding()
  map.flyToBounds(L.latLngBounds(point, point), {
    paddingTopLeft: isDesktop() ? [LEFT_RESERVED_PX, 0] : tl,
    paddingBottomRight: isDesktop() ? [0, 0] : br,
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
    const isActive = branch.id === props.activeId
    const marker = L.marker([branch.lat, branch.lng], {
      icon: pinIcon(branch, isActive),
      title: branch.name,
      alt: branch.name,
      keyboard: true,
      zIndexOffset: isActive ? 1000 : 0,
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
    for (const branch of props.branches) {
      const marker = markers.get(branch.id)
      if (!marker) continue
      const isActive = branch.id === id
      marker.setIcon(pinIcon(branch, isActive))
      marker.setZIndexOffset(isActive ? 1000 : 0)
    }
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

@media (max-width: 900px) {
  :deep(.leaflet-container) {
    background: var(--color-night);
  }
}

/* pin + label nama (gaya K2) */
:deep(.fomo-pin__wrap) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
:deep(.fomo-pin__label) {
  padding: 3px 10px;
  border-radius: 999px;
  background: #f6f1e4;
  color: #1b3a2c;
  font-size: 12px;
  font-weight: 800;
  line-height: 18px;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}
:deep(.fomo-pin__label.is-active) {
  background: #6edc82;
  border: 2px solid #1b3a2c;
  padding: 1px 10px;
}

/* mobile: tanpa tombol zoom (K2 tidak memakainya) */
@media (max-width: 900px) {
  :deep(.leaflet-control-zoom) {
    display: none;
  }
}

@media (min-width: 901px) {
  /* turunkan tombol zoom agar tidak menabrak stiker */
  :deep(.leaflet-top.leaflet-right) {
    margin-top: 170px;
  }
}
</style>