export interface Branch {
  id: string
  name: string
  /** Catatan tulisan tangan singkat di kartu footer */
  note: string
  address: string
  openingHours: string
  /** Nomor lokal diawali 0, mis. 085185429946. null = belum ada nomor. */
  whatsapp: string | null
  mapsUrl: string
  lat: number
  lng: number
  rating: number
  reviewCount: number
}