import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserList";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Calendar from "./pages/Calendar";
import Blank from "./pages/OtherPage/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import ProtectedRoute from "./protectedRoute";
import Home from "./pages/Dashboard/Home";
import Kendaraan from "./pages/Kendaraan";
import AlatBerat from "./pages/AlatBerat";
import AlatKerja from "./pages/AlatKerja";
import Ac from "./pages/Ac";
import Tumbuhan from "./pages/Tumbuhan";
import DistribusiTumbuhan from "./pages/Tumbuhan/DistribusiTumbuhan";
import ServiceKendaraan from "./pages/Service/ServisKendaraan";
import ServiceAlatBerat from "./pages/Service/ServiceAlatBerat";
import ServiceAlatKerja from "./pages/Service/ServiceAlatKerja";
import ServiceAc from "./pages/Service/ServiceAc";
import PeriodicKendaraan from "./pages/ServiceBerkala/SerberKendaraan";
import PeriodicAlatBerat from "./pages/ServiceBerkala/SerberAlatBerat";
import PeriodicAlatKerja from "./pages/ServiceBerkala/SerberAlatKerja";
import PeriodicAc from "./pages/ServiceBerkala/SerberAc";
import TamanKota from "./pages/TamanKota";
import TPUKota from "./pages/TPU";
import ScanPage from "./pages/ScanPage";

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
            path="/servis/nounik/:no_polisi"
            element={<ServiceKendaraan />}
          />
          <Route
            path="/service-alat-berat/:id"
            element={<ServiceAlatBerat />}
          />
          <Route
            path="/service-alat-kerja/:id"
            element={<ServiceAlatKerja />}
          />
          <Route path="/service-ac/:id" element={<ServiceAc />} />

          {/* Periodic Services */}
          <Route path="/periodic-kendaraan" element={<PeriodicKendaraan />} />
          <Route path="/periodic-alat-berat" element={<PeriodicAlatBerat />} />
          <Route path="/periodic-alat-kerja" element={<PeriodicAlatKerja />} />
          <Route path="/periodic-ac" element={<PeriodicAc />} />

          {/* UI Elements */}
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />

          {/* Scan */}
        </Route>

        <Route path="/scan" element={<ScanPage />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
