import axios from "axios";

interface Ac {
  id: number;
  qrCode: string;
  gambar: string;
  merek: string;
  noRegistrasi: string;
  noSerial: string;
  ukuran: string;
  ruangan: string;
  asal: string;
  tahunPembelian: number;
  hargaPembelian: number;
  kondisi: string;
  keterangan: string;
}

export async function fetchAc(): Promise<Ac[]> {
  try {
    const response = await axios.get<Ac[]>('/api/ac');
    return response.data;
  } catch (error) {
    console.error("Error fetching AC:", error);
    throw error;
  }
}

export async function createAc(data: Omit<Ac, "id">): Promise<Ac> {
  try {
    const response = await axios.post<Ac>('/api/ac', data);
    return response.data;
  } catch (error) {
    console.error("Error creating AC:", error);
    throw error;
  }
}

export async function updateAc(id: string, data: Partial<Omit<Ac, "id">>): Promise<Ac> {
  try {
    const response = await axios.put<Ac>(`/api/ac/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating AC id=${id}:`, error);
    throw error;
  }
}

export async function deleteAc(id: string): Promise<void> {
  try {
    await axios.delete(`/api/ac/${id}`);
  } catch (error) {
    console.error(`Error deleting AC id=${id}:`, error);
    throw error;
  }
}