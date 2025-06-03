import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import FileInput from "../form/input/FileInput";
import Button from "../ui/button/Button";
import { useState } from "react";
import api from "../../../services/api";
import Alert from "../alert/Alert";

type Props = {
  onSuccess?: () => void;
};

export default function TumbuhanFormInput({ onSuccess }: Props) {
  const [formData, setFormData] = useState({
    gambar: null as File | null,
    nama: "",
    jenis: "",
    stok: "",
    keterangan: "",
  });

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

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
      gambar: null,
      nama: "",
      jenis: "",
      stok: "",
      keterangan: "",
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
      const response = await api.post("/api/tanaman", data);
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
    <ComponentCard title="Masukkan Data Tumbuhan">
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
          <Label htmlFor="nama">Nama</Label>
          <Input
            type="text"
            id="nama"
            value={formData.nama}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="jenis">Jenis</Label>
          <Input
            type="text"
            id="jenis"
            value={formData.jenis}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="stok">Stok</Label>
          <Input
            type="number"
            id="stok"
            value={formData.stok}
            onChange={handleInputChange}
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full"
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
