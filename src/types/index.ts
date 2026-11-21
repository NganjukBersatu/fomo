import type { Component } from 'vue'

export interface SiteInfo {
  name: string
  tagline: string
  community: string
  description: string
  badgeText: string
  instagramHandle: string
  instagramUrl: string
  mapsUrl: string
  appDownloadUrl: string
  careerUrl: string
  address: string
  openingHours: string
  whatsapp: string
}

export interface NavLink {
  label: string
  hash: `#${string}`
}

export interface Perk {
  icon: Component
  title: string
  description: string
}

export interface MenuItem {
  name: string
  description: string
  price: string
}

export interface FavoriteMenu extends MenuItem {
  photoLabel: string
  photo?: string
  badge: string
}

export type MenuCategoryId = 'minuman' | 'makanan' | 'camilan'

export interface MenuGroup {
  title: string
  note?: string
  highlight?: boolean
  items: MenuItem[]
}

export interface MenuCategory {
  id: MenuCategoryId
  label: string
  groups: MenuGroup[]
}

export interface Testimonial {
  quote: string
  author: string
  align: 'left' | 'right'
}

export interface DeliveryApp {
  name: string
  url: string
}