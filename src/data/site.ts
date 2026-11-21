import type { DeliveryApp, NavLink, SiteInfo } from '@/types'

export const site: SiteInfo = {
  name: 'FOMO Cafe',
  tagline: 'Feed the panic',
  community: 'Tempat kumpul anak FOMO',
  description: 'Tempat seperti cafe yang dibuat hanya karena FOMO.',
  badgeText: 'FEAR OF MISSING OUT · TEMPAT KUMPUL ANAK FOMO · ',
  instagramHandle: '@fomo.pusat',
  instagramUrl: 'https://www.instagram.com/fomo.pusat/',
  mapsUrl: 'https://maps.app.goo.gl/mVrkPGif88h4PWfq5?g_st=ic',
  appDownloadUrl: 'https://fomo.up.railway.app/unduh',
  careerUrl: '#',
  address: '[ALAMAT LENGKAP]',
  openingHours: '[JAM BUKA]',
  whatsapp: '[WHATSAPP]',
}

export const navLinks: NavLink[] = [
  { label: 'Tentang', hash: '#tentang' },
  { label: 'Menu', hash: '#menu' },
  { label: 'Kata teman', hash: '#teman' },
  { label: 'Kalcer', hash: '#kalcer' },
  { label: 'Pesan antar', hash: '#pesan' },
  { label: 'Karier', hash: '#tim' },
]

export const deliveryApps: DeliveryApp[] = [
  { name: 'GoFood', url: '#' },
  { name: 'GrabFood', url: '#' },
  { name: 'ShopeeFood', url: '#' },
]

export const galleryLabels: string[] = [
  '[FOTO 1]',
  '[FOTO 2]',
  '[FOTO 3]',
  '[FOTO 4]',
  '[FOTO 5]',
  '[FOTO 6]',
]
