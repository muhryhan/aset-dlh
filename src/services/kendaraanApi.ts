import axios from "axios";

interface Kendaraan {
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

export async function fetchKendaraan(): Promise<Kendaraan[]> {
  try {
    const response = await axios.get<Kendaraan[]>('/api/kendaraan');
    return response.data;
  } catch (error) {
    console.error("Error fetching kendaraan:", error);
    throw error;
  }
}

export async function createKendaraan(data: Omit<Kendaraan, "id">): Promise<Kendaraan> {
  try {
    const response = await axios.post<Kendaraan>('/api/kendaraan', data);
    return response.data;
  } catch (error) {
    console.error("Error creating kendaraan:", error);
    throw error;
  }
}

export async function updateKendaraan(id: string, data: Partial<Omit<Kendaraan, "id">>): Promise<Kendaraan> {
  try {
    const response = await axios.put<Kendaraan>(`/api/kendaraan/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating kendaraan id=${id}:`, error);
    throw error;
  }
}

export async function deleteKendaraan(id: string): Promise<void> {
  try {
    await axios.delete(`/api/kendaraan/${id}`);
  } catch (error) {
    console.error(`Error deleting kendaraan id=${id}:`, error);
    throw error;
  }
}