import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type ServisKendaraan = {
  id: number;
  qrCode: string;
  gambar: string;
  merek: string;
  nomorPolisi: string;
  nomorMesin: string;
  nomorRangka: string;
  warna: string;
  hargaPembelian: number;
  tahunPembuatan: string;
  kategori: string;
  pajak: string;
  pemegang: string;
  nik: string;
  penggunaan: string;
  kondisi: string;
};

const FormDisableKendaraan: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [servis, setServis] = useState<ServisKendaraan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/kendaraan-servis/${id}`);
        setServis(response.data);
      } catch {
        setError("Gagal mengambil data servis kendaraan.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Memuat data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full mx-auto p-6 bg-white rounded shadow">
      <form className="flex flex-col gap-6 w-full">
        <InputField label="Merek" value={servis?.merek} />
        <InputField label="Nomor Polisi" value={servis?.nomorPolisi} />
        <InputField label="Nomor Mesin" value={servis?.nomorMesin} />
        <InputField label="Nomor Rangka" value={servis?.nomorRangka} />
        <InputField label="Warna" value={servis?.warna} />
        <InputField
          label="Harga Pembelian"
          value={servis?.hargaPembelian?.toString()}
        />
        <InputField label="Tahun Pembuatan" value={servis?.tahunPembuatan} />
        <InputField label="Kategori" value={servis?.kategori} />
        <InputField label="Pajak" value={servis?.pajak} />
        <InputField label="Pemegang" value={servis?.pemegang} />
        <InputField label="NIK" value={servis?.nik} />
        <InputField label="Penggunaan" value={servis?.penggunaan} />
        <InputField label="Kondisi" value={servis?.kondisi} />
      </form>
    </div>
  );
};

export default FormDisableKendaraan;

// Komponen input field dinamis
type InputFieldProps = {
  label: string;
  value?: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, value }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      value={value}
      disabled
      className="w-full border border-gray-300 rounded-md shadow-sm bg-gray-100 p-2"
    />
  </div>
);
