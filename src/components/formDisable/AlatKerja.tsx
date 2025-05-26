import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type ServisAlatKerja = {
  id: number;
  qrCode: string;
  gambar: string;
  merek: string;
  noRegistrasi: string;
  noSerial: string;
  asal: string;
  tahunPembelian: string;
  hargaPembelian: number;
  kondisi: string;
  keterangan: string;
};

const FormDisableAlatKerja: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [servis, setServis] = useState<ServisAlatKerja | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/alatkerja-servis/${id}`);
        setServis(response.data);
      } catch {
        setError("Gagal mengambil data servis alat kerja.");
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
        <InputField label="No Registrasi" value={servis?.noRegistrasi} />
        <InputField label="No Serial" value={servis?.noSerial} />
        <InputField label="Asal" value={servis?.asal} />
        <InputField label="Tahun Pembelian" value={servis?.tahunPembelian} />
        <InputField
          label="Harga Pembelian"
          value={servis?.hargaPembelian?.toLocaleString("id-ID")}
        />
        <InputField label="Kondisi" value={servis?.kondisi} />
        <InputField label="Keterangan" value={servis?.keterangan} />
      </form>
    </div>
  );
};

export default FormDisableAlatKerja;

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
      value={value || ""}
      disabled
      className="w-full border border-gray-300 rounded-md shadow-sm bg-gray-100 p-2"
    />
  </div>
);