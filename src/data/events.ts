import badut from '@/assets/event/badut.jpg'
import foto from '@/assets/event/foto.jpg'
import ride from '@/assets/event/ride.jpg'
import ngobrol from '@/assets/event/ngobrol.jpeg'

export interface EventItem {
  id: string
  title: string
  kicker: string
  date: string
  place: string
  description: string
  poster?: string
}

export const events: EventItem[] = [
    {
    id: 'badut-sulap-kalcer',
    title: 'Badut Sulap Kalcer',
    kicker: 'Malam Minggu di FOMO',
    date: 'Sabtu, 24 Oktober 2026',
    place: 'FOMO Ngronggot',
    description:
      'Siap-siap ketawa dan dibikin takjub! Ajak teman, pasangan, dan keluarga.',
    poster: badut,
  },
  {
    id: 'fotografer-kalcer',
    title: 'Fotografer Kalcer',
    kicker: 'Hadir hari ini!',
    date: 'Hari ini',
    place: 'FOMO Ngronggot',
    description:
      'Pakai outfit paling kalcermu, siapin pose andalanmu, dan abadikan momennya bareng fotografer kalcer di FOMO Ngronggot!',
    poster: foto,
  },
  {
    id: 'ride-and-vibe-goes-to-fomo',
    title: 'Ride and Vibe goes to FOMO',
    kicker: 'FOMO x Ride & Vibe',
    date: 'Sabtu, 5 September 2026',
    place: 'Tikum Alun-alun WRJ, finish di FOMO Ngronggot',
    description:
      "Gowes bareng khusus wanita dari Tikum Alun-alun WRJ dengan finish di FOMO Ngronggot. Ada free refreshment. Let's ride together!",
    poster: ride,
  },
   {
    id: 'ngobrol-santai-bahas-konten-vol-2',
    title: 'Ngobrol Santai Bahas Konten Vol.2',
    kicker: 'Bangun personal brand, hasilkan cuan dari konten',
    date: "Jum'at, 26 Juni 2026",
    place: 'Cafe Fomo, Dsn. Waung, Ds. Sonoageng, Kec. Prambon',
    description:
      'Ngobrol santai seputar dunia konten: bangun personal brand dan hasilkan cuan dari konten. Open gate 16.00, check in peserta 16.00 - 17.00, acara inti 18.00 - 20.00.',
    poster: ngobrol,
  },
]