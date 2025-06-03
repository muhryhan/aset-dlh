import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import FileInput from "../form/input/FileInput";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import { useState } from "react";
import api from "../../../services/api";
import Alert from "../alert/Alert";

export default function KendaraanFormInput() {
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

  const kategori = [
    { value: "r2", label: "Roda 2" },
    { value: "r4", label: "Roda 4" },
    { value: "r6", label: "Roda 6" },
  ];
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

  const handleSubmit = async () => {
    const data = new FormData();

    // Append semua field dari formData ke FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        // Kalau gambar, append sebagai file
        if (key === "gambar" && value instanceof File) {
          data.append(key, value);
        } else if (typeof value === "string") {
          data.append(key, value);
        }
      }
    });

    try {
      // console.log(data);
      const response = await api.post("/api/kendaraan", data, {
        // Jangan set Content-Type, biarkan Axios atur otomatis
      });
      console.log(response);
      if (response.status != 201) throw new Error("Gagal menyimpan data");
      <Alert message="Data berhasil disimpan." />;
    } catch (err) {
      console.error("Error saat submit:", err);
      <Alert message="Gagal menyimpan data." />;
    }
  };

  return (
    <ComponentCard title="Masukkan Data Kendaraan">
      <div className="space-y-6 w-full">
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
          <Input
            type="date"
            id="pajak"
            value={formData.pajak}
            onChange={handleInputChange}
            className="w-full"
          />
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
            className="w-full dark:bg-dark-900"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button size="md" variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            size="md"
            variant="outline"
            onClick={() =>
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
              })
            }
          >
            Reset
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
