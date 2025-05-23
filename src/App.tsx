import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";

import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import Calendar from "./pages/Calendar";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Kendaraan from "./pages/Assets/Kendaraan";
import AlatBerat from "./pages/Assets/AlatBerat";
import AlatKerja from "./pages/Assets/AlatKerja";
import Ac from "./pages/Assets/Ac";
import Tumbuhan from "./pages/Assets/Tumbuhan";
import ServiceKendaraan from "./pages/Service/ServiceKendaraan";
import ServiceAlatBerat from "./pages/Service/ServiceAlatBerat";
import ServiceAlatKerja from "./pages/Service/ServiceAlatKerja";
import ServiceAc from "./pages/Service/ServiceAc";
import PeriodicKendaraan from "./pages/PeriodicService/PeriodicKendaraan";
import PeriodicAlatBerat from "./pages/PeriodicService/PeriodicAlatBerat";
import PeriodicAlatKerja from "./pages/PeriodicService/PeriodicAlatKerja";
import PeriodicAc from "./pages/PeriodicService/PeriodicAc";
import FormService from "./pages/Service/FormService";
import TamanKota from "./pages/Assets/TamanKota";
import TPUKota from "./pages/Assets/TPU";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>

            {/* Home page */}
            <Route path="/home" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Aset DLH Page */}
            <Route path="/kendaraan" element={<Kendaraan/>}/>
            <Route path="/alat-berat" element={<AlatBerat/>}/>
            <Route path="/alat-kerja" element={<AlatKerja/>}/>
            <Route path="/ac" element={<Ac/>}/>
            <Route path="/taman-kota" element={<TamanKota/>}/>
            <Route path="/tpu" element={<TPUKota/>}/>

            {/* Plants Page */}
            <Route path="/tumbuhan" element={<Tumbuhan/>}/>

            {/* Service Page */}
            <Route path="/service-kendaraan" element={<ServiceKendaraan/>}/>
            <Route path="/service-alat-berat" element={<ServiceAlatBerat/>}/>
            <Route path="/service-alat-kerja" element={<ServiceAlatKerja/>}/>
            <Route path="/service-ac" element={<ServiceAc/>}/>
            <Route path="/form-service" element={<FormService/>}/>

            {/* Periodic Service Page */}
            <Route path="/periodic-kendaraan" element={<PeriodicKendaraan/>}/>
            <Route path="/periodic-alat-berat" element={<PeriodicAlatBerat/>}/>
            <Route path="/periodic-alat-kerja" element={<PeriodicAlatKerja/>}/>
            <Route path="/periodic-ac" element={<PeriodicAc/>}/>

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/" element={<SignIn />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
