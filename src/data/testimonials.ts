import ulasan1 from '@/assets/ulasan/ulasan1.png'
import ulasan2 from '@/assets/ulasan/ulasan2.png'
import ulasan3 from '@/assets/ulasan/ulasan3.png'
import ulasan4 from '@/assets/ulasan/ulasan4.png'
import ulasan5 from '@/assets/ulasan/ulasan5.png'
import ulasan6 from '@/assets/ulasan/ulasan6.png'
import ulasan7 from '@/assets/ulasan/ulasan7.png'
import ulasan8 from '@/assets/ulasan/ulasan8.png'
import ulasan9 from '@/assets/ulasan/ulasan9.png'
import ulasan10 from '@/assets/ulasan/ulasan10.png'
import ulasan11 from '@/assets/ulasan/ulasan11.png'
import aYani from '@/assets/ulasan/A-yani.png'
import ngeronggot from '@/assets/ulasan/ngeronggot.png'
import pusat from '@/assets/ulasan/pusat.png'

export interface ReviewShot {
  id: string
  image: string
  alt: string
  label?: string
}

export const branchShots: ReviewShot[] = [
  { id: 'pusat', image: pusat, alt: 'Tangkapan layar ulasan FOMO Pusat', label: 'FOMO Pusat' },
  { id: 'a-yani', image: aYani, alt: 'Tangkapan layar ulasan FOMO A. Yani', label: 'FOMO A. Yani' },
  { id: 'ngeronggot', image: ngeronggot, alt: 'Tangkapan layar ulasan FOMO Ngronggot', label: 'FOMO Ngronggot' },
]

export const reviewShots: ReviewShot[] = [
  ulasan1, ulasan2, ulasan3, ulasan4, ulasan5, ulasan6,
  ulasan7, ulasan8, ulasan9, ulasan10, ulasan11,
].map((image, i) => ({
  id: `ulasan-${i + 1}`,
  image,
  alt: `Tangkapan layar ulasan pelanggan FOMO nomor ${i + 1}`,
}))