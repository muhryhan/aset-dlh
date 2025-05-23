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

interface TumbuhanData {
  id: number;
  gambar: string;
  nama: string;
  jenis: string;
  stok: number;
  keterangan: string;
}

// Define the table data using the interface
const tableData: TumbuhanData[] = [
  {
    id: 1,
    gambar: "https://example.com/images/anggrek.jpg",
    nama: "Anggrek Bulan",
    jenis: "Hias",
    stok: 10,
    keterangan: "Tanaman hias populer dengan bunga berwarna putih.",
  },
  {
    id: 2,
    gambar: "https://example.com/images/kaktus.jpg",
    nama: "Kaktus Mini",
    jenis: "Hias",
    stok: 25,
    keterangan: "Perawatan mudah, cocok untuk dekorasi meja.",
  },
  {
    id: 3,
    gambar: "https://example.com/images/lidah-mertua.jpg",
    nama: "Lidah Mertua",
    jenis: "Penyaring Udara",
    stok: 15,
    keterangan: "Efektif menyaring udara, cocok untuk dalam ruangan.",
  },
  {
    id: 4,
    gambar: "https://example.com/images/pakis.jpg",
    nama: "Pakis Boston",
    jenis: "Hias",
    stok: 8,
    keterangan: "Tanaman dengan daun lebat, suka tempat teduh.",
  },
  {
    id: 5,
    gambar: "https://example.com/images/mint.jpg",
    nama: "Daun Mint",
    jenis: "Herbal",
    stok: 20,
    keterangan: "Biasa digunakan untuk minuman dan masakan.",
  },
  {
    id: 6,
    gambar: "https://example.com/images/bunga-matahari.jpg",
    nama: "Bunga Matahari",
    jenis: "Hias",
    stok: 12,
    keterangan: "Membutuhkan cahaya matahari penuh untuk tumbuh optimal.",
  },
];

export default function Tumbuhan() {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);

  const filteredData = tableData
    .filter((TumbuhanData) =>
      TumbuhanData.nama.toLowerCase().includes(search.toLowerCase())
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
                  Nama
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Jenis
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Stok
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
              {filteredData.map((TumbuhanData) => (
                <TableRow key={TumbuhanData.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {TumbuhanData.nama}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {TumbuhanData.jenis}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {TumbuhanData.stok}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <ActionButton
                      onView={() => console.log("Lihat", TumbuhanData.id)}
                      onEdit={() => console.log("Edit", TumbuhanData.id)}
                      onDelete={() => console.log("Hapus", TumbuhanData.id)}
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
