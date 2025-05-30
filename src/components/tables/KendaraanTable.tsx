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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";
import AddButton from "../ui/button/AddBtn";
import ExcelButton from "../ui/button/ExcelBtn";
import PDFButton from "../ui/button/PdfBtn";
import SearchInput from "../ui/search/Search";
import RowsSelector from "../ui/rowsSelector/rowsSelector";
import { useNavigate } from "react-router-dom";
import KendaraanFormInputModal from "../../pages/Modals/KendaraanInputModal";

interface KendaraanData {
  id: number;
  qrCode: string;
  gambar: string;
  merek: string;
  nomorPolisi: string;
  nomorMesin: string;
  nomorRangka: string;
  warna: string;
  hargaPembelian: number;
  tahunPembuatan: string;
  kategori: string;
  pajak: string;
  pemegang: string;
  nik: string;
  penggunaan: string;
  kondisi: string;
}

const tableData: KendaraanData[] = [
  {
    id: 1,
    qrCode: "QRK001",
    gambar: "avanza.jpg",
    merek: "Toyota Avanza",
    nomorPolisi: "B 1234 XYZ",
    nomorMesin: "1NR123456",
    nomorRangka: "MHKTN12AVZ001",
    warna: "Hitam",
    hargaPembelian: 230000000,
    tahunPembuatan: "2022",
    kategori: "R4",
    pajak: "2025-06-15",
    pemegang: "Andi Pratama",
    nik: "3174091001900001",
    penggunaan: "Operasional",
    kondisi: "Baik",
  },
  {
    id: 2,
    qrCode: "QRK002",
    gambar: "nmax.jpg",
    merek: "Yamaha NMAX",
    nomorPolisi: "D 5678 ABC",
    nomorMesin: "NMAX56789Y",
    nomorRangka: "MH34MAY1234NMX",
    warna: "Putih",
    hargaPembelian: 32000000,
    tahunPembuatan: "2021",
    kategori: "R2",
    pajak: "2024-11-01",
    pemegang: "Budi Setiawan",
    nik: "3205051502870002",
    penggunaan: "Pribadi",
    kondisi: "Baik",
  },
  {
    id: 3,
    qrCode: "QRK003",
    gambar: "giga.jpg",
    merek: "Isuzu Giga",
    nomorPolisi: "F 9876 DEF",
    nomorMesin: "GIGA9087ISZ",
    nomorRangka: "MH4GIGA9087XYZ",
    warna: "Kuning",
    hargaPembelian: 580000000,
    tahunPembuatan: "2020",
    kategori: "R6",
    pajak: "2025-01-20",
    pemegang: "Samsul Huda",
    nik: "3271062103740003",
    penggunaan: "Distribusi",
    kondisi: "Perlu Servis",
  },
  {
    id: 4,
    qrCode: "QRK004",
    gambar: "coltdiesel.jpg",
    merek: "Mitsubishi Colt Diesel",
    nomorPolisi: "E 1111 GH",
    nomorMesin: "MITSUDL4567",
    nomorRangka: "MH4COLT9876RNG",
    warna: "Kuning",
    hargaPembelian: 350000000,
    tahunPembuatan: "2019",
    kategori: "R4",
    pajak: "2024-08-05",
    pemegang: "Dewi Sartika",
    nik: "3210120405840004",
    penggunaan: "Distribusi",
    kondisi: "Kurang Baik",
  },
  {
    id: 5,
    qrCode: "QRK005",
    gambar: "beat.jpg",
    merek: "Honda Beat",
    nomorPolisi: "Z 2222 JK",
    nomorMesin: "BEAT0987HNDA",
    nomorRangka: "MH4BEAT0987JKL",
    warna: "Merah",
    hargaPembelian: 17000000,
    tahunPembuatan: "2023",
    kategori: "R2",
    pajak: "2026-02-28",
    pemegang: "Lia Amalia",
    nik: "3208032201970005",
    penggunaan: "Operasional",
    kondisi: "Baik",
  },
  {
    id: 6,
    qrCode: "QRK006",
    gambar: "fortuner.jpg",
    merek: "Toyota Fortuner",
    nomorPolisi: "B 9999 QWE",
    nomorMesin: "FORTN789TOY",
    nomorRangka: "MHKTN89FRT0099",
    warna: "Putih",
    hargaPembelian: 550000000,
    tahunPembuatan: "2021",
    kategori: "R4",
    pajak: "2025-12-10",
    pemegang: "Rudi Hartono",
    nik: "3273071603770006",
    penggunaan: "Pimpinan",
    kondisi: "Baik",
  },
];

export default function TableKendaraan() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);

  const filteredData = tableData
    .filter((item) => item.merek.toLowerCase().includes(search.toLowerCase()))
    .slice(0, rows);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleExportExcel = () => {
    const data = filteredData.map((item) => ({
      "QR Code": item.qrCode,
      Gambar: item.gambar,
      Merek: item.merek,
      "No. Polisi": item.nomorPolisi,
      "No. Mesin": item.nomorMesin,
      "No. Rangka": item.nomorRangka,
      Warna: item.warna,
      "Harga Pembelian": item.hargaPembelian,
      "Tahun Pembuatan": item.tahunPembuatan,
      Kategori: item.kategori,
      Pajak: item.pajak,
      Pemegang: item.pemegang,
      NIK: item.nik,
      Penggunaan: item.penggunaan,
      Kondisi: item.kondisi,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Kendaraan");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, "data-kendaraan.xlsx");
  };
  const handleExportPDF = () => {
    const doc = new jsPDF();

    const tableColumn = [
      "QR Code",
      "Merek",
      "No. Polisi",
      "No. Mesin",
      "No. Rangka",
      "Warna",
      "Harga",
      "Tahun",
      "Kategori",
      "Pajak",
      "Pemegang",
      "NIK",
      "Penggunaan",
      "Kondisi",
    ];

    const tableRows = filteredData.map((item) => [
      item.qrCode,
      item.merek,
      item.nomorPolisi,
      item.nomorMesin,
      item.nomorRangka,
      item.warna,
      `Rp ${item.hargaPembelian.toLocaleString("id-ID")}`,
      item.tahunPembuatan,
      item.kategori,
      new Date(item.pajak).toLocaleDateString("id-ID"),
      item.pemegang,
      item.nik,
      item.penggunaan,
      item.kondisi,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
    });

    doc.save("data-kendaraan.pdf");
  };

  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <AddButton onClick={openModal} />
          {isModalOpen && <KendaraanFormInputModal onClose={closeModal} />}
          <RowsSelector value={rows} onChange={setRows} />
        </div>

        <div className="flex gap-2 items-center">
          <SearchInput value={search} onChange={setSearch} />
          <ExcelButton onClick={handleExportExcel} />
          <PDFButton onClick={handleExportPDF} />
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px] max-h-[500px] overflow-y-auto">
          <Table>
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
                  No. Polisi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  No. Mesin
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  No. Rangka
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
                  Tahun Pembuatan
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Kategori
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
                  Pemegang
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  NIK
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
                  className="px-6 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.map((kendaraanData) => (
                <TableRow key={kendaraanData.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.qrCode}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <img
                      src={kendaraanData.gambar}
                      alt="Gambar Kendaraan"
                      className="w-16 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.merek}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.nomorPolisi}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.nomorMesin}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.nomorRangka}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.warna}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {`Rp ${kendaraanData.hargaPembelian.toLocaleString(
                      "id-ID"
                    )}`}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.tahunPembuatan}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.kategori}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(kendaraanData.pajak).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.pemegang}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.nik}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.penggunaan}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        kendaraanData.kondisi === "Baik"
                          ? "bg-green-100 text-green-700"
                          : kendaraanData.kondisi === "Perlu Servis"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {kendaraanData.kondisi}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <ServiceButton
                        onClick={() =>
                          navigate(`/service-kendaraan/${kendaraanData.id}`)
                        }
                      />
                      <EditButton
                        onClick={() => console.log("Edit", kendaraanData.id)}
                      />
                      <DeleteButton
                        onClick={() => console.log("Delete", kendaraanData.id)}
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
