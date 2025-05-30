import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  EditButton,
  DeleteButton,
} from "../ui/button/ActionBtn";
import { useState } from "react";
import AddButton from "../ui/button/AddBtn";
import ExcelButton from "../ui/button/ExcelBtn";
import PDFButton from "../ui/button/PdfBtn";
import SearchInput from "../ui/search/Search";
import RowsSelector from "../ui/rowsSelector/rowsSelector";

interface TumbuhanKeluarData {
  idTumbuhanKeluar: number;
  id: number;
  tanggal: string;
  jumlah: number;
  keterangan: string;
}

// Define the table data using the interface
const tableData: TumbuhanKeluarData[] = [
  {
    idTumbuhanKeluar: 1,
    id: 101,
    tanggal: "2025-05-01",
    jumlah: 10,
    keterangan: "Penambahan stok awal bulan",
  },
  {
    idTumbuhanKeluar: 2,
    id: 102,
    tanggal: "2025-05-03",
    jumlah: 5,
    keterangan: "Sumbangan dari komunitas hijau",
  },
  {
    idTumbuhanKeluar: 3,
    id: 103,
    tanggal: "2025-05-05",
    jumlah: 20,
    keterangan: "Pembelian dari supplier luar",
  },
  {
    idTumbuhanKeluar: 4,
    id: 104,
    tanggal: "2025-05-07",
    jumlah: 8,
    keterangan: "Stok pengganti yang mati",
  },
  {
    idTumbuhanKeluar: 5,
    id: 105,
    tanggal: "2025-05-10",
    jumlah: 12,
    keterangan: "Tambahan koleksi tanaman baru",
  },
  {
    idTumbuhanKeluar: 6,
    id: 106,
    tanggal: "2025-05-15",
    jumlah: 15,
    keterangan: "Donasi dari yayasan lingkungan",
  },
];

export default function TumbuhanMasuk() {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);

  const filteredData = tableData
    .filter((TumbuhanKeluarData) =>
      TumbuhanKeluarData.tanggal.toLowerCase().includes(search.toLowerCase())
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
                  Jumlah
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Keterangan
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
              {filteredData.map((TumbuhanKeluarData) => (
                <TableRow key={TumbuhanKeluarData.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {TumbuhanKeluarData.tanggal}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {TumbuhanKeluarData.jumlah}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {TumbuhanKeluarData.keterangan}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                    <EditButton
                      onClick={() => console.log("Edit", TumbuhanKeluarData.id)}
                    />
                    <DeleteButton
                      onClick={() => console.log("Delete", TumbuhanKeluarData.id)}
                    />
                    </div>
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
