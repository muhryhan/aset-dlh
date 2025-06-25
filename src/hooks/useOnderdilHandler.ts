import { useState } from "react";

export interface OnderdilItem {
  nama_onderdil: string;
  jumlah: string;
  harga: string;
  isBerkala?: boolean;
}

export function useOnderdilHandler(initial: OnderdilItem[] = []) {
  const [onderdilList, setOnderdilList] = useState<OnderdilItem[]>(initial);

  const addEmptyOnderdil = () =>
    setOnderdilList((prev) => [
      ...prev,
      { nama_onderdil: "", jumlah: "", harga: "", isBerkala: false },
    ]);

  const removeOnderdil = (index: number) =>
    setOnderdilList((prev) => prev.filter((_, i) => i !== index));

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

  const addOnderdilBerkala = (nama: string) => {
    const already = onderdilList.some((o) => o.nama_onderdil === nama && o.isBerkala);
    if (!already) {
      setOnderdilList((prev) => [
        ...prev,
        { nama_onderdil: nama, jumlah: "1", harga: "0", isBerkala: true },
      ]);
    }
  };

  const toggleBerkala = (nama: string, checked: boolean) => {
    if (checked) {
      addOnderdilBerkala(nama);
    } else {
      setOnderdilList((prev) =>
        prev.filter((o) => !(o.nama_onderdil === nama && o.isBerkala))
      );
    }
  };

  return {
    onderdilList,
    addEmptyOnderdil,
    removeOnderdil,
    handleOnderdilChange,
    addOnderdilBerkala,
    toggleBerkala,
    setOnderdilList,
  };
}
