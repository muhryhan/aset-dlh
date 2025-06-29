export interface AlatKerjaData {
  id_alatkerja: number;
  qrcode: string;
  gambar: string;
  merek: string;
  no_registrasi: string;
  no_serial: string;
  asal: string;
  tahun_pembelian: number;
  harga_pembelian: number;
  kondisi: string;
  keterangan: string;
  [key: string]: unknown;
}
