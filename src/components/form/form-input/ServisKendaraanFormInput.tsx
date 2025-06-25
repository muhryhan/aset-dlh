import { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import FileInput from "../input/FileInput";
import Button from "../../ui/button/Button";
import Alert from "../../ui/alert/Alert";
import { CalenderIcon } from "../../../icons";
import { ServisKendaraanData } from "../../tables/Service/ServiceKendaraanTable";
import api from "../../../services/api";
interface OnderdilItem {
  nama_onderdil: string;
  jumlah: string;
  harga: string;
  isBerkala?: boolean;
}
type Props = {
  onSuccess?: () => void;
  no_polisi?: string;
  initialData?: Partial<ServisKendaraanData>;
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

export default function ServisKendaraanFormInput({
  onSuccess,
  initialData,
  no_polisi,
}: Props) {
  const isEdit = !!initialData?.id_servis;
  const [alertMessage, setAlertMessage] = useState<{
    variant: "success" | "warning" | "error" | "info";
    title?: string;
    message: string;
  } | null>(null);
  const [formData, setFormData] = useState<{
    tanggal: string;
    no_unik: string;
    nama_bengkel: string;
    biaya_servis: string;
    nota_pembayaran: File | null;
    dokumentasi: File | null;
    no_polisi: string;
  }>({
    tanggal: "",
    no_unik: "",
    nama_bengkel: "",
    biaya_servis: "",
    nota_pembayaran: null,
    dokumentasi: null,
    no_polisi: no_polisi || "",
  });
  const [onderdilList, setOnderdilList] = useState<OnderdilItem[]>([]);
  const addEmptyCustomOnderdil = () => {
    setOnderdilList((prev) => [
      ...prev,
      {
        nama_onderdil: "",
        jumlah: "",
        harga: "",
        isBerkala: false,
      },
    ]);
  };
  useEffect(() => {
    if (initialData) {
      setFormData({
        tanggal: initialData?.tanggal ? localDate(initialData.tanggal)[0] : "",
        no_unik: initialData?.no_unik ?? "",
        nama_bengkel: initialData?.nama_bengkel ?? "",
        biaya_servis: initialData?.biaya_servis?.toString() ?? "",
        nota_pembayaran: null,
        dokumentasi: null,
        no_polisi: no_polisi || "",
      });
      if (initialData.onderdil && initialData.onderdil.length > 0) {
        setOnderdilList(
          initialData.onderdil.map((item) => ({
            nama_onderdil: item.nama_onderdil,
            jumlah: item.jumlah.toString(),
            harga: item.harga.toString(),
            isBerkala: [
              "oli_mesin",
              "filter_oli_mesin",
              "oli_gardan",
              "oli_transmisi",
              "ban",
            ].includes(item.nama_onderdil),
          }))
        );
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        no_unik: no_polisi || "",
        no_polisi: no_polisi || "",
      }));
    }
  }, [initialData, no_polisi]);

  const handleDateChange = (selectedDate: Date[]) => {
    const formatted = localDate(selectedDate[0]);
    setFormData((prev) => ({
      ...prev,
      tanggal: formatted,
    }));
  };

  const addOnderdilBerkala = (nama: string) => {
    const alreadyExists = onderdilList.some(
      (item) => item.nama_onderdil === nama && item.isBerkala
    );
    if (!alreadyExists) {
      setOnderdilList((prev) => [
        ...prev,
        {
          nama_onderdil: nama,
          jumlah: "1", // default
          harga: "0", // default
          isBerkala: true,
        },
      ]);
    }
  };

  const removeOnderdil = (index: number) => {
    setOnderdilList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOnderdilChange = (
    index: number,
    field: keyof OnderdilItem,
    value: string
  ) => {
    setOnderdilList((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const numberFields = ["biaya_servis"];
    const newValue = numberFields.includes(id)
      ? value.replace(/\D/g, "")
      : value;
    setFormData((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [id]: file }));
  };

  const handleSubmit = async () => {
    setAlertMessage(null);
    const requiredFields = ["tanggal", "nama_bengkel", "biaya_servis"];
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
    if (!formData.nota_pembayaran || !formData.dokumentasi) {
      setAlertMessage({
        variant: "warning",
        title: "Validasi Gagal",
        message: "Nota pembayaran dan dokumentasi harus diunggah.",
      });
      return;
    }
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "no_polisi") return;
        if (value !== null && value !== "") {
          data.append(key, value instanceof File ? value : (value as string));
        }
      });

      const formattedOnderdil = onderdilList
        .filter(
          (item) =>
            item.nama_onderdil.trim() !== "" &&
            item.jumlah.trim() !== "" &&
            item.harga.trim() !== ""
        )
        .map((item) => ({
          nama_onderdil: item.isBerkala
            ? item.nama_onderdil.toLowerCase().replace(/\s+/g, "_")
            : item.nama_onderdil,
          jumlah: parseInt(item.jumlah),
          harga: parseInt(item.harga),
          isBerkala: item.isBerkala ?? false,
        }));

      data.append("onderdil", JSON.stringify(formattedOnderdil));

      const response = isEdit
        ? await api.put(`/api/servis/${initialData.id_servis}`, data)
        : await api.post("/api/servis", data);
      if (response.status === 200 || response.status === 201) {
        setAlertMessage({
          variant: "success",
          title: "Berhasil",
          message: response.data?.message || "Data servis berhasil disimpan.",
        });
        setTimeout(() => {
          resetForm();
          onSuccess?.();
          setAlertMessage(null);
        }, 3000);
      } else {
        console.error("Respon tidak berhasil:", response);
        setAlertMessage({
          variant: "error",
          title: "Gagal",
          message: "Terjadi kesalahan saat menyimpan data servis.",
        });
      }
    } catch (err) {
      console.error("Error submit servis:", err);
      setAlertMessage({
        variant: "error",
        title: "Gagal",
        message: "Terjadi kesalahan saat menyimpan data servis.",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      tanggal: "",
      no_unik: "",
      nama_bengkel: "",
      biaya_servis: "",
      nota_pembayaran: null,
      dokumentasi: null,
      no_polisi: "",
    });
    setOnderdilList([]);
  };

  return (
    <ComponentCard title="Form Input Servis Kendaraan">
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
          <div className="relative w-full">
            <Flatpickr
              value={formData.tanggal}
              onChange={handleDateChange}
              options={{
                dateFormat: "Y-m-d",
                appendTo:
                  typeof document !== "undefined" ? document.body : undefined,
              }}
              placeholder="Pilih tanggal"
              className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs bg-white text-gray-800 placeholder:text-gray-400 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/40 dark:border-gray-700 dark:focus:border-brand-800"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-white">
              <CalenderIcon className="size-6" />
            </span>
          </div>
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
              type="text"
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
        <Label>Onderdil Servis</Label>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            "oli_mesin",
            "filter_oli_mesin",
            "oli_gardan",
            "oli_transmisi",
            "ban",
          ].map((item) => (
            <div key={item} className="flex items-center">
              <input
                type="checkbox"
                id={item}
                onChange={(e) => {
                  if (e.target.checked) {
                    addOnderdilBerkala(item);
                  } else {
                    setOnderdilList((prev) =>
                      prev.filter(
                        (od) => !(od.nama_onderdil === item && od.isBerkala)
                      )
                    );
                  }
                }}
                checked={onderdilList.some(
                  (od) => od.nama_onderdil === item && od.isBerkala
                )}
                className="form-checkbox text-brand-600 dark:bg-gray-700 h-5 w-5 mr-2"
              />

              <label
                htmlFor={item}
                className="text-sm font-medium text-gray-700 dark:text-white"
              >
                {item.replace(/_/g, " ")}
              </label>
            </div>
          ))}
        </div>
        <Button
          onClick={addEmptyCustomOnderdil}
          variant="primary"
          className="mb-2"
        >
          Tambah Onderdil Lainnya
        </Button>
        {onderdilList.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium">Daftar Onderdil</h3>
            {onderdilList.map((item, index) => (
              <div
                key={index}
                className="border p-3 rounded-lg grid grid-cols-4 gap-4 items-center"
              >
                <div>
                  <Label>Nama</Label>
                  <Input
                    value={item.nama_onderdil}
                    onChange={(e) =>
                      handleOnderdilChange(
                        index,
                        "nama_onderdil",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <Label>Jumlah</Label>
                  <Input
                    type="number"
                    value={item.jumlah}
                    onChange={(e) =>
                      handleOnderdilChange(index, "jumlah", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Harga</Label>
                  <Input
                    type="number"
                    value={item.harga}
                    onChange={(e) =>
                      handleOnderdilChange(index, "harga", e.target.value)
                    }
                  />
                </div>
                <Button
                  onClick={() => removeOnderdil(index)}
                  variant="danger"
                  className="mb-2"
                >
                  Hapus
                </Button>
              </div>
            ))}
          </div>
        )}
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
