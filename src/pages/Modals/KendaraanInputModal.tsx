import KendaraanFormInput from "../../components/formInput/KendaraanFormInput";
import PageMeta from "../../components/common/PageMeta";
import { FaTimes } from "react-icons/fa";

type KendaraanInputModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function KendaraanInputModal({
  isOpen, onClose, onSuccess
}: KendaraanInputModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 p-4">
      <PageMeta
        title="Input Data Kendaraan"
        description="Halaman Input Data Kendaraan"
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
          <KendaraanFormInput onSuccess={onSuccess} />
        </div>
      </div>
    </div>
  );
}
