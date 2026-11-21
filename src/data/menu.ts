import type { FavoriteMenu, MenuCategory } from '@/types'
import favminuman from '@/assets/minuman.png'
import favmakanan from '@/assets/makanan.png'
import favcamilan from '@/assets/cemilan.png'

export const favoriteMenus: FavoriteMenu[] = [
  {
    photoLabel: '[FOTO KOPI ORIGINAL FOMO]',
    photo: favminuman,
    badge: 'Andalan',
    name: 'Kopi Fomo',
    description: 'Es kopi khas kami, segar dan pas di lidah.',
    price: 'Rp11.000',
  },
  {
    photoLabel: '[FOTO SEBLAK FOMO]',
    photo: favmakanan,
    badge: 'Cuma ada di FOMO',
    name: 'Rice Bowl Fomo',
    description: 'Pedas, gurih, dan bikin pengin nambah.',
    price: 'Rp15.000',
  },
  {
    photoLabel: '[FOTO CIRENG KUAH FOMO]',
    photo: favcamilan,
    badge: 'Andalan',
    name: 'Kentang Goreng Fomo',
    description: 'Renyah dan gurih, tersedia rasa original, ayam bawang, dan balado.',
    price: 'Rp13.000',
  },
]

const HI = 'Hot / Ice'
const ICE = 'Ice'

export const menuCategories: MenuCategory[] = [
  {
    id: 'minuman',
    label: 'Minuman',
    groups: [
      {
        title: 'Coffee',
        items: [
          { name: 'Avocado Coffee', description: HI, price: '16K' },
          { name: 'Kopi Original Fomo', description: ICE, price: '11K' },
          { name: 'Choco Cream Latte', description: HI, price: '11K' },
          { name: 'Cool Vanilla Latte', description: HI, price: '11K' },
          { name: 'Nut Caramel Latte', description: HI, price: '11K' },
        ],
      },
      {
        title: 'Premium Coffee',
        items: [
          { name: 'Velvet Hazelnut', description: HI, price: '18K' },
          { name: 'Dark Royale', description: HI, price: '18K' },
          { name: 'Salted Caramel', description: HI, price: '18K' },
          { name: 'Spanish Coffee', description: HI, price: '18K' },
          { name: 'Long Black', description: 'Ice, tanpa gula', price: '10K' },
          { name: 'Shaken Americano', description: 'Ice, dengan gula', price: '10K' },
        ],
      },
      {
        title: 'Matcha',
        items: [
          { name: 'Matcha Latte', description: HI, price: '18K' },
          { name: 'Matcha Verse', description: 'Ice, dengan gula aren', price: '17K' },
        ],
      },
      {
        title: 'Milk Series',
        items: [
          { name: 'Chocolate', description: HI, price: '13K' },
          { name: 'Red Velvet', description: HI, price: '13K' },
          { name: 'Taro', description: HI, price: '13K' },
          { name: 'Mango', description: HI, price: '13K' },
          { name: 'Banana', description: HI, price: '13K' },
          { name: 'Strawberry', description: HI, price: '13K' },
          { name: 'Bubble Gum', description: ICE, price: '13K' },
          { name: 'Milo Original', description: HI, price: '12K' },
          { name: 'Milo Marshmallow', description: HI, price: '15K' },
        ],
      },
      {
        title: 'Sparkult',
        items: [
          { name: 'Anggur Sparkult', description: ICE, price: '13K' },
          { name: 'Leci Sparkult', description: ICE, price: '13K' },
          { name: 'Melon Sparkult', description: ICE, price: '13K' },
          { name: 'Strawberry Sparkult', description: ICE, price: '13K' },
        ],
      },
      {
        title: 'Tea & Other',
        items: [
          { name: 'Lemon Tea', description: HI, price: '10K' },
          { name: 'Lychee Tea', description: HI, price: '10K' },
          { name: 'Teh Tarik', description: HI, price: '10K' },
          { name: 'Joshua', description: ICE, price: '10K' },
          { name: 'Fomocola Susu', description: ICE, price: '10K' },
          { name: 'Fomocola Original', description: ICE, price: '8K' },
          { name: 'Teh Solo', description: HI, price: '7K' },
          { name: 'Air Mineral', description: 'Botol', price: '5K' },
        ],
      },
      {
        title: 'Add On',
        note: 'Tambahan',
        items: [
          { name: 'Espresso Extrashot', description: '', price: '6K' },
          { name: 'Es Batu', description: '', price: '1K' },
          { name: 'Extra Cup', description: '', price: '1.5K' },
        ],
      },
    ],
  },
  {
    id: 'makanan',
    label: 'Makanan',
    groups: [
      {
        title: 'Cuma ada di FOMO',
        note: 'Andalan',
        highlight: true,
        items: [
          { name: 'Seblak Fomo', description: '', price: '15K' },
          { name: 'Cireng Kuah Fomo', description: '', price: '13K' },
          { name: 'Mie Fomo Pedas Manis', description: '', price: '13K' },
          { name: 'Mie Fomo Pedas Gurih', description: '', price: '13K' },
        ],
      },
      {
        title: 'Rice Bowl',
        items: [
          { name: 'Ayam Blackpepper', description: '', price: '15K' },
          { name: 'Ayam Sambal Matah', description: '', price: '15K' },
          { name: 'Ayam Saus Mentai', description: '', price: '15K' },
          { name: 'Ayam Geprek', description: '', price: '15K' },
          { name: 'Kulit Ayam', description: '', price: '15K' },
          { name: 'Nasi Goreng Fomo', description: '', price: '15K' },
          { name: 'Telur Pontianak', description: '', price: '15K' },
        ],
      },
      {
        title: 'Menu Kuah',
        items: [
          { name: 'Cuanki', description: '', price: '13K' },
          { name: 'Bakso Kuah', description: '', price: '13K' },
        ],
      },
      {
        title: 'Roti Bakar',
        items: [
          { name: 'Cokelat', description: '', price: '13K' },
          { name: 'Keju', description: '', price: '13K' },
          { name: 'Greentea', description: '', price: '13K' },
          { name: 'Cokelat Keju', description: '', price: '15K' },
          { name: 'Cokelat Greentea', description: '', price: '15K' },
        ],
      },
      {
        title: 'Add On',
        note: 'Tambahan',
        items: [
          { name: 'Topping Ayam', description: '', price: '5K' },
          { name: 'Topping Bakso', description: '', price: '5K' },
          { name: 'Topping Nugget', description: '', price: '5K' },
          { name: 'Topping Siomay', description: '', price: '5K' },
          { name: 'Telur Mata Sapi', description: '', price: '5K' },
          { name: 'Telur Dadar', description: '', price: '5K' },
          { name: 'Extra Sambal Matah', description: '', price: '3K' },
          { name: 'Extra Pepper', description: '', price: '1.5K' },
          { name: 'Extra Pedas', description: '', price: '1.5K' },
        ],
      },
    ],
  },
  {
    id: 'camilan',
    label: 'Camilan',
    groups: [
      {
        title: 'Platter',
        note: 'Buat rame-rame',
        highlight: true,
        items: [
          { name: 'Fomo Platter Jumbo', description: 'Untuk 4-5 orang', price: '55K' },
          { name: 'Fomo Platter Reguler', description: '', price: '14K' },
        ],
      },
      {
        title: 'Snack',
        items: [
          { name: 'Nugget', description: '', price: '11K' },
          { name: 'Sosis', description: '', price: '11K' },
          { name: 'French Fries', description: 'Original, Ayam Bawang, Balado', price: '11K' },
          { name: 'Tahu Bakso', description: '', price: '10K' },
          { name: 'Bakso Goreng', description: '', price: '10K' },
          { name: 'Cireng Salju', description: '', price: '10K' },
        ],
      },
    ],
  },
]