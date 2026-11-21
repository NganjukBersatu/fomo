import type { Branch } from '@/types/branch'

export const branches: [Branch, ...Branch[]] = [
  {
    id: 'pusat',
    name: 'FOMO Pusat',
    note: 'markas awal',
    address:
      'Jl. Warujayeng - Kediri No.8, Sonoageng, Sono Ageng, Kec. Prambon, Kabupaten Nganjuk, Jawa Timur 64484',
    openingHours: 'Buka 24 jam',
    whatsapp: '085185429946',
    mapsUrl: 'https://maps.app.goo.gl/r2A2VcW3YfHLbPz98',
    lat: -7.654681797949765,
    lng: 112.01170921486704,
    rating: 4.5,
    reviewCount: 181,
  },
  {
    id: 'ngronggot',
    name: 'FOMO Ngronggot',
    note: 'garap tugas 24 jam',
    address:
      'Ngronggot Wetan, Ngronggot, Kec. Ngronggot, Kabupaten Nganjuk, Jawa Timur 64395',
    openingHours: 'Buka 24 jam',
    whatsapp: null,
    mapsUrl: 'https://maps.app.goo.gl/REbzgwfwhaGerrYG7',
    lat: -7.671014125870918,
    lng: 112.05943107780288,
    rating: 4.8,
    reviewCount: 24,
  },
  {
    id: 'ayani',
    name: 'FOMO A. Yani',
    note: 'tengah kota',
    address:
      'Jl. Ahmad Yani, Payaman, Kec. Nganjuk, Kabupaten Nganjuk, Jawa Timur 64416',
    openingHours: 'Buka 24 jam',
    whatsapp: '085196577305',
    mapsUrl: 'https://maps.app.goo.gl/9Qf7ut1gu43fLUxEA',
    lat: -7.600409988666555,
    lng: 111.91429600296352,
    rating: 4.7,
    reviewCount: 30,
  },
]