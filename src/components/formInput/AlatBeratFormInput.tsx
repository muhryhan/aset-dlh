import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import FileInput from "../form/input/FileInput";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import { useState } from "react";
import api from "../../../services/api";
import Alert from "../alert/Alert";

type Props = {
  onSuccess?: () => void;
};

export default function AlatBeratFormInput({ onSuccess }: Props) {
  const [formData, setFormData] = useState({
    qrcode: "",
    gambar: null as File | null,
    merek: "",
    no_registrasi: "",
    no_mesin: "",
    no_rangka: "",
    warna: "",
    harga_pembelian: "",
    tahun_pembuatan: "",
    kategori: "",
    pajak: "",
    penggunaan: "",
    kondisi: "",
  });

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const kondisi = [
    { value: "Baik", label: "Baik" },
    { value: "Rusak Ringan", label: "Rusak ringan" },
    { value: "Rusak Berat", label: "Rusak berat" },
  ];

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, gambar: file }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const resetForm = () => {
    setFormData({
      qrcode: "",
      gambar: null,
      merek: "",
      no_registrasi: "",
      no_mesin: "",
      no_rangka: "",
      warna: "",
      harga_pembelian: "",
      tahun_pembuatan: "",
      kategori: "",
      pajak: "",
      penggunaan: "",
      kondisi: "",
    });
  };

  const handleSubmit = async () => {
    const data = new FormData();

    // Append semua field dari formData ke FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        if (key === "gambar" && value instanceof File) {
          data.append(key, value);
        } else if (typeof value === "string") {
          data.append(key, value);
        }
      }
    });

    try {
      const response = await api.post("/api/alatberat", data);
      console.log(response);
      if (response.status != 201) throw new Error("Gagal menyimpan data");
      setAlertMessage(response.data.message);

      if (onSuccess) onSuccess();

      resetForm();
    } catch (err) {
      console.error("Error saat submit:", err);
      setAlertMessage("Gagal menyimpan data");
    }
  };

  return (
    <ComponentCard title="Masukkan Data Alat Berat">
      <div className="space-y-6 w-full">
        {alertMessage && <Alert message={alertMessage} />}
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
          <Input
            type="text"
            id="kategori"
            value={formData.kategori}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="pajak">Pajak</Label>
          <Input
            type="date"
            id="pajak"
            value={formData.pajak}
            onChange={handleInputChange}
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
            className="w-full dark:bg-dark-900"
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
