import ServisKendaraanFormInput from "../../components/formInput/ServisKendaraanFormInput";
import PageMeta from "../../components/common/PageMeta";
import { FaTimes } from "react-icons/fa";

interface ServisKendaraanInputModalProps {
  onClose: () => void;
  no_polisi?: string;
}

export default function ServisKendaraanInputModal({
  onClose,
  no_polisi,
}: ServisKendaraanInputModalProps) {
  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 p-4">
      <PageMeta
        title="Input Data Servis Kendaraan"
        description="Halaman Input Data Servis Kendaraan"
      />

      {/* Modal box */}
      <div className="relative bg-white dark:bg-dark-800 rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="flex justify-end p-3">
          <button onClick={onClose} aria-label="Tutup Modal">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 pb-6">
          <ServisKendaraanFormInput no_polisi={no_polisi} />
        </div>
      </div>
    </div>
  );
}
