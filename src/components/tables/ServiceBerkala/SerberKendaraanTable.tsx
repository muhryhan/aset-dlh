import { useEffect, useState } from "react";
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
} from "../../ui/table";

import { EditButton } from "../../ui/button/ActionBtn";
import ExcelButton from "../../ui/button/ExcelBtn";
import PDFButton from "../../ui/button/PdfBtn";
import SearchInput from "../../ui/search/Search";
import SerberKendaraanModal from "../../modals/SerberKendaraanInput";
import api from "../../../services/api";

export interface SerberKendaraanData {
  id_serberkendaraan: number;
  no_polisi: string;
  oli_mesin: string;
  filter_oli_mesin: string;
  oli_gardan: string;
  oli_transmisi: string;
  ban: string;
}

export default function SerberKendaraanTable() {
  const [serberKendaraanData, setSerberKendaraanData] = useState<
    SerberKendaraanData[]
  >([]);
  const [selectedData, setSelectedData] = useState<SerberKendaraanData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      const response = await api.get("/api/servisberkalakendaraan");
      setSerberKendaraanData(response.data.data);
    } catch (err) {
      console.error("Gagal mengambil data servis berkala kendaraan:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setCurrentPage(1);
  }, [search]);

  const handleEdit = async (no_polisi: string) => {
    try {
      const response = await api.get(
        `/api/servisberkalakendaraan/${no_polisi}`
      );
      setSelectedData(response.data.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Gagal fetch data untuk edit:", err);
    }
  };

  const handleExportExcel = () => {
    const data = filteredData.map((item) => ({
      "Nomor Polisi": item.no_polisi,
      "Oli Mesin": item.oli_mesin,
      "Filter Oli Mesin": item.filter_oli_mesin,
      "Oli Gardan": item.oli_gardan,
      "Oli Transmisi": item.oli_transmisi,
      Ban: item.ban,
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

    saveAs(fileData, "data-servis-berkala-kendaraan.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const headers = [
      "Nomor Polisi",
      "Oli Mesin",
      "Filter Oli Mesin",
      "Oli Gardan",
      "Oli Transmisi",
      "Ban",
    ];

    const rows = filteredData.map((item) => [
      item.no_polisi,
      item.oli_mesin,
      item.filter_oli_mesin,
      item.oli_gardan,
      item.oli_transmisi,
      item.ban,
    ]);

    autoTable(doc, {
      head: [headers],
      body: rows,
      styles: { fontSize: 8 },
    });

    doc.save("data-servis-berkala-kendaraan.pdf");
  };

  const formattedDate = (tanggal: string | Date | null | undefined): string => {
    if (!tanggal) return "-";
    const date = new Date(tanggal);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  const filteredData = serberKendaraanData.filter((item) =>
    item.no_polisi.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = () => {
    const visiblePages = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = startPage + visiblePages - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          {isModalOpen && (
            <SerberKendaraanModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedData(null);
              }}
              onSuccess={() => {
                setIsModalOpen(false);
                setSelectedData(null);
                fetchData();
              }}
              initialData={selectedData ?? undefined}
            />
          )}
          <SearchInput value={search} onChange={setSearch} />
          <ExcelButton onClick={handleExportExcel} />
          <PDFButton onClick={handleExportPDF} />
        </div>
      </div>
      {loading && <p className="p-4 text-gray-500">Loading data...</p>}
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  No. Polisi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Oli Mesin
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Filter Oli Mesin
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Oli Gardan
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Oli Transmisi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Ban
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {(search ? filteredData : paginatedData).map((item) => (
                <TableRow key={item.id_serberkendaraan}>
                  <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                    {item.no_polisi}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                    {formattedDate(item.oli_mesin)}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                    {formattedDate(item.filter_oli_mesin)}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                    {formattedDate(item.oli_gardan)}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                    {formattedDate(item.oli_transmisi)}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                    {formattedDate(item.ban)}
                  </TableCell>
                  <TableCell className="px-5 py-3 text-center text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <EditButton onClick={() => handleEdit(item.no_polisi)} />
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
