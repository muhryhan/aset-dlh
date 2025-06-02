export interface AlatKerjaData {
  id: number;
  qrCode: string;
  gambar: string;
  merek: string;
  noRegistrasi: string;
  noSerial: string;
  asal: string;
  tahunPembelian: string;
  hargaPembelian: number;
  kondisi: string;
  keterangan: string;
}

// Define the table data using the interface
export const alatKerjaData: AlatKerjaData[] = [
  {
    id: 1,
    qrCode: "QR001",
    gambar: "suzuki.jpg",
    merek: "Suzuki",
    noRegistrasi: "23.83495",
    noSerial: "SADH234",
    asal: "Pengadaan Pemerintah",
    tahunPembelian: "2016",
    hargaPembelian: 35000000,
    kondisi: "Kurang Baik",
    keterangan: "Butuh perawatan rutin",
  },
  {
    id: 2,
    qrCode: "QR002",
    gambar: "fuso.jpg",
    merek: "Fuso",
    noRegistrasi: "00000495",
    noSerial: "DSFJ999234",
    asal: "Hibah",
    tahunPembelian: "2027",
    hargaPembelian: 120000000,
    kondisi: "Kurang Baik",
    keterangan: "Cat terkelupas, mesin normal",
  },
  {
    id: 3,
    qrCode: "QR003",
    gambar: "bosch.jpg",
    merek: "Bosch",
    noRegistrasi: "45.11220",
    noSerial: "BOS123456",
    asal: "Pengadaan Swasta",
    tahunPembelian: "2020",
    hargaPembelian: 1500000,
    kondisi: "Baik",
    keterangan: "Masih dalam garansi",
  },
  {
    id: 4,
    qrCode: "QR004",
    gambar: "makita.jpg",
    merek: "Makita",
    noRegistrasi: "11.98764",
    noSerial: "MKT098765",
    asal: "Pengadaan Pemerintah",
    tahunPembelian: "2019",
    hargaPembelian: 2000000,
    kondisi: "Baik",
    keterangan: "Digunakan di bengkel utama",
  },
  {
    id: 5,
    qrCode: "QR005",
    gambar: "hitachi.jpg",
    merek: "Hitachi",
    noRegistrasi: "99.55441",
    noSerial: "HTC567321",
    asal: "Pengadaan Pemerintah",
    tahunPembelian: "2022",
    hargaPembelian: 4000000,
    kondisi: "Perlu Servis",
    keterangan: "Bermasalah pada motor penggerak",
  },
  {
    id: 6,
    qrCode: "QR006",
    gambar: "yamaha.jpg",
    merek: "Yamaha",
    noRegistrasi: "66.77788",
    noSerial: "YMH443211",
    asal: "Pengadaan Swasta",
    tahunPembelian: "2021",
    hargaPembelian: 25000000,
    kondisi: "Baik",
    keterangan: "Kendaraan operasional lapangan",
  },
];