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
    tanggal: "2025-01-15",
    noUnik: "AC20250115-001",
    namaBengkel: "Bengkel AC Sejuk Abadi",
    biayaServis: 350000,
    notaPembayaran: "https://example.com/nota/nota1.pdf",
    dokumentasi: "https://example.com/images/servis1.jpg",
  },
  {
    id: 2,
    tanggal: "2025-02-03",
    noUnik: "AC20250203-002",
    namaBengkel: "AC Prima Service",
    biayaServis: 275000,
    notaPembayaran: "https://example.com/nota/nota2.pdf",
    dokumentasi: "https://example.com/images/servis2.jpg",
  },
  {
    id: 3,
    tanggal: "2025-03-10",
    noUnik: "AC20250310-003",
    namaBengkel: "CoolTech AC Solutions",
    biayaServis: 420000,
    notaPembayaran: "https://example.com/nota/nota3.pdf",
    dokumentasi: "https://example.com/images/servis3.jpg",
  },
  {
    id: 4,
    tanggal: "2025-03-22",
    noUnik: "AC20250322-004",
    namaBengkel: "Udara Segar Teknik",
    biayaServis: 310000,
    notaPembayaran: "https://example.com/nota/nota4.pdf",
    dokumentasi: "https://example.com/images/servis4.jpg",
  },
  {
    id: 5,
    tanggal: "2025-04-05",
    noUnik: "AC20250405-005",
    namaBengkel: "Mandiri Pendingin",
    biayaServis: 390000,
    notaPembayaran: "https://example.com/nota/nota5.pdf",
    dokumentasi: "https://example.com/images/servis5.jpg",
  },
  {
    id: 6,
    tanggal: "2025-04-18",
    noUnik: "AC20250418-006",
    namaBengkel: "Teknik AC Nusantara",
    biayaServis: 295000,
    notaPembayaran: "https://example.com/nota/nota6.pdf",
    dokumentasi: "https://example.com/images/servis6.jpg",
  },
];

export default function ServisAc() {
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