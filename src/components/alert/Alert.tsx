import { useEffect } from "react";

const Alert = ({ message = "Berhasil disimpan!", duration = 2000 }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.history.back(); // Kembali ke halaman sebelumnya
      setTimeout(() => {
        window.location.reload(); // Refresh halaman
      }, 100);
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration]);

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-9999999999999999">
      {message}
    </div>
  );
};

export default Alert;
