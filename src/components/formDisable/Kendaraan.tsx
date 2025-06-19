import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

type Kendaraan = {
  id_kendaraan: number;
  qrcode: string;
  gambar: string;
  merek: string;
  no_polisi: string;
  no_mesin: string;
  no_rangka: string;
  warna: string;
  harga_pembelian: number;
  tahun_pembuatan: number;
  kategori: string;
  pajak: string;
  pemegang: string;
  nik: number;
  penggunaan: string;
  kondisi: string;
};

const FormDisableKendaraan: React.FC = () => {
  const { no_polisi } = useParams<{ no_polisi: string }>();

  const [kendaraan, setKendaraan] = useState<Kendaraan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!no_polisi) {
      setError("Nomor Polisi tidak ditemukan di URL.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const responseKendaraan = await api.get(`/api/kendaraan/${no_polisi}`);
        const kendaraan = responseKendaraan?.data?.data;
        // console.log("Kendaraan", kendaraan);
        if (kendaraan) {
          setKendaraan(kendaraan);
        } else {
          setError("Data Servis tidak ditemukan.");
        }
      } catch (err) {
        console.error("Gagal mengambil data servis kendaraan:", err);
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [no_polisi]);

  if (loading) return <p>Memuat data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!kendaraan) return <p>Data kendaraan tidak tersedia.</p>;

  return (
    <div className="w-full mx-auto p-6 bg-white rounded shadow">
      <form className="flex flex-col gap-6 w-full">
        <InputField label="Merek" value={kendaraan.merek} />
        <InputField label="Nomor Polisi" value={kendaraan.no_polisi} />
        <InputField label="Nomor Mesin" value={kendaraan.no_mesin} />
        <InputField label="Nomor Rangka" value={kendaraan.no_rangka} />
        <InputField label="Warna" value={kendaraan.warna} />
        <InputField
          label="Harga Pembelian"
          value={kendaraan.harga_pembelian?.toLocaleString("id-ID")}
        />
        <InputField
          label="Tahun Pembuatan"
          value={kendaraan.tahun_pembuatan?.toString() ?? "-"}
        />
        <InputField label="Kategori" value={kendaraan.kategori} />
        <InputField label="Pajak" value={kendaraan.pajak || "-"} />
        <InputField label="Pemegang" value={kendaraan.pemegang} />
        <InputField
          label="NIK"
          value={kendaraan.nik ? kendaraan.nik.toString() : "-"}
        />
        <InputField label="Penggunaan" value={kendaraan.penggunaan} />
        <InputField label="Kondisi" value={kendaraan.kondisi} />
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
      value={value || "-"}
      disabled
      className="w-full border border-gray-300 rounded-md shadow-sm bg-gray-100 p-2"
    />
  </div>
);
