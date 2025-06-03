export interface KendaraanData {
  id: number;
  qrCode: string;
  gambar: string;
  merek: string;
  nomorPolisi: string;
  nomorMesin: string;
  nomorRangka: string;
  warna: string;
  hargaPembelian: number;
  tahunPembuatan: number;
  kategori: string;
  pajak: string;
  pemegang: string;
  nik: number;
  penggunaan: string;
  kondisi: string;
}

export const kendaraanData: KendaraanData[] = [
  {
    id: 1,
    qrCode: "QRK001",
    gambar: "avanza.jpg",
    merek: "Toyota Avanza",
    nomorPolisi: "B 1234 XYZ",
    nomorMesin: "1NR123456",
    nomorRangka: "MHKTN12AVZ001",
    warna: "Hitam",
    hargaPembelian: 230000000,
    tahunPembuatan: 2022,
    kategori: "R4",
    pajak: "2025-06-15",
    pemegang: "Andi Pratama",
    nik: 3174091001900001,
    penggunaan: "Operasional",
    kondisi: "Baik",
  },
  {
    id: 2,
    qrCode: "QRK002",
    gambar: "nmax.jpg",
    merek: "Yamaha NMAX",
    nomorPolisi: "D 5678 ABC",
    nomorMesin: "NMAX56789Y",
    nomorRangka: "MH34MAY1234NMX",
    warna: "Putih",
    hargaPembelian: 32000000,
    tahunPembuatan: 2021,
    kategori: "R2",
    pajak: "2024-11-01",
    pemegang: "Budi Setiawan",
    nik: 3205051502870002,
    penggunaan: "Pribadi",
    kondisi: "Baik",
  },
  {
    id: 3,
    qrCode: "QRK003",
    gambar: "giga.jpg",
    merek: "Isuzu Giga",
    nomorPolisi: "F 9876 DEF",
    nomorMesin: "GIGA9087ISZ",
    nomorRangka: "MH4GIGA9087XYZ",
    warna: "Kuning",
    hargaPembelian: 580000000,
    tahunPembuatan: 2020,
    kategori: "R6",
    pajak: "2025-01-20",
    pemegang: "Samsul Huda",
    nik: 3271062103740003,
    penggunaan: "Distribusi",
    kondisi: "Perlu Servis",
  },
  {
    id: 4,
    qrCode: "QRK004",
    gambar: "coltdiesel.jpg",
    merek: "Mitsubishi Colt Diesel",
    nomorPolisi: "E 1111 GH",
    nomorMesin: "MITSUDL4567",
    nomorRangka: "MH4COLT9876RNG",
    warna: "Kuning",
    hargaPembelian: 350000000,
    tahunPembuatan: 2019,
    kategori: "R4",
    pajak: "2024-08-05",
    pemegang: "Dewi Sartika",
    nik: 3210120405840004,
    penggunaan: "Distribusi",
    kondisi: "Kurang Baik",
  },
  {
    id: 5,
    qrCode: "QRK005",
    gambar: "beat.jpg",
    merek: "Honda Beat",
    nomorPolisi: "Z 2222 JK",
    nomorMesin: "BEAT0987HNDA",
    nomorRangka: "MH4BEAT0987JKL",
    warna: "Merah",
    hargaPembelian: 17000000,
    tahunPembuatan: 2023,
    kategori: "R2",
    pajak: "2026-02-28",
    pemegang: "Lia Amalia",
    nik: 3208032201970005,
    penggunaan: "Operasional",
    kondisi: "Baik",
  },
  {
    id: 6,
    qrCode: "QRK006",
    gambar: "fortuner.jpg",
    merek: "Toyota Fortuner",
    nomorPolisi: "B 9999 QWE",
    nomorMesin: "FORTN789TOY",
    nomorRangka: "MHKTN89FRT0099",
    warna: "Putih",
    hargaPembelian: 550000000,
    tahunPembuatan: 2021,
    kategori: "R4",
    pajak: "2025-12-10",
    pemegang: "Rudi Hartono",
    nik: 3273071603770006,
    penggunaan: "Pimpinan",
    kondisi: "Baik",
  },
];