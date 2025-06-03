

interface Tumbuhan {
  id: number;
  gambar: string;
  nama: string;
  jenis: string;
  stok: number;
  keterangan: string;
}

export async function fetchTumbuhan(): Promise<Tumbuhan[]> {
  try {
    const response = await axios.get<Tumbuhan[]>('/api/tumbuhan');
    return response.data;
  } catch (error) {
    console.error("Error fetching tumbuhan:", error);
    throw error;
  }
}

export async function createTumbuhan(data: Omit<Tumbuhan, "id">): Promise<Tumbuhan> {
  try {
    const response = await axios.post<Tumbuhan>('/api/tumbuhan', data);
    return response.data;
  } catch (error) {
    console.error("Error creating tumbuhan:", error);
    throw error;
  }
}

export async function updateTumbuhan(id: string, data: Partial<Omit<Tumbuhan, "id">>): Promise<Tumbuhan> {
  try {
    const response = await axios.put<Tumbuhan>(`/api/tumbuhan/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating tumbuhan id=${id}:`, error);
    throw error;
  }
}

export async function deleteTumbuhan(id: string): Promise<void> {
  try {
    await axios.delete(`/api/tumbuhan/${id}`);
  } catch (error) {
    console.error(`Error deleting tumbuhan id=${id}:`, error);
    throw error;
  }
}