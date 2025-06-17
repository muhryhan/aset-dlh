import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { EditButton, DeleteButton } from "../../ui/button/ActionBtn";
import { useState } from "react";
import AddButton from "../../ui/button/AddBtn";
import ExcelButton from "../../ui/button/ExcelBtn";
import PDFButton from "../../ui/button/PdfBtn";
import SearchInput from "../../ui/search/Search";
import RowsSelector from "../../ui/rowsSelector/rowsSelector";
import ServisAlatKerjaFormInputModal from "../../../pages/Modals/ServisAlatKerjaInputModal";

// Define the table data using the interface
interface ServisData {
  id: number;
  merek: string;
  noRegistrasi: string;
  tanggal: string;
  noUnik: string;
  biayaServis: number;
  notaPembayaran: string;
  dokumentasi: string;
  onderdil: string;
  jumlah: number;
  harga: number;
}

const tableData: ServisData[] = [
  {
    id: 1,
    merek: "Honda",
    noRegistrasi: "ABC123",
    tanggal: "2025-01-10",
    noUnik: "AK20250110-001",
    biayaServis: 150000,
    notaPembayaran: "https://example.com/nota/kerja1.pdf",
    dokumentasi: "https://example.com/images/kerja1.jpg",
    onderdil: "Oli Mesin",
    jumlah: 2,
    harga: 85000,
  },
  {
    id: 2,
    merek: "Yamaha",
    noRegistrasi: "DEF456",
    tanggal: "2025-01-22",
    noUnik: "AK20250122-002",
    biayaServis: 200000,
    notaPembayaran: "https://example.com/nota/kerja2.pdf",
    dokumentasi: "https://example.com/images/kerja2.jpg",
    onderdil: "Oli Mesin",
    jumlah: 2,
    harga: 85000,
  },
  {
    id: 3,
    merek: "Suzuki",
    noRegistrasi: "GHI789",
    tanggal: "2025-02-05",
    noUnik: "AK20250205-003",
    biayaServis: 180000,
    notaPembayaran: "https://example.com/nota/kerja3.pdf",
    dokumentasi: "https://example.com/images/kerja3.jpg",
    onderdil: "Oli Mesin",
    jumlah: 2,
    harga: 85000,
  },
  {
    id: 4,
    merek: "Kawasaki",
    noRegistrasi: "JKL012",
    tanggal: "2025-02-18",
    noUnik: "AK20250218-004",
    biayaServis: 160000,
    notaPembayaran: "https://example.com/nota/kerja4.pdf",
    dokumentasi: "https://example.com/images/kerja4.jpg",
    onderdil: "Oli Mesin",
    jumlah: 2,
    harga: 85000,
  },
];

export default function ServisAlataKerja() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);

  const filteredData = tableData
    .filter((ServisData) =>
      ServisData.tanggal.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, rows);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleExportExcel = () => console.log("Export ke Excel");
  const handleExportPDF = () => console.log("Export ke PDF");

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <AddButton onClick={openModal} />
          {isModalOpen && (
            <ServisAlatKerjaFormInputModal onClose={closeModal} />
          )}
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
                  Nomor Registrasi
                </TableCell>
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
                  Tanggal
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
                  Onderdil
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
                  Harga
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Total Harga
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
              {filteredData.map((ServisAlataKerja) => (
                <TableRow key={ServisAlataKerja.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ServisAlataKerja.noRegistrasi}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ServisAlataKerja.merek}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ServisAlataKerja.tanggal}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ServisAlataKerja.biayaServis}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    {ServisAlataKerja.onderdil}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    {ServisAlataKerja.jumlah}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Rp {ServisAlataKerja.harga.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Rp{" "}
                    {(
                      ServisAlataKerja.biayaServis + ServisAlataKerja.jumlah * ServisAlataKerja.harga
                    ).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <EditButton
                        onClick={() => console.log("Edit", ServisAlataKerja.id)}
                      />
                      <DeleteButton
                        onClick={() =>
                          console.log("Delete", ServisAlataKerja.id)
                        }
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
