import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import ActionButton from "../../ui/button/ActionBtn";
import { useState } from "react";
import AddButton from "../../ui/button/AddBtn";
import ExcelButton from "../../ui/button/ExcelBtn";
import PDFButton from "../../ui/button/PdfBtn";
import SearchInput from "../../ui/search/Search";
import RowsSelector from "../../ui/rowsSelector/rowsSelector";

interface ServisData {
  id: number;
  tanggal: string;
  noUnik: string;
  namaBengkel: string;
  biayaServis: number;
  notaPembayaran: string;
  dokumentasi: string;
}

// Define the table data using the interface
const tableData: ServisData[] = [
  {
    id: 1,
    tanggal: "2025-01-12",
    noUnik: "SRV20250112-001",
    namaBengkel: "Bengkel Mobil Jaya",
    biayaServis: 1500000,
    notaPembayaran: "https://example.com/nota/nota-kendaraan1.pdf",
    dokumentasi: "https://example.com/images/kendaraan-servis1.jpg",
  },
  {
    id: 2,
    tanggal: "2025-02-05",
    noUnik: "SRV20250205-002",
    namaBengkel: "AutoCare Service Center",
    biayaServis: 980000,
    notaPembayaran: "https://example.com/nota/nota-kendaraan2.pdf",
    dokumentasi: "https://example.com/images/kendaraan-servis2.jpg",
  },
  {
    id: 3,
    tanggal: "2025-03-09",
    noUnik: "SRV20250309-003",
    namaBengkel: "Mekanik Motor Prima",
    biayaServis: 450000,
    notaPembayaran: "https://example.com/nota/nota-kendaraan3.pdf",
    dokumentasi: "https://example.com/images/kendaraan-servis3.jpg",
  },
  {
    id: 4,
    tanggal: "2025-03-20",
    noUnik: "SRV20250320-004",
    namaBengkel: "Bengkel Sejahtera Motor",
    biayaServis: 1250000,
    notaPembayaran: "https://example.com/nota/nota-kendaraan4.pdf",
    dokumentasi: "https://example.com/images/kendaraan-servis4.jpg",
  },
  {
    id: 5,
    tanggal: "2025-04-03",
    noUnik: "SRV20250403-005",
    namaBengkel: "MobilCare Nusantara",
    biayaServis: 890000,
    notaPembayaran: "https://example.com/nota/nota-kendaraan5.pdf",
    dokumentasi: "https://example.com/images/kendaraan-servis5.jpg",
  },
  {
    id: 6,
    tanggal: "2025-04-16",
    noUnik: "SRV20250416-006",
    namaBengkel: "Servis Mobil Amanah",
    biayaServis: 760000,
    notaPembayaran: "https://example.com/nota/nota-kendaraan6.pdf",
    dokumentasi: "https://example.com/images/kendaraan-servis6.jpg",
  },
];

export default function ServisKendaraan() {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);

  const filteredData = tableData
    .filter((servis) =>
      servis.tanggal.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, rows);

  const handleAddData = () => console.log("Tambah Data Servis");
  const handleExportExcel = () => console.log("Export ke Excel Servis");
  const handleExportPDF = () => console.log("Export ke PDF Servis");

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
                  Tanggal
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nama Bengkel
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Biaya Servis
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
              {filteredData.map((servis) => (
                <TableRow key={servis.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {servis.tanggal}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {servis.namaBengkel}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    Rp {servis.biayaServis.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <ActionButton
                      onView={() => console.log("Lihat", servis.id)}
                      onEdit={() => console.log("Edit", servis.id)}
                      onDelete={() => console.log("Hapus", servis.id)}
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