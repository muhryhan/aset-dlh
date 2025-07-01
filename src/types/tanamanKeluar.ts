export interface TanamanKeluarData extends Record<string, unknown> {
  id_tanamankeluar: number;
  id_tanaman: number;
  tanggal: string;
  jumlah: number;
  keterangan: string;
}
