export interface TanamanMasukData extends Record<string, unknown> {
  id_tanamanmasuk: number;
  id_tanaman: number;
  tanggal: string;
  jumlah: number;
  keterangan: string;
}
