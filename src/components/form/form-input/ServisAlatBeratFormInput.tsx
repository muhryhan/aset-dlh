import { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Button from "../../ui/button/Button";
import Checkbox from "../input/Checkbox";

export default function ServisAlatBeratFormInput() {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    oliMesin: false,
    filterOliMesin: false,
  });

  const [nomorRegistrasi, setNomorRegistrasi] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/alat-berat/123");
      const data = await res.json();
      setNomorRegistrasi(data.nomorRegistrasi);
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (item: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleOnlyNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value;
  };

  const handleSubmit = () => {
    const result = Object.entries(selectedItems)
      .filter(([, selected]) => selected)
      .map(([key]) => ({
        item: key,
      }));
    console.log(result);
  };

  return (
    <ComponentCard title="Masukkan Data Servis Alat Berat">
      <div className="space-y-6 w-full">
        <div>
          <Label htmlFor="no_registrasi">Nomor Registrasi</Label>
          <Input
            type="text"
            id="noregis"
            className="w-full"
            value={nomorRegistrasi}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="merek">Merek</Label>
          <Input
            type="text"
            id="merek"
            className="w-full"
            value={nomorRegistrasi}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="tanggal">Tanggal</Label>
          <Input type="date" id="tanggal" className="w-full" />
        </div>
        <div>
          <Label htmlFor="nama_bengkel">Nama Bengkel</Label>
          <Input type="text" id="nama_bengkel" className="w-full" />
        </div>
        <div>
          <Label htmlFor="biaya_servis">Biaya Servis</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500">
              Rp
            </span>
            <Input
              type="text"
              id="biaya_servis"
              className="pl-10 w-full" // tambahkan padding-left agar teks tidak menimpa Rp
              inputMode="numeric"
              pattern="[0-9]*"
              onInput={handleOnlyNumber}
            />
          </div>
        </div>

        {/* Dynamic Checkbox Group */}
        {[
          { label: "Oli Mesin", key: "oliMesin" },
          { label: "Filter Oli Mesin", key: "filterOliMesin" },
        ].map((item) => (
          <div key={item.key}>
            <Checkbox
              id={item.key}
              label={item.label}
              checked={selectedItems[item.key]}
              onChange={() => handleCheckboxChange(item.key)}
            />
            {selectedItems[item.key] && (
              <div className="ml-6 mt-2 space-y-2">
                <div>
                  <Label htmlFor={`${item.key}-nama`}>Nama</Label>
                  <Input
                    type="text"
                    id={`${item.key}-nama`}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor={`${item.key}-jumlah`}>Jumlah</Label>
                  <Input
                    type="number"
                    id={`${item.key}-jumlah`}
                    className="w-full"
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor={`${item.key}-harga`}>Harga</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      Rp
                    </span>
                    <Input
                      type="text"
                      id={`${item.key}-harga`}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="pl-10 w-full"
                      onInput={handleOnlyNumber}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-end space-x-4">
          <Button size="md" variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            size="md"
            variant="outline"
            onClick={() => console.log("Reset clicked")}
          >
            Reset
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
