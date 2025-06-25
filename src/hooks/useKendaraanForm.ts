import { useEffect, useState } from "react";
import { KendaraanData } from "../types/kendaraan";
import { localDate } from "../utils/dateUtils";
import { validateRequiredFields } from "../utils/formUtils";
import { submitKendaraan } from "../services/kendaraan";

export function useKendaraanForm(initialData?: Partial<KendaraanData>, onSuccess?: () => void) {
  const isEdit = !!initialData?.id_kendaraan;

  const [formData, setFormData] = useState({
    qrcode: "",
    gambar: null as File | null,
    merek: "",
    no_polisi: "",
    no_mesin: "",
    no_rangka: "",
    warna: "",
    harga_pembelian: "",
    tahun_pembuatan: "",
    kategori: "",
    pajak: "",
    pemegang: "",
    nik: "",
    penggunaan: "",
    kondisi: "",
  });

  const [alertMessage, setAlertMessage] = useState<{
    variant: "success" | "warning" | "error";
    title?: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        harga_pembelian: initialData.harga_pembelian?.toString() ?? "",
        tahun_pembuatan: initialData.tahun_pembuatan?.toString() ?? "",
        pajak: initialData.pajak ? localDate(initialData.pajak) : "",
        nik: initialData.nik?.toString() ?? "",
        gambar: null,
      }));
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const upperCaseFields = ["no_polisi", "no_mesin", "no_rangka"];
    const numberFields = ["harga_pembelian", "nik"];

    let newValue: string = value;

    if (numberFields.includes(id)) {
      newValue = value.replace(/\D/g, ""); // hanya angka
    } else if (upperCaseFields.includes(id)) {
      newValue = value.toUpperCase();
    }

    setFormData((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, gambar: file }));
  };

  const handleDateChange = (selectedDate: Date[]) => {
    const formatted = localDate(selectedDate[0]);
    setFormData((prev) => ({
      ...prev,
      pajak: formatted,
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      qrcode: "",
      gambar: null,
      merek: "",
      no_polisi: "",
      no_mesin: "",
      no_rangka: "",
      warna: "",
      harga_pembelian: "",
      tahun_pembuatan: "",
      kategori: "",
      pajak: "",
      pemegang: "",
      nik: "",
      penggunaan: "",
      kondisi: "",
    });
  };

  const handleSubmit = async () => {
    setAlertMessage(null);
    const requiredFields = [
      "merek", "no_polisi", "no_mesin", "no_rangka", "warna",
      "harga_pembelian", "tahun_pembuatan", "kategori", "pajak",
      "pemegang", "nik", "penggunaan", "kondisi"
    ];

    const error = validateRequiredFields(formData, requiredFields);
    if (error) {
      setAlertMessage({ variant: "warning", title: "Validasi Gagal", message: error });
      return;
    }

    if (!formData.gambar) {
      setAlertMessage({ variant: "warning", title: "Validasi Gagal", message: "Gambar kendaraan wajib diunggah." });
      return;
    }

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val) payload.append(key, val instanceof File ? val : val.toString());
      });

      const res = await submitKendaraan(payload, isEdit, initialData?.id_kendaraan);
      if (![200, 201].includes(res.status)) throw new Error();

      setAlertMessage({ variant: "success", title: "Berhasil", message: "Data berhasil disimpan." });
      setTimeout(() => {
        resetForm();
        setAlertMessage(null);
        onSuccess?.();
      }, 2000);
    } catch (e) {
      console.error(e);
      setAlertMessage({ variant: "error", title: "Gagal", message: "Terjadi kesalahan saat menyimpan data." });
    }
  };

  return {
    formData,
    isEdit,
    alertMessage,
    handleInputChange,
    handleFileChange,
    handleDateChange,
    handleSelectChange,
    handleSubmit,
    resetForm,
    setAlertMessage,
  };
}
