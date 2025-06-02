export interface TumbuhanMasukData {
  idTumbuhanMasuk: number;
  id: number;
  tanggal: string;
  jumlah: number;
  keterangan: string;
}

// Define the table data using the interface
export const tumbuhanMasukData: TumbuhanMasukData[] = [
  {
    idTumbuhanMasuk: 1,
    id: 101,
    tanggal: "2025-05-01",
    jumlah: 10,
    keterangan: "Penambahan stok awal bulan",
  },
  {
    idTumbuhanMasuk: 2,
    id: 102,
    tanggal: "2025-05-03",
    jumlah: 5,
    keterangan: "Sumbangan dari komunitas hijau",
  },
  {
    idTumbuhanMasuk: 3,
    id: 103,
    tanggal: "2025-05-05",
    jumlah: 20,
    keterangan: "Pembelian dari supplier luar",
  },
  {
    idTumbuhanMasuk: 4,
    id: 104,
    tanggal: "2025-05-07",
    jumlah: 8,
    keterangan: "Stok pengganti yang mati",
  },
  {
    idTumbuhanMasuk: 5,
    id: 105,
    tanggal: "2025-05-10",
    jumlah: 12,
    keterangan: "Tambahan koleksi tanaman baru",
  },
  {
    idTumbuhanMasuk: 6,
    id: 106,
    tanggal: "2025-05-15",
    jumlah: 15,
    keterangan: "Donasi dari yayasan lingkungan",
  },
];