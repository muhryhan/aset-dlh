export interface AcData {
  id: number;
  qrCode: string;
  gambar: string;
  merek: string;
  noRegistrasi: string;
  noSerial: string;
  ukuran: string;
  ruangan: string;
  asal: string;
  tahunPembelian: string;
  hargaPembelian: number;
  kondisi: string;
  keterangan: string;
}

export const acData: AcData[] = [
  {
    id: 1,
    qrCode: "QR001",
    gambar: "/images/ac1.jpg",
    merek: "Polytron",
    noRegistrasi: "23.83495",
    noSerial: "SADH234",
    ukuran: "1 PK",
    ruangan: "Ruang Server",
    asal: "Pembelian",
    tahunPembelian: "2020",
    hargaPembelian: 3500000,
    kondisi: "Baik",
    keterangan: "-",
  },
  {
    id: 2,
    qrCode: "QR002",
    gambar: "/images/ac2.jpg",
    merek: "Sharp",
    noRegistrasi: "24933495",
    noSerial: "DSFJ999234",
    ukuran: "1.5 PK",
    ruangan: "Ruang Kepala",
    asal: "Hibah",
    tahunPembelian: "2023",
    hargaPembelian: 4000000,
    kondisi: "Baik Sekali",
    keterangan: "AC baru diganti",
  },
  {
    id: 3,
    qrCode: "QR003",
    gambar: "/images/ac3.jpg",
    merek: "LG",
    noRegistrasi: "11020394",
    noSerial: "HTC567321",
    ukuran: "2 PK",
    ruangan: "Ruang Rapat",
    asal: "Pembelian",
    tahunPembelian: "2021",
    hargaPembelian: 5000000,
    kondisi: "Baik",
    keterangan: "-",
  },
];