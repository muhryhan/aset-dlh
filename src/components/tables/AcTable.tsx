import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ServiceButton,
  EditButton,
  DeleteButton,
} from "../ui/button/ActionBtn";
import { useState } from "react";
import AddButton from "../ui/button/AddBtn";
import ExcelButton from "../ui/button/ExcelBtn";
import PDFButton from "../ui/button/PdfBtn";
import SearchInput from "../ui/search/Search";
import RowsSelector from "../ui/rowsSelector/rowsSelector";
import { useNavigate } from "react-router-dom";
import AcFormInputModal from "../../pages/Modals/AcInputModal";

interface AcData {
  id: number;
  qrCode: string;
  gambar: string;
  merek: string;
  noRegistrasi: string;
  noSerial: string;
  ukuran: string;
  ruangan: string;
  asal: string;
  tahunPembelian: string;
  hargaPembelian: number;
  kondisi: string;
  keterangan: string;
}

const tableData: AcData[] = [
  {
    id: 1,
    qrCode: "QR001",
    gambar: "/images/ac1.jpg",
    merek: "Polytron",
    noRegistrasi: "23.83495",
    noSerial: "SADH234",
    ukuran: "1 PK",
    ruangan: "Ruang Server",
    asal: "Pembelian",
    tahunPembelian: "2020",
    hargaPembelian: 3500000,
    kondisi: "Baik",
    keterangan: "-",
  },
  {
    id: 2,
    qrCode: "QR002",
    gambar: "/images/ac2.jpg",
    merek: "Sharp",
    noRegistrasi: "24933495",
    noSerial: "DSFJ999234",
    ukuran: "1.5 PK",
    ruangan: "Ruang Kepala",
    asal: "Hibah",
    tahunPembelian: "2023",
    hargaPembelian: 4000000,
    kondisi: "Baik Sekali",
    keterangan: "AC baru diganti",
  },
  {
    id: 3,
    qrCode: "QR003",
    gambar: "/images/ac3.jpg",
    merek: "LG",
    noRegistrasi: "11020394",
    noSerial: "HTC567321",
    ukuran: "2 PK",
    ruangan: "Ruang Rapat",
    asal: "Pembelian",
    tahunPembelian: "2021",
    hargaPembelian: 5000000,
    kondisi: "Baik",
    keterangan: "-",
  },
];

export default function Ac() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);

  const filteredData = tableData
    .filter((AcData) =>
      AcData.merek.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, rows);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleExportExcel = () => console.log("Export ke Excel");
  const handleExportPDF = () => console.log("Export ke PDF");

  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <AddButton onClick={openModal} />
          {isModalOpen && <AcFormInputModal onClose={closeModal} />}
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
                  QR Code
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Gambar
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
                  No Registrasi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  No Serial
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Ukuran
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Ruangan
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
                  Tahun Pembelian
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
                  Kondisi
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
              {filteredData.map((ac) => (
                <TableRow key={ac.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ac.qrCode}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <img
                      src={ac.gambar}
                      alt={`Gambar ${ac.merek}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ac.merek}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ac.noRegistrasi}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ac.noSerial}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ac.ukuran}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ac.ruangan}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ac.asal}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ac.tahunPembelian}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    Rp {ac.hargaPembelian.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ac.kondisi}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ac.keterangan}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <ServiceButton
                        onClick={() => navigate(`/service-ac/${ac.id}`)}
                      />
                      <EditButton onClick={() => console.log("Edit", ac.id)} />
                      <DeleteButton
                        onClick={() => console.log("Delete", ac.id)}
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
