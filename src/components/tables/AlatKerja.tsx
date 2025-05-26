import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import ActionButton from "../ui/button/ActionBtn";
import { useState } from "react";
import AddButton from "../ui/button/AddBtn";
import ExcelButton from "../ui/button/ExcelBtn";
import PDFButton from "../ui/button/PdfBtn";
import SearchInput from "../ui/search/Search";
import RowsSelector from "../ui/rowsSelector/rowsSelector";
import { useNavigate } from "react-router-dom";

interface AlatKerjaData {
  id: number;
  qrCode: string;
  gambar: string;
  merek: string;
  noRegistrasi: string;
  noSerial: string;
  asal: string;
  tahunPembelian: string;
  hargaPembelian: number;
  kondisi: string;
  keterangan: string;
}

// Define the table data using the interface
const tableData: AlatKerjaData[] = [
  {
    id: 1,
    qrCode: "QR001",
    gambar: "suzuki.jpg",
    merek: "Suzuki",
    noRegistrasi: "23.83495",
    noSerial: "SADH234",
    asal: "Pengadaan Pemerintah",
    tahunPembelian: "2016",
    hargaPembelian: 35000000,
    kondisi: "Kurang Baik",
    keterangan: "Butuh perawatan rutin",
  },
  {
    id: 2,
    qrCode: "QR002",
    gambar: "fuso.jpg",
    merek: "Fuso",
    noRegistrasi: "00000495",
    noSerial: "DSFJ999234",
    asal: "Hibah",
    tahunPembelian: "2027",
    hargaPembelian: 120000000,
    kondisi: "Kurang Baik",
    keterangan: "Cat terkelupas, mesin normal",
  },
  {
    id: 3,
    qrCode: "QR003",
    gambar: "bosch.jpg",
    merek: "Bosch",
    noRegistrasi: "45.11220",
    noSerial: "BOS123456",
    asal: "Pengadaan Swasta",
    tahunPembelian: "2020",
    hargaPembelian: 1500000,
    kondisi: "Baik",
    keterangan: "Masih dalam garansi",
  },
  {
    id: 4,
    qrCode: "QR004",
    gambar: "makita.jpg",
    merek: "Makita",
    noRegistrasi: "11.98764",
    noSerial: "MKT098765",
    asal: "Pengadaan Pemerintah",
    tahunPembelian: "2019",
    hargaPembelian: 2000000,
    kondisi: "Baik",
    keterangan: "Digunakan di bengkel utama",
  },
  {
    id: 5,
    qrCode: "QR005",
    gambar: "hitachi.jpg",
    merek: "Hitachi",
    noRegistrasi: "99.55441",
    noSerial: "HTC567321",
    asal: "Pengadaan Pemerintah",
    tahunPembelian: "2022",
    hargaPembelian: 4000000,
    kondisi: "Perlu Servis",
    keterangan: "Bermasalah pada motor penggerak",
  },
  {
    id: 6,
    qrCode: "QR006",
    gambar: "yamaha.jpg",
    merek: "Yamaha",
    noRegistrasi: "66.77788",
    noSerial: "YMH443211",
    asal: "Pengadaan Swasta",
    tahunPembelian: "2021",
    hargaPembelian: 25000000,
    kondisi: "Baik",
    keterangan: "Kendaraan operasional lapangan",
  },
];

export default function AlatKerja() {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);

  const filteredData = tableData
    .filter((AlatKerjaData) =>
      AlatKerjaData.merek.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, rows);

  const handleAddData = () => console.log("Tambah Data");
  const handleExportExcel = () => console.log("Export ke Excel");
  const handleExportPDF = () => console.log("Export ke PDF");

  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <AddButton onClick={handleAddData} />
          <RowsSelector value={rows} onChange={setRows} />
        </div>
        <div className="flex gap-2 items-center">
          <SearchInput value={search} onChange={setSearch} />
          <ExcelButton onClick={handleExportExcel} />
          <PDFButton onClick={handleExportPDF} />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Merek
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Asal
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Harga
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Kondisi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.map((AlatKerjaData) => (
                <TableRow key={AlatKerjaData.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {AlatKerjaData.merek}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {AlatKerjaData.asal}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    Rp{AlatKerjaData.hargaPembelian.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {AlatKerjaData.kondisi}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <ActionButton
                      onService={() =>
                        navigate(`/service-alat-kerja/${AlatKerjaData.id}`)
                      }
                      onEdit={() => console.log("Edit", AlatKerjaData.id)}
                      onDelete={() => console.log("Hapus", AlatKerjaData.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
