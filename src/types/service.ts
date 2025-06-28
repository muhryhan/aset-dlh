interface Onderdil {
  id_onderdil: number;
  nama_onderdil: string;
  jumlah: number;
  harga: number;
}

export interface ServisData extends Record<string, unknown> {
  id_servis: number | null;
  tanggal: string;
  no_unik: string;
  nama_bengkel: string;
  biaya_servis: number;
  nota_pembayaran: string;
  dokumentasi: string;
  onderdil: Onderdil[];
}

export interface OnderdilItem extends Record<string, unknown> {
  nama_onderdil: string;
  jumlah: string;
  harga: string;
  isBerkala?: boolean;
}
