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
import ServisAcFormInputModal from "../../../pages/Modals/ServisAcInputModal";

interface ServisData {
  id: number;
  tanggal: string;
  biayaServis: number;
  notaPembayaran: string;
  dokumentasi: string;
  onderdil: string;
  jumlah: number;
  harga: number;
}

// Define the table data using the interface
const tableData: ServisData[] = [
  {
    id: 1,
    tanggal: "2025-01-15",
    biayaServis: 350000,
    notaPembayaran: "https://example.com/nota/nota1.pdf",
    dokumentasi: "https://example.com/images/servis1.jpg",
    onderdil: "Oli Mesin",
    jumlah: 2,
    harga: 85000,
  },
  {
    id: 2,
    tanggal: "2025-02-03",
    biayaServis: 275000,
    notaPembayaran: "https://example.com/nota/nota2.pdf",
    dokumentasi: "https://example.com/images/servis2.jpg",
    onderdil: "Oli Mesin",
    jumlah: 2,
    harga: 85000,
  },
  {
    id: 3,
    tanggal: "2025-03-10",
    biayaServis: 420000,
    notaPembayaran: "https://example.com/nota/nota3.pdf",
    dokumentasi: "https://example.com/images/servis3.jpg",
    onderdil: "Oli Mesin",
    jumlah: 2,
    harga: 85000,
  },
  {
    id: 4,
    tanggal: "2025-03-22",
    biayaServis: 310000,
    notaPembayaran: "https://example.com/nota/nota4.pdf",
    dokumentasi: "https://example.com/images/servis4.jpg",
    onderdil: "Oli Mesin",
    jumlah: 2,
    harga: 85000,
  },
];

export default function ServisAc() {
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
          {isModalOpen && <ServisAcFormInputModal onClose={closeModal} />}
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
              {filteredData.map((ServisAc) => (
                <TableRow key={ServisAc.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ServisAc.tanggal}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ServisAc.biayaServis}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    {ServisAc.onderdil}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    {ServisAc.jumlah}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Rp {ServisAc.harga.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Rp{" "}
                    {(
                      ServisAc.biayaServis + ServisAc.jumlah * ServisAc.harga
                    ).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <EditButton
                        onClick={() => console.log("Edit", ServisAc.id)}
                      />
                      <DeleteButton
                        onClick={() => console.log("Delete", ServisAc.id)}
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
