import type { DeliveryApp, NavLink, SiteInfo } from '@/types'
import foto1 from '@/assets/keseharian/1.jpg'
import foto2 from '@/assets/keseharian/2.jpg'
import foto3 from '@/assets/keseharian/3.jpg'
import foto4 from '@/assets/keseharian/4.jpg'
import foto5 from '@/assets/keseharian/5.jpg'
import foto6 from '@/assets/keseharian/6.jpg'
import foto7 from '@/assets/keseharian/7.jpg'
import foto8 from '@/assets/keseharian/8.jpg'
import foto9 from '@/assets/keseharian/9.jpg'

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
  { label: 'Event', hash: '#event' },
  { label: 'Menu', path: '/menu' },
  { label: 'Kata teman', hash: '#teman' },
  { label: 'Kalcer', hash: '#kalcer' },
]

export const deliveryApps: DeliveryApp[] = [
  { name: 'GoFood', url: '#' },
  { name: 'GrabFood', url: '#' },
  { name: 'ShopeeFood', url: '#' },
]

export interface GalleryPhoto {
  src: string
  alt: string
}

export const galleryPhotos: GalleryPhoto[] = [
  { src: foto1, alt: 'Suasana keseharian di FOMO, foto 1' },
  { src: foto2, alt: 'Suasana keseharian di FOMO, foto 2' },
  { src: foto3, alt: 'Suasana keseharian di FOMO, foto 3' },
  { src: foto4, alt: 'Suasana keseharian di FOMO, foto 4' },
  { src: foto5, alt: 'Suasana keseharian di FOMO, foto 5' },
  { src: foto6, alt: 'Suasana keseharian di FOMO, foto 6' },
  { src: foto7, alt: 'Suasana keseharian di FOMO, foto 7' },
  { src: foto8, alt: 'Suasana keseharian di FOMO, foto 8' },
  { src: foto9, alt: 'Suasana keseharian di FOMO, foto 9' },
]