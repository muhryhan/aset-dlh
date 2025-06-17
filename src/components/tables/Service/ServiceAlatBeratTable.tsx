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
import ServisAlatBeratFormInputModal from "../../../pages/Modals/ServisAlatBeratInputModal";

interface ServisData {
  id: number;
  merek: string;
  noRegistrasi: string;
  tanggal: string;
  noUnik: string;
  namaBengkel: string;
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
    tanggal: "2025-01-08",
    noUnik: "AB20250108-001",
    namaBengkel: "HeavyTech Indonesia",
    biayaServis: 2500000,
    notaPembayaran: "https://example.com/nota/berat1.pdf",
    dokumentasi: "https://example.com/images/berat1.jpg",
    onderdil: "Oli Mesin",
    jumlah: 2,
    harga: 85000,
  },
  {
    id: 2,
    merek: "Yamaha",
    noRegistrasi: "DEF456",
    tanggal: "2025-01-25",
    noUnik: "AB20250125-002",
    namaBengkel: "Bengkel Alat Berat Nusantara",
    biayaServis: 3000000,
    notaPembayaran: "https://example.com/nota/berat2.pdf",
    dokumentasi: "https://example.com/images/berat2.jpg",
    onderdil: "Oli Mesin",
    jumlah: 2,
    harga: 85000,
  },
  {
    id: 3,
    merek: "Suzuki",
    noRegistrasi: "GHI789",
    tanggal: "2025-02-14",
    noUnik: "AB20250214-003",
    namaBengkel: "Indo Heavy Servis",
    biayaServis: 2750000,
    notaPembayaran: "https://example.com/nota/berat3.pdf",
    dokumentasi: "https://example.com/images/berat3.jpg",
    onderdil: "Oli Mesin",
    jumlah: 2,
    harga: 85000,
  },
  {
    id: 4,
    merek: "Kawasaki",
    noRegistrasi: "JKL012",
    tanggal: "2025-03-01",
    noUnik: "AB20250301-004",
    namaBengkel: "Mega Alat Berat",
    biayaServis: 3200000,
    notaPembayaran: "https://example.com/nota/berat4.pdf",
    dokumentasi: "https://example.com/images/berat4.jpg",
    onderdil: "Oli Mesin",
    jumlah: 2,
    harga: 85000,
  },
];

export default function ServisAlatBerat() {
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
            <ServisAlatBeratFormInputModal onClose={closeModal} />
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
              {filteredData.map((ServisAlatBerat) => (
                <TableRow key={ServisAlatBerat.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ServisAlatBerat.noRegistrasi}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ServisAlatBerat.merek}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ServisAlatBerat.tanggal}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ServisAlatBerat.namaBengkel}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ServisAlatBerat.biayaServis}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    {ServisAlatBerat.onderdil}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    {ServisAlatBerat.jumlah}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Rp {ServisAlatBerat.harga.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Rp{" "}
                    {(
                      ServisAlatBerat.biayaServis + ServisAlatBerat.jumlah * ServisAlatBerat.harga
                    ).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <EditButton
                        onClick={() => console.log("Edit", ServisAlatBerat.id)}
                      />
                      <DeleteButton
                        onClick={() =>
                          console.log("Delete", ServisAlatBerat.id)
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
