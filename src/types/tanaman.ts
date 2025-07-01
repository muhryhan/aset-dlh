export interface TanamanData {
  id_tanaman: number;
  gambar: string;
  nama: string;
  jenis: string;
  stok: number;
  keterangan: string;
  [key: string]: unknown;
}
