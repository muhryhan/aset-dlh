import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon, QRIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Nama pengguna dan kata sandi wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/api/login", { username, password });
      const { token, id_user } = response.data;

      // Simpan token ke cookie dengan opsi dasar (NOTE: masih raw; pakai httpOnly dari server jika memungkinkan)
      document.cookie = `token=${token}; path=/;`;
      document.cookie = `id_user=${id_user}; path=/;`;
      document.cookie = `username=${username}; path=/;`;

      navigate("/home");
    } catch (err) {
      console.error("Login gagal:", err);
      alert("Login gagal. Silakan cek kembali username dan kata sandi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Kembali ke beranda
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="flex justify-center mb-6">
            <Link to="/scan">
              <QRIcon className="w-40 h-40 text-gray-700 dark:text-white cursor-pointer hover:scale-105 transition-transform duration-300" />
            </Link>
          </div>

          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Masuk
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Masukkan nama pengguna dan sandi anda!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label>
                  Nama <span className="text-error-500">*</span>
                </Label>
                <Input
                  placeholder="Masukkan nama anda..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div>
                <Label>
                  Kata Sandi <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan kata sandi anda..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute z-10 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>

              <div>
                <Button
                  className="w-full"
                  size="sm"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Memproses..." : "Masuk"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}