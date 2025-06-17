import { useState } from "react";
import "flatpickr/dist/themes/material_blue.css";

import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import FileInput from "../form/input/FileInput";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import Alert from "../ui/alert/Alert";

import api from "../../../services/api";

type Props = {
  onSuccess?: () => void;
};

export default function AcFormInput({ onSuccess }: Props) {
  // --- Alert Message State
  const [alertMessage, setAlertMessage] = useState<{
    variant: "success" | "warning" | "error" | "info";
    title?: string;
    message: string;
  } | null>(null);

  // --- Form State
  const [formData, setFormData] = useState({
    qrcode: "",
    gambar: null as File | null,
    merek: "",
    no_registrasi: "",
    no_serial: "",
    ukuran: "",
    ruangan: "",
    asal: "",
    tahun_pembelian: "",
    harga_pembelian: "",
    kondisi: "",
    keterangan: "",
  });

  // --- Static Options
  const kondisi = [
    { value: "Baik", label: "Baik" },
    { value: "Rusak Ringan", label: "Rusak ringan" },
    { value: "Rusak Berat", label: "Rusak berat" },
  ];

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
    const upperCaseFields = ["no_registrasi", "no_serial", "ruangan"];
    setFormData((prev) => ({
      ...prev,
      [id]: upperCaseFields.includes(id) ? value.toUpperCase() : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      qrcode: "",
      gambar: null,
      merek: "",
      no_registrasi: "",
      no_serial: "",
      ukuran: "",
      ruangan: "",
      asal: "",
      tahun_pembelian: "",
      harga_pembelian: "",
      kondisi: "",
      keterangan: "",
    });
  };

  // --- Submit Handler
  const handleSubmit = async () => {
    setAlertMessage(null);
    const requiredFields = [
      "merek",
      "no_registrasi",
      "no_serial",
      "ukuran",
      "ruangan",
      "asal",
      "tahun_pembelian",
      "harga_pembelian",
      "kondisi",
      "keterangan",
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
        message: "Gambar ac wajib diunggah.",
      });
      return;
    }

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

    try {
      const response = await api.post("/api/ac", data);
      if (response.status !== 201) throw new Error("Gagal menyimpan data");

      setAlertMessage({
        variant: "success",
        title: "Berhasil",
        message: response.data.message || "Data berhasil disimpan.",
      });

      setTimeout(() => {
        resetForm();
        onSuccess?.();
      }, 1000);
    } catch (err) {
      console.error("Error saat submit:", err);
      setAlertMessage({
        variant: "error",
        title: "Gagal",
        message: "Terjadi kesalahan saat menyimpan data.",
      });
    }
  };

  return (
    <ComponentCard title="Masukkan Data Ac">
      <div className="space-y-6 w-full">
        {alertMessage && (
          <div className="mb-4">
            <Alert
              variant={alertMessage.variant}
              title={alertMessage.title}
              message={alertMessage.message}
              autoClose
              duration={3000}
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
          <Label htmlFor="no_registrasi">Nomor Registrasi</Label>
          <Input
            type="text"
            id="no_registrasi"
            value={formData.no_registrasi}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="no_serial">Nomor Serial</Label>
          <Input
            type="text"
            id="no_serial"
            value={formData.no_serial}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="ukuran">Ukuran</Label>
          <Input
            type="text"
            id="ukuran"
            value={formData.ukuran}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="ruangan">Ruangan</Label>
          <Input
            type="text"
            id="ruangan"
            value={formData.ruangan}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="asal">Asal</Label>
          <Input
            type="text"
            id="asal"
            value={formData.asal}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="tahun_pembelian">Tahun Pembelian</Label>
          <Input
            type="number"
            id="tahun_pembelian"
            value={formData.tahun_pembelian}
            onChange={handleInputChange}
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="harga_pembelian">Harga Pembelian</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              Rp
            </span>
            <Input
              type="number"
              id="harga_pembelian"
              value={formData.harga_pembelian}
              onChange={handleInputChange}
              inputMode="numeric"
              pattern="[0-9]*"
              className="pl-10 w-full"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="kondisi">Kondisi</Label>
          <Select
            value={formData.kondisi}
            options={kondisi}
            placeholder="Kondisi ac"
            onChange={(value) => handleSelectChange("kondisi", value)}
            className="w-full dark:bg-dark-900"
          />
        </div>
        <div>
          <Label htmlFor="keterangan">Keterangan</Label>
          <Input
            type="text"
            id="keterangan"
            value={formData.keterangan}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button size="md" variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button size="md" variant="outline" onClick={resetForm}>
            Reset
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
