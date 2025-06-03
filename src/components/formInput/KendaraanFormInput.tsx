import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import FileInput from "../form/input/FileInput";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import { useState } from "react";
import api from "../../../services/api";

export default function KendaraanFormInput() {
  const [formData, setFormData] = useState({
    merek: "",
    nomorPolisi: "",
    nomorMesin: "",
    nomorRangka: "",
    warna: "",
    hargaPembelian: "",
    tahunPembuatan: "",
    kategori: "",
    pajak: "",
    pemegang: "",
    nik: "",
    penggunaan: "",
    kondisi: "",
    gambar: null as File | null,
  });

  const kategori = [
    { value: "r2", label: "Roda 2" },
    { value: "r4", label: "Roda 4" },
    { value: "r6", label: "Roda 6" },
  ];
  const kondisi = [
    { value: "b", label: "Baik" },
    { value: "rr", label: "Rusak ringan" },
    { value: "rb", label: "Rusak berat" },
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
    // const url = "/api/kendaraan"; // url sementara

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value as string | Blob);
    });

    try {
      console.log(data);
      const response = await api.post("/api/kendaraan", data);
      if (response.status != 200) throw new Error("Gagal menyimpan data");
      alert("Data berhasil dikirim!");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  return (
    <ComponentCard title="Masukkan Data Kendaraan">
      <div className="space-y-6 w-full">
        <div>
          <Label htmlFor="gambar">Upload file</Label>
          <FileInput onChange={handleFileChange} className="w-full" />
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
          <Input type="text" id="nopol" className="w-full" />
        </div>

        <div>
          <Label htmlFor="no_mesin">Nomor Mesin</Label>
          <Input type="text" id="nomesin" className="w-full" />
        </div>

        <div>
          <Label htmlFor="no_rangka">Nomor Rangka</Label>
          <Input type="text" id="norangka" className="w-full" />
        </div>

        <div>
          <Label htmlFor="warna">Warna</Label>
          <Input type="text" id="warna" className="w-full" />
        </div>

        <div>
          <Label htmlFor="harga_pembelian">Harga Pembelian</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              Rp
            </span>
            <Input
              type="number"
              id="harga"
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
            id="tahun"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="kategori">Kategori</Label>
          <Select
            options={kategori}
            placeholder="Kategori kendaraan"
            onChange={(value) => handleSelectChange("kategori", value)}
            className="w-full dark:bg-dark-900"
          />
        </div>

        <div>
          <Label htmlFor="pajak">Pajak</Label>
          <Input type="date" id="pajak" className="w-full" />
        </div>

        <div>
          <Label htmlFor="pemegang">Pemegang</Label>
          <Input type="text" id="pemegang" className="w-full" />
        </div>

        <div>
          <Label htmlFor="nik">NIK</Label>
          <Input
            type="number"
            id="nik"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="penggunaan">Penggunaan</Label>
          <Input type="text" id="penggunaan" className="w-full" />
        </div>

        <div>
          <Label htmlFor="kondisi">Kondisi</Label>
          <Select
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
            onClick={() => console.log("Outline small clicked")}
          >
            Reset
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
