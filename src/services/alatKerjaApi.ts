import axios from "axios";

interface AlatKerja {
  id: number;
  qrCode: string;
  gambar: string;
  merek: string;
  noRegistrasi: string;
  noSerial: string;
  asal: string;
  tahunPembelian: number;
  hargaPembelian: number;
  kondisi: string;
  keterangan: string;
}

export async function fetchAlatKerja(): Promise<AlatKerja[]> {
  try {
    const response = await axios.get<AlatKerja[]>('/api/alat-kerja');
    return response.data;
  } catch (error) {
    console.error("Error fetching alat kerja:", error);
    throw error;
  }
}

export async function createAlatKerja(data: Omit<AlatKerja, "id">): Promise<AlatKerja> {
  try {
    const response = await axios.post<AlatKerja>('/api/alat-kerja', data);
    return response.data;
  } catch (error) {
    console.error("Error creating alat kerja:", error);
    throw error;
  }
}

export async function updateAlatKerja(id: string, data: Partial<Omit<AlatKerja, "id">>): Promise<AlatKerja> {
  try {
    const response = await axios.put<AlatKerja>(`/api/alat-kerja/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating alat kerja id=${id}:`, error);
    throw error;
  }
}

export async function deleteAlatKerja(id: string): Promise<void> {
  try {
    await axios.delete(`/api/alat-kerja/${id}`);
  } catch (error) {
    console.error(`Error deleting alat kerja id=${id}:`, error);
    throw error;
  }
}
