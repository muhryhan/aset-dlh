import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import FileInput from "../form/input/FileInput";
import Button from "../ui/button/Button";

export default function TumbuhanFormInput() {
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
    <ComponentCard title="Masukkan Data Tumbuhan">
      <div className="space-y-6 w-full">
        <div>
          <Label htmlFor="gambar">Upload file</Label>
          <FileInput onChange={handleFileChange} className="w-full" />
        </div>

        <div>
          <Label htmlFor="nama">Nama</Label>
          <Input type="text" id="nama" className="w-full" />
        </div>

        <div>
          <Label htmlFor="jenis">Jenis</Label>
          <Input type="text" id="jenis" className="w-full" />
        </div>

        <div>
          <Label htmlFor="tumbuhan_masuk">Tumbuhan Masuk</Label>
          <Input
            type="text"
            id="tumbuhan_masuk"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full"
            onInput={handleOnlyNumber}
          />
        </div>

        <div>
          <Label htmlFor="tumbuhan_kelur">Tumbuhan Keluar</Label>
          <Input
            type="text"
            id="tumbuhan_keluar"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-full"
            onInput={handleOnlyNumber}
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
