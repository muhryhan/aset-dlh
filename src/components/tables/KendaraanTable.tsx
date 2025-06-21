import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

import AddButton from "../ui/button/AddBtn";
import ExcelButton from "../ui/button/ExcelBtn";
import PDFButton from "../ui/button/PdfBtn";
import SearchInput from "../ui/search/Search";

import KendaraanInputModal from "../../pages/Modals/KendaraanInputModal";
import api from "../../../services/api";

export interface KendaraanData {
  id_kendaraan: number;
  qrcode: string;
  gambar: string;
  merek: string;
  no_polisi: string;
  no_mesin: string;
  no_rangka: string;
  warna: string;
  harga_pembelian: number;
  tahun_pembuatan: number;
  kategori: string;
  pajak: string;
  pemegang: string;
  nik: number;
  penggunaan: string;
  kondisi: string;
}

export default function TableKendaraan() {
  const [kendaraanData, setKendaraanData] = useState<KendaraanData[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKendaraan, setSelectedKendaraan] =
    useState<KendaraanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const getPageNumbers = () => {
    const visiblePages = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = startPage + visiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/api/kendaraan");
      setKendaraanData(response.data.data);
    } catch (err) {
      console.error("Gagal mengambil data kendaraan:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setCurrentPage(1);
  }, [search]);

  const filteredData = kendaraanData.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.merek.toLowerCase().includes(searchLower) ||
      item.no_polisi.toLowerCase().includes(searchLower) ||
      item.warna.toLowerCase().includes(searchLower) ||
      item.tahun_pembuatan.toString().includes(searchLower) ||
      item.kategori.toLowerCase().includes(searchLower) ||
      item.pemegang.toLowerCase().includes(searchLower) ||
      item.penggunaan.toLowerCase().includes(searchLower) ||
      item.kondisi.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = async (no_polisi: string) => {
    try {
      const response = await api.get(`/api/kendaraan/${no_polisi}`);
      setSelectedKendaraan(response.data.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Gagal fetch data untuk edit:", err);
    }
  };

  const handleDelete = async (id_kendaraan: number) => {
    if (confirm("Yakin ingin menghapus kendaraan ini?")) {
      try {
        await api.delete(`/api/kendaraan/${id_kendaraan}`);
        setKendaraanData((prev) =>
          prev.filter((item) => item.id_kendaraan !== id_kendaraan)
        );
      } catch (err) {
        console.error("Gagal menghapus data:", err);
      }
    }
  };

  const handleExportExcel = () => {
    const data = filteredData.map((item) => ({
      "QR Code": item.qrcode,
      Gambar: item.gambar,
      Merek: item.merek,
      "No. Polisi": item.no_polisi,
      "No. Mesin": item.no_mesin,
      "No. Rangka": item.no_rangka,
      Warna: item.warna,
      "Harga Pembelian": item.harga_pembelian,
      "Tahun Pembuatan": item.tahun_pembuatan,
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
    const headers = [
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

    const rows = filteredData.map((item) => [
      item.qrcode,
      item.merek,
      item.no_polisi,
      item.no_mesin,
      item.no_rangka,
      item.warna,
      `Rp ${item.harga_pembelian.toLocaleString("id-ID")}`,
      item.tahun_pembuatan,
      item.kategori,
      item.pajak ? new Date(item.pajak).toLocaleDateString("id-ID") : "-",
      item.pemegang,
      item.nik,
      item.penggunaan,
      item.kondisi,
    ]);

    autoTable(doc, {
      head: [headers],
      body: rows,
      styles: { fontSize: 8 },
    });

    doc.save("data-kendaraan.pdf");
  };

  const getKondisiTextColor = (kondisi: string) => {
    switch (kondisi) {
      case "Baik":
        return "text-green-600";
      case "Rusak Ringan":
        return "text-yellow-600";
      case "Rusak Berat":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <AddButton
            onClick={() => {
              setSelectedKendaraan(null);
              setIsModalOpen(true);
            }}
          />
          {isModalOpen && (
            <KendaraanInputModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => {
                setIsModalOpen(false);
                setKendaraanData([]);
                fetchData();
              }}
              initialData={selectedKendaraan ?? undefined}
            />
          )}
        </div>
        <div className="flex gap-2 items-center">
          <SearchInput value={search} onChange={setSearch} />
          <ExcelButton onClick={handleExportExcel} />
          <PDFButton onClick={handleExportPDF} />
        </div>
      </div>
      {loading && <p className="p-4 text-gray-500">Loading data...</p>}
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-xs dark:text-gray-400"
                >
                  QR Code
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-xs dark:text-gray-400"
                >
                  Gambar
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-xs dark:text-gray-400"
                >
                  Merek
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-xs dark:text-gray-400"
                >
                  No. Polisi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-xs dark:text-gray-400"
                >
                  Warna
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-xs dark:text-gray-400"
                >
                  Harga Pembelian
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-xs dark:text-gray-400"
                >
                  Tahun Pembuatan
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-xs dark:text-gray-400"
                >
                  Kategori
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-xs dark:text-gray-400"
                >
                  Pajak
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-xs dark:text-gray-400"
                >
                  Pemegang
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-xs dark:text-gray-400"
                >
                  Penggunaan
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-xs dark:text-gray-400"
                >
                  Kondisi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-center text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {(search ? filteredData : paginatedData).map((item) => (
                <TableRow key={item.id_kendaraan}>
                  <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                    <a
                      href={`http://localhost:3000/static/uploads/kendaraan/qrcode/${item.qrcode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat
                    </a>
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                    <a
                      href={`http://localhost:3000/static/uploads/kendaraan/${item.gambar}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat
                    </a>
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                    {item.merek}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                    {item.no_polisi}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                    {item.warna}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                    Rp {item.harga_pembelian.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                    {item.tahun_pembuatan}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                    {item.kategori}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                    {item.pajak
                      ? new Date(item.pajak).toLocaleDateString("id-ID")
                      : "-"}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                    {item.pemegang}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                    {item.penggunaan}
                  </TableCell>
                  <TableCell
                    className={`text-xs font-medium rounded-full px-3 py-1 ${getKondisiTextColor(
                      item.kondisi
                    )}`}
                  >
                    {item.kondisi}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-center text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <ServiceButton
                        onClick={() =>
                          navigate(
                            `/servis/nounik/${encodeURIComponent(
                              item.no_polisi
                            )}`
                          )
                        }
                      />
                      <EditButton onClick={() => handleEdit(item.no_polisi)} />
                      <DeleteButton
                        onClick={() => handleDelete(item.id_kendaraan)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-4 items-center">
            {/* Tombol kiri */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 mr-5"
            >
              &lt;
            </button>

            {/* Nomor halaman */}
            <div className="flex space-x-1">
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Tombol kanan */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 ml-5"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
