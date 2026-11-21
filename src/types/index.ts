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
  number: string
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
  badge: string
}

export type MenuCategoryId = 'minuman' | 'makanan' | 'camilan'

export interface MenuCategory {
  id: MenuCategoryId
  label: string
  items: MenuItem[]
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
