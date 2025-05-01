import {
  MotorIcon,
  CarIcon,
  TruckIcon,
  ExcaIcon,    
  ChawnIcon,
  AcIcon,
  PlantIcon,
} from "../../icons";



export default function EcommerceMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="relative rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Ikon kiri atas */}
        <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl dark:bg-gray-800">
          <MotorIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

      {/* Angka tengah */}
        <div className="flex flex-col items-center justify-center mt-4">
          <h2 className="text-5xl font-extrabold text-gray-800 dark:text-white/90 mb-4">56</h2>

      {/* Label dan ikon kecil di bawah angka */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Roda 2</span>
        </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="relative rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Ikon kiri atas */}
        <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl dark:bg-gray-800">
          <CarIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

      {/* Angka tengah */}
        <div className="flex flex-col items-center justify-center mt-4">
          <h2 className="text-5xl font-extrabold text-gray-800 dark:text-white/90 mb-4">21</h2>

      {/* Label dan ikon kecil di bawah angka */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Roda 4</span>
        </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="relative rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Ikon kiri atas */}
        <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl dark:bg-gray-800">
          <TruckIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

      {/* Angka tengah */}
        <div className="flex flex-col items-center justify-center mt-4">
          <h2 className="text-5xl font-extrabold text-gray-800 dark:text-white/90 mb-4">9</h2>

      {/* Label dan ikon kecil di bawah angka */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Roda 6</span>
        </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="relative rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Ikon kiri atas */}
        <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl dark:bg-gray-800">
          <ExcaIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

      {/* Angka tengah */}
        <div className="flex flex-col items-center justify-center mt-4">
          <h2 className="text-5xl font-extrabold text-gray-800 dark:text-white/90 mb-4">13</h2>

      {/* Label dan ikon kecil di bawah angka */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Alat Berat</span>
        </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="relative rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Ikon kiri atas */}
        <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl dark:bg-gray-800">
          <ChawnIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

      {/* Angka tengah */}
        <div className="flex flex-col items-center justify-center mt-4">
          <h2 className="text-5xl font-extrabold text-gray-800 dark:text-white/90 mb-4">34</h2>

      {/* Label dan ikon kecil di bawah angka */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Alat Kerja</span>
        </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="relative rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Ikon kiri atas */}
        <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl dark:bg-gray-800">
          <AcIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

      {/* Angka tengah */}
        <div className="flex flex-col items-center justify-center mt-4">
          <h2 className="text-5xl font-extrabold text-gray-800 dark:text-white/90 mb-4">17</h2>

      {/* Label dan ikon kecil di bawah angka */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">AC</span>
        </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="relative rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Ikon kiri atas */}
        <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl dark:bg-gray-800">
          <PlantIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

      {/* Angka tengah */}
        <div className="flex flex-col items-center justify-center mt-4">
          <h2 className="text-5xl font-extrabold text-gray-800 dark:text-white/90 mb-4">135</h2>

      {/* Label dan ikon kecil di bawah angka */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tumbuhan</span>
        </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
