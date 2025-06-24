import { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import FileInput from "../form/input/FileInput";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import Alert from "../ui/alert/Alert";
import { CalenderIcon } from "../../icons";

import { KendaraanData } from "../../components/tables/KendaraanTable";
import api from "../../../services/api";

type Props = {
  onSuccess?: () => void;
  initialData?: Partial<KendaraanData>;
};

function formatNumberWithDots(value: string): string {
  const raw = value.replace(/\D/g, "");
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function localDate(dateStr: string | Date): string {
  const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().split("T")[0];
}

export default function KendaraanFormInput({ onSuccess, initialData }: Props) {
  const isEdit = !!initialData?.id_kendaraan;

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        harga_pembelian: initialData.harga_pembelian?.toString() ?? "",
        tahun_pembuatan: initialData.tahun_pembuatan?.toString() ?? "",
        pajak: initialData?.pajak ? localDate(initialData.pajak) : "",
        nik: initialData.nik?.toString() ?? "",
        gambar: null,
      }));
    }
  }, [initialData]);

  // --- Alert Message State
  const [alertMessage, setAlertMessage] = useState<{
    variant: "success" | "warning" | "error" | "info";
    title?: string;
    message: string;
  } | null>(null);

  // --- Static Options
  const kategori = [
    { value: "Roda 2", label: "Roda 2" },
    { value: "Roda 4", label: "Roda 4" },
    { value: "Roda 6", label: "Roda 6" },
  ];
  const kondisi = [
    { value: "Baik", label: "Baik" },
    { value: "Rusak Ringan", label: "Rusak Ringan" },
    { value: "Rusak Berat", label: "Rusak Berat" },
  ];

  // --- Form State
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

  const handleDateChange = (selectedDate: Date[]) => {
    const formatted = localDate(selectedDate[0]);
    setFormData((prev) => ({
      ...prev,
      pajak: formatted,
    }));
  };

  // --- Input Handlers
  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, gambar: file }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const upperCaseFields = ["no_polisi", "no_mesin", "no_rangka"];
    const numberFields = ["harga_pembelian"];

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

  // --- Submit Handler
  const handleSubmit = async () => {
    setAlertMessage(null);
    const requiredFields = [
      "merek",
      "no_polisi",
      "no_mesin",
      "no_rangka",
      "warna",
      "harga_pembelian",
      "tahun_pembuatan",
      "kategori",
      "pajak",
      "pemegang",
      "nik",
      "penggunaan",
      "kondisi",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]?.toString().trim()) {
        setAlertMessage({
          variant: "warning",
          title: "Validasi Gagal",
          message: `Field ${field.replace("_", " ")} tidak boleh kosong`,
        });
        return;
      }
    }

    if (!formData.gambar) {
      setAlertMessage({
        variant: "warning",
        title: "Validasi Gagal",
        message: `Gambar kendaraan wajib diunggah.`,
      });
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          if (key === "gambar" && value instanceof File) {
            data.append(key, value);
          } else {
            data.append(key, value as string);
          }
        }
      });

      const isEdit = !!initialData?.id_kendaraan;

      const response = isEdit
        ? await api.put(`/api/kendaraan/${initialData.id_kendaraan}`, data)
        : await api.post("/api/kendaraan", data);

      if (![200, 201].includes(response.status))
        throw new Error("Gagal menyimpan data");

      setAlertMessage({
        variant: "success",
        title: "Berhasil",
        message: response.data.message || "Data berhasil disimpan.",
      });

      setTimeout(() => {
        resetForm();
        onSuccess?.();
        setAlertMessage(null);
      }, 2000);
    } catch (err) {
      console.error("Error saat submit:", err);
      setAlertMessage({
        variant: "error",
        title: "Gagal",
        message: "Terjadi kesalahan saat menyimpan data.",
      });
    }
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

  // --- Render
  return (
    <ComponentCard title="Masukkan Data Kendaraan">
      <div className="space-y-6 w-full">
        {alertMessage && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1/2 z-99">
            <Alert
              variant={alertMessage.variant}
              title={alertMessage.title}
              message={alertMessage.message}
              autoClose
              duration={2000}
              onClose={() => setAlertMessage(null)}
            />
          </div>
        )}
        <div>
          <Label htmlFor="gambar">Upload file</Label>
          <FileInput
            id_file="gambar"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="merek">Merek</Label>
          <Input
            type="text"
            id="merek"
            value={formData.merek}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="no_polisi">Nomor Polisi</Label>
          <Input
            type="text"
            id="no_polisi"
            value={formData.no_polisi}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="no_mesin">Nomor Mesin</Label>
          <Input
            type="text"
            id="no_mesin"
            value={formData.no_mesin}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="no_rangka">Nomor Rangka</Label>
          <Input
            type="text"
            id="no_rangka"
            value={formData.no_rangka}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="warna">Warna</Label>
          <Input
            type="text"
            id="warna"
            value={formData.warna}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="harga_pembelian">Harga Pembelian</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white bg-transparent z-10">
              Rp
            </span>
            <Input
              type="text"
              id="harga_pembelian"
              value={formatNumberWithDots(formData.harga_pembelian)}
              onChange={handleInputChange}
              inputMode="numeric"
              pattern="[0-9]*"
              className="pl-10 w-full"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tahun_pembuatan">Tahun Pembuatan</Label>
          <Input
            type="number"
            id="tahun_pembuatan"
            value={formData.tahun_pembuatan}
            onChange={handleInputChange}
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="kategori">Kategori</Label>
          <Select
            value={formData.kategori}
            options={kategori}
            placeholder="Kategori kendaraan"
            onChange={(value) => handleSelectChange("kategori", value)}
            className="w-full dark:bg-dark-900"
          />
        </div>
        <div>
          <Label htmlFor="pajak">Pajak</Label>
          <div className="relative w-full flatpickr-wrapper">
            <Flatpickr
              value={formData.pajak}
              onChange={handleDateChange} // Handle the date change
              options={{
                dateFormat: "Y-m-d",
                appendTo:
                  typeof document !== "undefined" ? document.body : undefined, // Set the date format
              }}
              placeholder="Pilih tanggal"
              className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs
              bg-white text-gray-800 placeholder:text-gray-400 border-gray-300
              focus:border-brand-300 focus:ring-brand-500/20
              dark:bg-gray-900 dark:text-white dark:placeholder:text-white/40
              dark:border-gray-700 dark:focus:border-brand-800"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-white">
              <CalenderIcon className="size-6" />
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="pemegang">Pemegang</Label>
          <Input
            type="text"
            id="pemegang"
            value={formData.pemegang}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="nik">NIK</Label>
          <Input
            type="number"
            id="nik"
            value={formData.nik}
            onChange={handleInputChange}
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="penggunaan">Penggunaan</Label>
          <Input
            type="text"
            id="penggunaan"
            value={formData.penggunaan}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="kondisi">Kondisi</Label>
          <Select
            value={formData.kondisi}
            options={kondisi}
            placeholder="Kondisi kendaraan"
            onChange={(value) => handleSelectChange("kondisi", value)}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            size="md"
            variant={isEdit ? "warning" : "primary"}
            onClick={handleSubmit}
          >
            {isEdit ? "Update" : "Submit"}
          </Button>

          <Button size="md" variant="outline" onClick={resetForm}>
            Reset
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
