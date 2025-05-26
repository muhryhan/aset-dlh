import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type Tumbuhan = {
  id: number;
  gambar: string;
  nama: string;
  jenis: string;
  stok: number;
  keterangan: string;
};

const FormDisableTumbuhan: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tumbuhan, setTumbuhan] = useState<Tumbuhan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Tumbuhan>(`/api/tumbuhan/${id}`);
        setTumbuhan(response.data);
      } catch{
        setError("Gagal mengambil data tumbuhan.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) return <p>Memuat data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full mx-auto p-6 bg-white rounded shadow">
      <form className="flex flex-col gap-6 w-full">
        <InputField label="Nama" value={tumbuhan?.nama} />
        <InputField label="Jenis" value={tumbuhan?.jenis} />
        <InputField label="Stok" value={String(tumbuhan?.stok ?? "")} />
        <InputField label="Keterangan" value={tumbuhan?.keterangan} />
      </form>
    </div>
  );
};

export default FormDisableTumbuhan;

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
      value={value ?? ""}
      disabled
      className="w-full border border-gray-300 rounded-md shadow-sm bg-gray-100 p-2"
    />
  </div>
);