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

interface AlatBeratData {
  id: number;
  qrCode: string;
  gambar: string;
  merek: string;
  noRegistrasi: string;
  noMesin: string;
  noRangka: string;
  warna: string;
  hargaPembelian: number;
  tahunPembuatan: string;
  kategori: string;
  pajak: string; // ISO format date string (YYYY-MM-DD)
  penggunaan: string;
  kondisi: string;
}

// Define the table data using the interface
const tableData: AlatBeratData[] = [
  {
    id: 1,
    qrCode: "QR-001",
    gambar: "caterpillar-d8t.jpg",
    merek: "Caterpillar D8T",
    noRegistrasi: "AB 1234 CD",
    noMesin: "ENG-001-CAT",
    noRangka: "CHS-001-CAT",
    warna: "Kuning",
    hargaPembelian: 2500000000,
    tahunPembuatan: "2018",
    kategori: "Bulldozer",
    pajak: "2025-05-01",
    penggunaan: "Proyek Jalan Raya",
    kondisi: "Baik",
  },
  {
    id: 2,
    qrCode: "QR-002",
    gambar: "komatsu-pc200.jpg",
    merek: "Komatsu PC200",
    noRegistrasi: "BD 5678 EF",
    noMesin: "ENG-002-KMT",
    noRangka: "CHS-002-KMT",
    warna: "Kuning",
    hargaPembelian: 1800000000,
    tahunPembuatan: "2020",
    kategori: "Excavator",
    pajak: "2025-07-10",
    penggunaan: "Galian Pondasi",
    kondisi: "Baik",
  },
  {
    id: 3,
    qrCode: "QR-003",
    gambar: "hitachi-zx210lc.jpg",
    merek: "Hitachi ZX210LC",
    noRegistrasi: "CD 9101 GH",
    noMesin: "ENG-003-HTC",
    noRangka: "CHS-003-HTC",
    warna: "Oranye",
    hargaPembelian: 1750000000,
    tahunPembuatan: "2019",
    kategori: "Excavator",
    pajak: "2024-12-15",
    penggunaan: "Konstruksi Gedung",
    kondisi: "Perlu Servis",
  },
  {
    id: 4,
    qrCode: "QR-004",
    gambar: "liebherr-ltm1100.jpg",
    merek: "Liebherr LTM 1100",
    noRegistrasi: "DE 1122 IJ",
    noMesin: "ENG-004-LBH",
    noRangka: "CHS-004-LBH",
    warna: "Putih",
    hargaPembelian: 3200000000,
    tahunPembuatan: "2021",
    kategori: "Crane",
    pajak: "2025-09-20",
    penggunaan: "Angkat Material Berat",
    kondisi: "Baik",
  },
  {
    id: 5,
    qrCode: "QR-005",
    gambar: "volvo-a40g.jpg",
    merek: "Volvo A40G",
    noRegistrasi: "EF 3344 KL",
    noMesin: "ENG-005-VLV",
    noRangka: "CHS-005-VLV",
    warna: "Kuning",
    hargaPembelian: 2000000000,
    tahunPembuatan: "2017",
    kategori: "Dump Truck",
    pajak: "2025-03-01",
    penggunaan: "Angkut Material",
    kondisi: "Kurang Baik",
  },
  {
    id: 6,
    qrCode: "QR-006",
    gambar: "sany-stc750.jpg",
    merek: "SANY STC750",
    noRegistrasi: "GH 5566 MN",
    noMesin: "ENG-006-SNY",
    noRangka: "CHS-006-SNY",
    warna: "Merah",
    hargaPembelian: 2300000000,
    tahunPembuatan: "2019",
    kategori: "Crane",
    pajak: "2025-06-30",
    penggunaan: "Konstruksi Jalan Layang",
    kondisi: "Baik",
  },
];

export default function AlatBerat() {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);

  const filteredData = tableData
    .filter(
      (AlatBeratData) =>
        AlatBeratData.merek.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, rows);

  const handleAddData = () => console.log("Tambah Data");
  const handleExportExcel = () => console.log("Export ke Excel");
  const handleExportPDF = () => console.log("Export ke PDF");

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
                  Warna
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Harga Pembelian
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Pajak
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Penggunaan
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
              {filteredData.map((AlatBeratData) => (
                <TableRow key={AlatBeratData.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {AlatBeratData.merek}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {AlatBeratData.warna}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    Rp {AlatBeratData.hargaPembelian.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(AlatBeratData.pajak).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {AlatBeratData.penggunaan}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {AlatBeratData.kondisi}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <ActionButton
                      onView={() => console.log("Lihat", AlatBeratData.id)}
                      onEdit={() => console.log("Edit", AlatBeratData.id)}
                      onDelete={() => console.log("Hapus", AlatBeratData.id)}
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
