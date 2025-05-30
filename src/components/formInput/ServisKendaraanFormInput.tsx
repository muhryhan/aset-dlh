import { useState, useEffect } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import Checkbox from "../form/input/Checkbox";

export default function ServisKendaraanFormInput() {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    oliMesin: false,
    filterOliMesin: false,
    oliGardan: false,
    oliTransmisi: false,
    ban: false,
    tambahOnderdil: false,
  });

  const [nomorPolisi, setNomorPolisi] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/kendaraan/123");
      const data = await res.json();
      setNomorPolisi(data.nomorPolisi);
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
    <ComponentCard title="Masukkan Data Servis Kendaraan">
      <div className="space-y-6 w-full">
        <div>
          <Label htmlFor="no_polisi">Nomor Polisi</Label>
          <Input
            type="text"
            id="no_polisi"
            className="w-full"
            value={nomorPolisi}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="kategori">Kategori</Label>
          <Input
            type="text"
            id="kategori"
            className="w-full"
            value={nomorPolisi}
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

        {[
          { label: "Oli Mesin", key: "oliMesin" },
          { label: "Filter Oli Mesin", key: "filterOliMesin" },
          { label: "Oli Gardan", key: "oliGardan" },
          { label: "Oli Transmisi", key: "oliTransmisi" },
          { label: "Ban", key: "ban" },
          { label: "Tambah Onderdil", key: "tambahOnderdil" },
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
