import api from "./api";

export const submitKendaraan = async (
  data: FormData,
  isEdit: boolean,
  id?: string | number
) => {
  if (isEdit && id) {
    return await api.put(`/api/kendaraan/${id}`, data);
  }
  return await api.post("/api/kendaraan", data);
};
