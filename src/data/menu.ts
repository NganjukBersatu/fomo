import type { FavoriteMenu, MenuCategory } from '@/types'

export const favoriteMenus: FavoriteMenu[] = [
  {
    photoLabel: '[FOTO MENU 1]',
    badge: 'Andalan',
    name: '[Nama menu 1]',
    description: '[Deskripsi singkat]',
    price: '[HARGA]',
  },
  {
    photoLabel: '[FOTO MENU 2]',
    badge: 'Andalan',
    name: '[Nama menu 2]',
    description: '[Deskripsi singkat]',
    price: '[HARGA]',
  },
  {
    photoLabel: '[FOTO MENU 3]',
    badge: 'Andalan',
    name: '[Nama menu 3]',
    description: '[Deskripsi singkat]',
    price: '[HARGA]',
  },
]

export const menuCategories: MenuCategory[] = [
  {
    id: 'minuman',
    label: 'Minuman',
    items: [
      { name: '[Nama minuman 1]', description: '[Keterangan]', price: '[HARGA]' },
      { name: '[Nama minuman 2]', description: '[Keterangan]', price: '[HARGA]' },
      { name: '[Nama minuman 3]', description: '[Keterangan]', price: '[HARGA]' },
    ],
  },
  {
    id: 'makanan',
    label: 'Makanan',
    items: [
      { name: '[Nama makanan 1]', description: '[Keterangan]', price: '[HARGA]' },
      { name: '[Nama makanan 2]', description: '[Keterangan]', price: '[HARGA]' },
      { name: '[Nama makanan 3]', description: '[Keterangan]', price: '[HARGA]' },
    ],
  },
  {
    id: 'camilan',
    label: 'Camilan',
    items: [
      { name: '[Nama camilan 1]', description: '[Keterangan]', price: '[HARGA]' },
      { name: '[Nama camilan 2]', description: '[Keterangan]', price: '[HARGA]' },
      { name: '[Nama camilan 3]', description: '[Keterangan]', price: '[HARGA]' },
    ],
  },
]
