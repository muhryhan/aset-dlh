import { useState } from "react";

import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import FileInput from "../form/input/FileInput";
import Button from "../ui/button/Button";
import Alert from "../ui/alert/Alert";
import Checkbox from "../form/input/Checkbox";

import api from "../../../services/api";

interface OnderdilItem {
  nama_onderdil: string;
  jumlah: string;
  harga: string;
}

interface SelectedItemState {
  [key: string]: boolean;
}

type Props = {
  onSuccess?: () => void;
  no_polisi?: string;
};

function formatNumberWithDots(value: string): string {
  const raw = value.replace(/\D/g, "");
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function ServisKendaraanFormInput({
  onSuccess,
  no_polisi,
}: Props) {
  const [formData, setFormData] = useState({
    tanggal: "",
    no_unik: no_polisi,
    nama_bengkel: "",
    biaya_servis: "",
    nota_pembayaran: null as File | null,
    dokumentasi: null as File | null,
  });

  const [onderdilList, setOnderdilList] = useState<OnderdilItem[]>([]);

  const [selectedItems, setSelectedItems] = useState<SelectedItemState>({
    oliMesin: false,
    filterOliMesin: false,
    oliGardan: false,
    oliTransmisi: false,
    ban: false,
    tambahOnderdil: false,
  });

  const [alertMessage, setAlertMessage] = useState<{
    variant: "success" | "warning" | "error" | "info";
    title?: string;
    message: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "biaya_servis" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [id]: file }));
  };

  const handleCheckboxChange = (key: string) => {
    const newSelected = !selectedItems[key];
    setSelectedItems((prev) => ({ ...prev, [key]: newSelected }));

    const formattedName = key.replace(/([A-Z])/g, " $1").trim();
    if (newSelected) {
      setOnderdilList((prev) => [
        ...prev,
        { nama_onderdil: formattedName, jumlah: "", harga: "" },
      ]);
    } else {
      setOnderdilList((prev) =>
        prev.filter((item) => item.nama_onderdil !== formattedName)
      );
    }
  };

  const handleOnderdilChange = (
    index: number,
    field: keyof OnderdilItem,
    value: string
  ) => {
    const rawValue = value.replace(/\D/g, "");
    setOnderdilList((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: field === "harga" || field === "jumlah" ? rawValue : value,
      };
      return updated;
    });
  };

  const resetForm = () => {
    setFormData({
      no_unik: "",
      tanggal: "",
      nama_bengkel: "",
      biaya_servis: "",
      nota_pembayaran: null,
      dokumentasi: null,
    });
    setOnderdilList([]);
    setSelectedItems({
      oliMesin: false,
      filterOliMesin: false,
      oliGardan: false,
      oliTransmisi: false,
      ban: false,
      tambahOnderdil: false,
    });
  };

  const handleSubmit = async () => {
    setAlertMessage(null);
    const requiredFields = ["tanggal", "nama_bengkel", "biaya_servis"];
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        return setAlertMessage({
          variant: "warning",
          title: "Validasi Gagal",
          message: `Field ${field.replace("_", " ")} tidak boleh kosong`,
        });
      }
    }

    if (!formData.nota_pembayaran || !formData.dokumentasi) {
      return setAlertMessage({
        variant: "warning",
        title: "Validasi Gagal",
        message: "Nota pembayaran dan dokumentasi harus diunggah.",
      });
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    data.append(
      "onderdil",
      JSON.stringify(
        onderdilList.map((item) => ({
          ...item,
          jumlah: parseInt(item.jumlah || "0"),
          harga: parseInt(item.harga || "0"),
        }))
      )
    );

    try {
      const response = await api.post("/api/servis", data);
      if (response.status !== 200)
        throw new Error("Gagal menyimpan data servis");

      setAlertMessage({
        variant: "success",
        title: "Berhasil",
        message: response.data.message || "Data servis berhasil disimpan.",
      });

      setTimeout(() => {
        resetForm();
        onSuccess?.();
        setAlertMessage(null);
      }, 3000);
    } catch (err) {
      console.error("Error submit servis:", err);
      setAlertMessage({
        variant: "error",
        title: "Gagal",
        message: "Terjadi kesalahan saat menyimpan data servis.",
      });
    }
  };

  return (
    <ComponentCard title="Form Input Servis Kendaraan">
      {alertMessage && (
        <Alert
          variant={alertMessage.variant}
          title={alertMessage.title}
          message={alertMessage.message}
          onClose={() => setAlertMessage(null)}
        />
      )}
      <div className="space-y-6 w-full">
        <div>
          <Label htmlFor="no_unik">Nomor Polisi</Label>
          <Input
            id="no_unik"
            value={formData.no_unik}
            className="w-full"
            disabled
          />
        </div>
        <div>
          <Label htmlFor="tanggal">Tanggal Servis</Label>
          <Input
            type="date"
            id="tanggal"
            value={formData.tanggal}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="nama_bengkel">Nama Bengkel</Label>
          <Input
            type="text"
            id="nama_bengkel"
            value={formData.nama_bengkel}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="biaya_servis">Biaya Servis (Rp)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500">
              Rp
            </span>
            <Input
              type="number"
              id="biaya_servis"
              value={formatNumberWithDots(formData.biaya_servis)}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={handleInputChange}
              className="pl-10 w-full"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="nota_pembayaran">Nota Pembayaran</Label>
          <FileInput
            id_file="nota_pembayaran"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="dokumentasi">Dokumentasi</Label>
          <FileInput
            id_file="dokumentasi"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <Label>Checklist Onderdil</Label>
        {[
          { label: "Oli Mesin", key: "oliMesin" },
          { label: "Filter Oli Mesin", key: "filterOliMesin" },
          { label: "Oli Gardan", key: "oliGardan" },
          { label: "Oli Transmisi", key: "oliTransmisi" },
          { label: "Ban", key: "ban" },
          { label: "Tambah Onderdil", key: "tambahOnderdil" },
        ].map((item) => (
          <Checkbox
            key={item.key}
            id={item.key}
            label={item.label}
            checked={selectedItems[item.key]}
            onChange={() => handleCheckboxChange(item.key)}
          />
        ))}

        {onderdilList.map((item, index) => (
          <div key={index} className="border p-3 rounded mb-4">
            <Label>Onderdil {index + 1}</Label>
            <div className="space-y-2">
              <div>
                <Label htmlFor="nama_onderdil"> Nama Onderdil </Label>
                <Input
                  type="text"
                  id="nama_onderdil"
                  placeholder="Nama Onderdil"
                  onFocus={(e) => e.target.select()}
                  value={item.nama_onderdil}
                  onChange={(e) =>
                    handleOnderdilChange(index, "nama_onderdil", e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="jumlah">Jumlah</Label>
                <Input
                  type="number"
                  id="jumlah"
                  placeholder="Jumlah"
                  min="0"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={item.jumlah}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) =>
                    handleOnderdilChange(index, "jumlah", e.target.value)
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="harga">Harga</Label>
                <Input
                  type="text"
                  id="harga"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Harga"
                  value={formatNumberWithDots(item.harga)}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) =>
                    handleOnderdilChange(index, "harga", e.target.value)
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        ))}

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
