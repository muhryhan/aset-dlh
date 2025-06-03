import axios from "axios";

interface AlatBerat {
  id: number;
  qrCode: string;
  gambar: string;
  merek: string;
  noRegistrasi: string;
  noMesin: string;
  noRangka: string;
  warna: string;
  hargaPembelian: number;
  tahunPembuatan: number;
  kategori: string;
  pajak: string;
  penggunaan: string;
  kondisi: string;
}

export async function fetchAlatBerat(): Promise<AlatBerat[]> {
  try {
    const response = await axios.get<AlatBerat[]>('/api/alat-berat');
    return response.data;
  } catch (error) {
    console.error("Error fetching alat berat:", error);
    throw error;
  }
}

export async function createAlatBerat(data: Omit<AlatBerat, "id">): Promise<AlatBerat> {
  try {
    const response = await axios.post<AlatBerat>('/api/alat-berat', data);
    return response.data;
  } catch (error) {
    console.error("Error creating alat berat:", error);
    throw error;
  }
}

export async function updateAlatBerat(id: string, data: Partial<Omit<AlatBerat, "id">>): Promise<AlatBerat> {
  try {
    const response = await axios.put<AlatBerat>(`/api/alat-berat/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating alat berat id=${id}:`, error);
    throw error;
  }
}

export async function deleteAlatBerat(id: string): Promise<void> {
  try {
    await axios.delete(`/api/alat-berat/${id}`);
  } catch (error) {
    console.error(`Error deleting alat berat id=${id}:`, error);
    throw error;
  }
}
