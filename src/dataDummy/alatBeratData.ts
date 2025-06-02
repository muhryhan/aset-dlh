export interface AlatBeratData {
  id: number;
  qrCode: string;
  gambar: string;
  merek: string;
  noRegistrasi: string;
  noMesin: string;
  noRangka: string;
  warna: string;
  hargaPembelian: number;
  tahunPembuatan: string;
  kategori: string;
  pajak: string;
  penggunaan: string;
  kondisi: string;
}

// Define the table data using the interface
export const alatBeratData: AlatBeratData[] = [
  {
    id: 1,
    qrCode: "QR-001",
    gambar: "caterpillar-d8t.jpg",
    merek: "Caterpillar D8T",
    noRegistrasi: "AB 1234 CD",
    noMesin: "ENG-001-CAT",
    noRangka: "CHS-001-CAT",
    warna: "Kuning",
    hargaPembelian: 2500000000,
    tahunPembuatan: "2018",
    kategori: "Bulldozer",
    pajak: "2025-05-01",
    penggunaan: "Proyek Jalan Raya",
    kondisi: "Baik",
  },
  {
    id: 2,
    qrCode: "QR-002",
    gambar: "komatsu-pc200.jpg",
    merek: "Komatsu PC200",
    noRegistrasi: "BD 5678 EF",
    noMesin: "ENG-002-KMT",
    noRangka: "CHS-002-KMT",
    warna: "Kuning",
    hargaPembelian: 1800000000,
    tahunPembuatan: "2020",
    kategori: "Excavator",
    pajak: "2025-07-10",
    penggunaan: "Galian Pondasi",
    kondisi: "Baik",
  },
  {
    id: 3,
    qrCode: "QR-003",
    gambar: "hitachi-zx210lc.jpg",
    merek: "Hitachi ZX210LC",
    noRegistrasi: "CD 9101 GH",
    noMesin: "ENG-003-HTC",
    noRangka: "CHS-003-HTC",
    warna: "Oranye",
    hargaPembelian: 1750000000,
    tahunPembuatan: "2019",
    kategori: "Excavator",
    pajak: "2024-12-15",
    penggunaan: "Konstruksi Gedung",
    kondisi: "Perlu Servis",
  },
  {
    id: 4,
    qrCode: "QR-004",
    gambar: "liebherr-ltm1100.jpg",
    merek: "Liebherr LTM 1100",
    noRegistrasi: "DE 1122 IJ",
    noMesin: "ENG-004-LBH",
    noRangka: "CHS-004-LBH",
    warna: "Putih",
    hargaPembelian: 3200000000,
    tahunPembuatan: "2021",
    kategori: "Crane",
    pajak: "2025-09-20",
    penggunaan: "Angkat Material Berat",
    kondisi: "Baik",
  },
  {
    id: 5,
    qrCode: "QR-005",
    gambar: "volvo-a40g.jpg",
    merek: "Volvo A40G",
    noRegistrasi: "EF 3344 KL",
    noMesin: "ENG-005-VLV",
    noRangka: "CHS-005-VLV",
    warna: "Kuning",
    hargaPembelian: 2000000000,
    tahunPembuatan: "2017",
    kategori: "Dump Truck",
    pajak: "2025-03-01",
    penggunaan: "Angkut Material",
    kondisi: "Kurang Baik",
  },
  {
    id: 6,
    qrCode: "QR-006",
    gambar: "sany-stc750.jpg",
    merek: "SANY STC750",
    noRegistrasi: "GH 5566 MN",
    noMesin: "ENG-006-SNY",
    noRangka: "CHS-006-SNY",
    warna: "Merah",
    hargaPembelian: 2300000000,
    tahunPembuatan: "2019",
    kategori: "Crane",
    pajak: "2025-06-30",
    penggunaan: "Konstruksi Jalan Layang",
    kondisi: "Baik",
  },
];