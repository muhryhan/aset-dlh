import { useEffect } from "react";

interface AlertProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

const Alert = ({ message = "Berhasil disimpan!", duration = 2000, onClose }: AlertProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose?.(); // Tutup Alert
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-[10000000]">
      {message}
    </div>
  );
};

export default Alert;
