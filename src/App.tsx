import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserList";
import Calendar from "./pages/Calendar";
import Blank from "./pages/OtherPage/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import ProtectedRoute from "./routes/protectedRoute";
import Home from "./pages/Dashboard/Home";
import Kendaraan from "./pages/Kendaraan";
import AlatBerat from "./pages/AlatBerat";
import AlatKerja from "./pages/AlatKerja";
import Ac from "./pages/Ac";
import Tumbuhan from "./pages/Tumbuhan";
import DistribusiTumbuhan from "./pages/DistTumbuhan/DistribusiTumbuhan";
import ServiceKendaraan from "./pages/Service/ServiceKendaraan";
import ServiceAlatBerat from "./pages/Service/ServiceAlatBerat";
import ServiceAlatKerja from "./pages/Service/ServiceAlatKerja";
import ServiceAc from "./pages/Service/ServiceAc";
import SerberKendaraan from "./pages/ServiceBerkala/SerberKendaraan";
import SerberAlatBerat from "./pages/ServiceBerkala/SerberAlatBerat";
import SerberAlatKerja from "./pages/ServiceBerkala/SerberAlatKerja";
import SerberAc from "./pages/ServiceBerkala/SerberAc";
import TamanKota from "./pages/TamanKota";
import TPUKota from "./pages/TPU";
import ScanPage from "./pages/ScanQrCode/ScanPage";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Auth Page (Login) */}
        <Route path="/" element={<SignIn />} />

        {/* Protected Pages with Layout */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard & Home */}
          <Route path="/home" element={<Home />} />

          {/* User and Calendar */}
          <Route path="/user-list" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />

          {/* Asset Pages */}
          <Route path="/kendaraan" element={<Kendaraan />} />
          <Route path="/alat-berat" element={<AlatBerat />} />
          <Route path="/alat-kerja" element={<AlatKerja />} />
          <Route path="/ac" element={<Ac />} />
          <Route path="/taman-kota" element={<TamanKota />} />
          <Route path="/tpu" element={<TPUKota />} />

          {/* Tumbuhan */}
          <Route path="/tumbuhan" element={<Tumbuhan />} />
          <Route
            path="/distribusi-tumbuhan/:id"
            element={<DistribusiTumbuhan />}
          />

          {/* Service Pages */}
          <Route
            path="/servis/kendaraan/nounik/:no_polisi"
            element={<ServiceKendaraan />}
          />
          <Route
            path="/servis/alatberat/nounik/:no_registrasi"
            element={<ServiceAlatBerat />}
          />
          <Route
            path="/servis/alatkerja/nounik/:no_registrasi"
            element={<ServiceAlatKerja />}
          />
          <Route path="/servis/ac/nounik/:no_registrasi" element={<ServiceAc />} />

          {/* Periodic Services */}
          <Route path="/servis-berkala-kendaraan" element={<SerberKendaraan />} />
          <Route path="/servis-berkala-alat-berat" element={<SerberAlatBerat />} />
          <Route path="/servis-berkala-alat-kerja" element={<SerberAlatKerja />} />
          <Route path="/servis-berkala-ac" element={<SerberAc />} />

          {/* Scan */}
        </Route>

        <Route path="/scan" element={<ScanPage />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
