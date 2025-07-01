import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserList from "./pages/UserList";
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
import Tanaman from "./pages/Tanaman";
import DistribusiTanaman from "./pages/DistTanaman/DistribusiTanaman";
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
          {/* Dashboard & Utility */}
          <Route path="/home" element={<Home />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />

          {/* Asset Pages */}
          <Route path="/kendaraan" element={<Kendaraan />} />
          <Route path="/alat-berat" element={<AlatBerat />} />
          <Route path="/alat-kerja" element={<AlatKerja />} />
          <Route path="/ac" element={<Ac />} />
          <Route path="/tanaman" element={<Tanaman />} />
          <Route path="/taman-kota" element={<TamanKota />} />
          <Route path="/tpu" element={<TPUKota />} />

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
          <Route
            path="/servis/ac/nounik/:no_registrasi"
            element={<ServiceAc />}
          />
          <Route
            path="/distribusi-tanaman/:id_tanaman"
            element={<DistribusiTanaman />}
          />

          {/* Services Berkala Pages*/}
          <Route
            path="/servis-berkala-kendaraan"
            element={<SerberKendaraan />}
          />
          <Route
            path="/servis-berkala-alat-berat"
            element={<SerberAlatBerat />}
          />
          <Route
            path="/servis-berkala-alat-kerja"
            element={<SerberAlatKerja />}
          />
          <Route path="/servis-berkala-ac" element={<SerberAc />} />
        </Route>

        {/* Public */}
        <Route path="/scan" element={<ScanPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
