export interface TumbuhanData {
  id: number;
  gambar: string;
  nama: string;
  jenis: string;
  stok: number;
  keterangan: string;
}

// Define the table data using the interface
export const tumbuhanData: TumbuhanData[] = [
  {
    id: 1,
    gambar: "https://example.com/images/anggrek.jpg",
    nama: "Anggrek Bulan",
    jenis: "Hias",
    stok: 10,
    keterangan: "Tanaman hias populer dengan bunga berwarna putih.",
  },
  {
    id: 2,
    gambar: "https://example.com/images/kaktus.jpg",
    nama: "Kaktus Mini",
    jenis: "Hias",
    stok: 25,
    keterangan: "Perawatan mudah, cocok untuk dekorasi meja.",
  },
  {
    id: 3,
    gambar: "https://example.com/images/lidah-mertua.jpg",
    nama: "Lidah Mertua",
    jenis: "Penyaring Udara",
    stok: 15,
    keterangan: "Efektif menyaring udara, cocok untuk dalam ruangan.",
  },
  {
    id: 4,
    gambar: "https://example.com/images/pakis.jpg",
    nama: "Pakis Boston",
    jenis: "Hias",
    stok: 8,
    keterangan: "Tanaman dengan daun lebat, suka tempat teduh.",
  },
  {
    id: 5,
    gambar: "https://example.com/images/mint.jpg",
    nama: "Daun Mint",
    jenis: "Herbal",
    stok: 20,
    keterangan: "Biasa digunakan untuk minuman dan masakan.",
  },
  {
    id: 6,
    gambar: "https://example.com/images/bunga-matahari.jpg",
    nama: "Bunga Matahari",
    jenis: "Hias",
    stok: 12,
    keterangan: "Membutuhkan cahaya matahari penuh untuk tumbuh optimal.",
  },
];