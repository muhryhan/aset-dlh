import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import ActionButton from "../../ui/button/ActionBtnLite";
import { useState } from "react";
import AddButton from "../../ui/button/AddBtn";
import ExcelButton from "../../ui/button/ExcelBtn";
import PDFButton from "../../ui/button/PdfBtn";
import SearchInput from "../../ui/search/Search";
import RowsSelector from "../../ui/rowsSelector/rowsSelector";

// Define the table data using the interface
interface ServisData {
  id: number;
  tanggal: string;
  noUnik: string;
  namaBengkel: string;
  biayaServis: number;
  notaPembayaran: string;
  dokumentasi: string;
}

const tableData: ServisData[] = [
  {
    id: 1,
    tanggal: "2025-01-10",
    noUnik: "AK20250110-001",
    namaBengkel: "Bengkel Teknik Perkasa",
    biayaServis: 150000,
    notaPembayaran: "https://example.com/nota/kerja1.pdf",
    dokumentasi: "https://example.com/images/kerja1.jpg",
  },
  {
    id: 2,
    tanggal: "2025-01-22",
    noUnik: "AK20250122-002",
    namaBengkel: "Servis Alat Pro",
    biayaServis: 200000,
    notaPembayaran: "https://example.com/nota/kerja2.pdf",
    dokumentasi: "https://example.com/images/kerja2.jpg",
  },
  {
    id: 3,
    tanggal: "2025-02-05",
    noUnik: "AK20250205-003",
    namaBengkel: "Mekanik Tools",
    biayaServis: 180000,
    notaPembayaran: "https://example.com/nota/kerja3.pdf",
    dokumentasi: "https://example.com/images/kerja3.jpg",
  },
  {
    id: 4,
    tanggal: "2025-02-18",
    noUnik: "AK20250218-004",
    namaBengkel: "Teknik Canggih Mandiri",
    biayaServis: 160000,
    notaPembayaran: "https://example.com/nota/kerja4.pdf",
    dokumentasi: "https://example.com/images/kerja4.jpg",
  },
  {
    id: 5,
    tanggal: "2025-03-03",
    noUnik: "AK20250303-005",
    namaBengkel: "Servis Perkakas Jaya",
    biayaServis: 175000,
    notaPembayaran: "https://example.com/nota/kerja5.pdf",
    dokumentasi: "https://example.com/images/kerja5.jpg",
  },
  {
    id: 6,
    tanggal: "2025-03-20",
    noUnik: "AK20250320-006",
    namaBengkel: "FixIt Teknik",
    biayaServis: 190000,
    notaPembayaran: "https://example.com/nota/kerja6.pdf",
    dokumentasi: "https://example.com/images/kerja6.jpg",
  },
];

export default function ServisAlataKerja() {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);

  const filteredData = tableData
    .filter((ServisData) =>
      ServisData.tanggal.toLowerCase().includes(search.toLowerCase())
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
              {filteredData.map((ServisData) => (
                <TableRow key={ServisData.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {ServisData.tanggal}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ServisData.namaBengkel}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ServisData.biayaServis}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <ActionButton
                      onEdit={() => console.log("Edit", ServisData.id)}
                      onDelete={() => console.log("Hapus", ServisData.id)}
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