import type { Perk } from '@/types'
import { Users, Wifi, Coffee } from 'lucide-vue-next'

export const perks: Perk[] = [
  { icon: Users, title: 'Tempat Kumpul', description: 'Luas dan nyaman buat nongkrong rame-rame.' },
  { icon: Wifi, title: 'Ngobrol Betah', description: 'Wi-Fi kencang, colokan banyak.' },
  { icon: Coffee, title: 'Rasa Juara', description: 'Menu segar, harga bersahabat.' },
]