import { useKendaraanForm } from "../../../hooks/useKendaraanForm";
import ComponentCard from "../../common/ComponentCard";
import Alert from "../../ui/alert/Alert";
import Input from "../input/InputField";
import Select from "../Select";
import FileInput from "../input/FileInput";
import Button from "../../ui/button/Button";
import Flatpickr from "react-flatpickr";
import Label from "../Label";
import { CalenderIcon } from "../../../icons";
import { formatNumberWithDots } from "../../../utils/numberUtils";
import { KendaraanData } from "../../../types/kendaraan";

type Props = {
  initialData?: Partial<KendaraanData>;
  onSuccess?: () => void;
};

export default function KendaraanFormInput({ initialData, onSuccess }: Props) {
  const {
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
  } = useKendaraanForm(initialData, onSuccess);

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

  return (
    <ComponentCard title="Masukkan Data Kendaraan">
      <div className="space-y-6 w-full">
        {alertMessage && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1/2 z-99">
            <Alert
              {...alertMessage}
              autoClose
              duration={2000}
              onClose={() => setAlertMessage(null)}
            />
          </div>
        )}

        <Label htmlFor="gambar">Upload file</Label>
        <FileInput
          id_file="gambar"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="w-full"
        />

        <Label htmlFor="merek">Merek</Label>
        <Input
          type="text"
          id="merek"
          value={formData.merek}
          onChange={handleInputChange}
          className="w-full"
        />

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
            pattern="[0-9]*"
            className="pl-10 w-full"
          />
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

        <Label htmlFor="kategori">Kategori</Label>
        <Select
          value={formData.kategori}
          options={kategori}
          placeholder="Pilih kategori kendaraan"
          onChange={(val) => handleSelectChange("kategori", val)}
          className="w-full dark:bg-dark-900"
        />

        <Label htmlFor="pajak">Pajak</Label>
        <div className="relative w-full flatpickr-wrapper">
          <Flatpickr
            value={formData.pajak}
            onChange={handleDateChange}
            options={{ dateFormat: "Y-m-d" }}
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
            type="text"
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

        <Label htmlFor="kondisi">Kondisi</Label>
        <Select
          value={formData.kondisi}
          options={kondisi}
          placeholder="Pilih kondisi kendaraan"
          onChange={(val) => handleSelectChange("kondisi", val)}
          className="w-full"
        />

        <div className="flex justify-end space-x-4">
          <Button
            size="md"
            onClick={handleSubmit}
            variant={isEdit ? "warning" : "primary"}
          >
            {isEdit ? "Update" : "Submit"}
          </Button>
          <Button size="md" onClick={resetForm} variant="outline">
            Reset
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
