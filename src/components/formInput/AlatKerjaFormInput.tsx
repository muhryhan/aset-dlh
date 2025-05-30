import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import FileInput from "../form/input/FileInput";
import Select from "../form/Select";
import Button from "../ui/button/Button";

export default function AlatKerjaFormInput() {
  const kondisi = [
    { value: "b", label: "Baik" },
    { value: "rr", label: "Rusak ringan" },
    { value: "rb", label: "Rusak berat" },
  ];

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const handleOnlyNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value;
  };

  return (
    <ComponentCard title="Masukkan Data Alat Kerja">
      <div className="space-y-6 w-full">
        <div>
          <Label htmlFor="gambar">Upload file</Label>
          <FileInput onChange={handleFileChange} className="w-full" />
        </div>

        <div>
          <Label htmlFor="merek">Merek</Label>
          <Input type="text" id="merek" className="w-full" />
        </div>

        <div>
          <Label htmlFor="no_registrasi">Nomor Registrasi</Label>
          <Input type="text" id="noreg" className="w-full" />
        </div>

        <div>
          <Label htmlFor="no_serial">Nomor Serial</Label>
          <Input type="text" id="nomesin" className="w-full" />
        </div>

        <div>
          <Label htmlFor="asal">Asal</Label>
          <Input type="text" id="norangka" className="w-full" />
        </div>

        <div>
          <Label htmlFor="tahun_pembelian">Tahun Pembelian</Label>
          <Input
            type="text"
            id="tahun"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full"
            onInput={handleOnlyNumber}
          />
        </div>

        <div>
          <Label htmlFor="harga_pembelian">Harga Pembelian</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              Rp
            </span>
            <Input
              type="text"
              id="harga"
              inputMode="numeric"
              pattern="[0-9]*"
              className="pl-10 w-full"
              onInput={handleOnlyNumber}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="kondisi">Kondisi</Label>
          <Select
            options={kondisi}
            placeholder="Kondisi kendaraan"
            onChange={handleSelectChange}
            className="w-full dark:bg-dark-900"
          />
        </div>
        <div>
          <Label htmlFor="keterangan">Keterangan</Label>
          <Input type="text" id="keterangan" className="w-full" />
        </div>
        <div className="flex justify-end space-x-4">
          <Button size="md" variant="primary" onClick={() => alert("Clicked!")}>
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
