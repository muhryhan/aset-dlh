import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
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

import { EditButton, DeleteButton } from "../../ui/button/ActionBtn";

import AddButton from "../../ui/button/AddBtn";
import ExcelButton from "../../ui/button/ExcelBtn";
import PDFButton from "../../ui/button/PdfBtn";
import SearchInput from "../../ui/search/Search";

import ServisKendaraanFormInputModal from "../../../pages/Modals/ServisKendaraanInputModal";
import api from "../../../../services/api";

interface Onderdil {
  id_onderdil: number;
  nama_onderdil: string;
  jumlah: number;
  harga: number;
}

export interface ServisKendaraanData {
  id_servis: number | null;
  tanggal: string;
  no_unik: string;
  nama_bengkel: string;
  biaya_servis: number;
  nota_pembayaran: string;
  dokumentasi: string;
  onderdil: Onderdil[];
}

export default function ServisKendaraan() {
  const { no_polisi } = useParams<{ no_polisi: string }>();
  const [servisData, setServisData] = useState<ServisKendaraanData[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServis, setSelectedServis] =
    useState<ServisKendaraanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const formatTanggal = (value: string | Date | null | undefined): string => {
    if (!value) return "-";
    const date = typeof value === "string" ? new Date(value) : value;
    if (isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  // Fetch data
  const fetchData = useCallback(async () => {
    if (!no_polisi) return;

    setLoading(true); // pastikan loading nyala saat refetch
    try {
      const response = await api.get(`/api/servis/nounik/${no_polisi}`);
      setServisData(response.data.data);
    } catch (err) {
      console.error("Gagal mengambil data servis kendaraan:", err);
    } finally {
      setLoading(false);
    }
  }, [no_polisi]);

  useEffect(() => {
    fetchData();
    setCurrentPage(1);
  }, [fetchData, search]);

  // Handle filtered view
  const filteredData = servisData.filter((item) => {
    const searchLower = search.toLowerCase();
    const formattedDate = new Date(item.tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    return (
      formattedDate.toLowerCase().includes(searchLower) ||
      item.nama_bengkel.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id_servis: number | null) => {
    if (!id_servis) {
      console.warn("ID servis tidak valid, tidak bisa menghapus.");
      return;
    }

    const confirmDelete = confirm("Yakin ingin menghapus servis ini?");
    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/api/servis/${id_servis}`);
      if (response.status === 200) {
        // Perbarui state lokal
        setServisData((prev) =>
          prev.filter((item) => item.id_servis !== id_servis)
        );
        console.log("Berhasil menghapus servis dengan ID:", id_servis);
      } else {
        console.warn("Respons tidak sukses saat menghapus:", response.status);
      }
    } catch (err) {
      console.error("Gagal menghapus data servis:", err);
    }
  };

  const handleExportExcel = () => {
    const data = filteredData.map((item) => ({
      "No. Polisi": item.no_unik,
      Tanggal: item.tanggal,
      "Nama Bengkel": item.nama_bengkel,
      "Biaya Servis": item.biaya_servis,
      "Nota Pembayaran": item.nota_pembayaran,
      Dokumentasi: item.dokumentasi,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Servis Kendaraan");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, "data-servis-kendaraan.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const headers = [
      "No. Polisi",
      "Tanggal",
      "Nama Bengkel",
      "Biaya Servis",
      "Nota Pembayaran",
      "Dokumentasi",
    ];

    const rows = filteredData.map((item) => [
      item.no_unik,
      item.tanggal,
      item.nama_bengkel,
      `Rp ${item.biaya_servis.toLocaleString("id-ID")}`,
      item.nota_pembayaran,
      item.dokumentasi,
    ]);

    autoTable(doc, {
      head: [headers],
      body: rows,
      styles: { fontSize: 8 },
    });

    doc.save("data-servis-kendaraan.pdf");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <AddButton
            onClick={() => {
              setSelectedServis(null);
              setIsModalOpen(true);
            }}
          />
          {isModalOpen && (
            <ServisKendaraanFormInputModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              no_polisi={no_polisi}
              onSuccess={() => {
                setIsModalOpen(false);
                setServisData([]);
                fetchData();
              }}
              initialData={selectedServis ?? undefined}
            />
          )}
        </div>
        <div className="flex gap-2 items-center">
          <SearchInput value={search} onChange={setSearch} />
          <ExcelButton onClick={handleExportExcel} />
          <PDFButton onClick={handleExportPDF} />
        </div>
      </div>
      {loading && (
        <p className="p-4 text-gray-500 dark:text-white">Loading data...</p>
      )}
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
                  Nomor Polisi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Tanggal
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Nama Bengkel
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Biaya Servis
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Nota Pembayaran
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Dokumentasi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Onderdil
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Jumlah
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Harga
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Total Harga
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
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={11}
                    className="px-5 py-3 text-center text-gray-400 italic text-theme-sm dark:text-gray-500"
                  >
                    Tidak ada data
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item) => {
                  const hasOnderdil = item.onderdil && item.onderdil.length > 0;
                  const rowSpan = hasOnderdil ? item.onderdil.length : 1;
                  return hasOnderdil ? (
                    item.onderdil.map((onderdil, index) => (
                      <TableRow
                        key={`${item.id_servis}-${onderdil.id_onderdil}`}
                      >
                        {index === 0 && (
                          <>
                            <TableCell
                              rowSpan={rowSpan}
                              className="px-5 py-3 text-theme-sm align-top font-medium text-gray-600 dark:text-gray-400"
                            >
                              {item.no_unik}
                            </TableCell>
                            <TableCell
                              rowSpan={rowSpan}
                              className="px-5 py-3 text-theme-sm align-top font-medium text-gray-600 dark:text-gray-400"
                            >
                              {formatTanggal(item.tanggal)}
                            </TableCell>

                            <TableCell
                              rowSpan={rowSpan}
                              className="px-5 py-3 text-theme-sm align-top font-medium text-gray-600 dark:text-gray-400"
                            >
                              {item.nama_bengkel}
                            </TableCell>
                            <TableCell
                              rowSpan={rowSpan}
                              className="px-5 py-3 text-theme-sm align-top font-medium text-gray-600 dark:text-gray-400"
                            >
                              Rp {item.biaya_servis.toLocaleString("id-ID")}
                            </TableCell>
                            <TableCell
                              rowSpan={rowSpan}
                              className="px-5 py-3 text-theme-sm align-top font-medium text-gray-600 dark:text-gray-400"
                            >
                              <a
                                href={`http://localhost:3000/static/uploads/servis/nota/${item.nota_pembayaran}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                              >
                                Lihat
                              </a>
                            </TableCell>
                            <TableCell
                              rowSpan={rowSpan}
                              className="px-5 py-3 text-theme-sm align-top font-medium text-gray-600 dark:text-gray-400"
                            >
                              <a
                                href={`http://localhost:3000/static/uploads/servis/dokumentasi/${item.dokumentasi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                              >
                                Lihat
                              </a>
                            </TableCell>
                          </>
                        )}

                        {/* Kolom onderdil (satu baris per onderdil) */}
                        <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                          {onderdil.nama_onderdil}
                        </TableCell>
                        <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                          {onderdil.jumlah}
                        </TableCell>
                        <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                          Rp {onderdil.harga.toLocaleString("id-ID")}
                        </TableCell>

                        {index === 0 && (
                          <>
                            <TableCell
                              rowSpan={rowSpan}
                              className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400"
                            >
                              Rp{" "}
                              {(
                                item.biaya_servis +
                                item.onderdil.reduce(
                                  (sum, od) => sum + od.jumlah * od.harga,
                                  0
                                )
                              ).toLocaleString("id-ID")}
                            </TableCell>
                            <TableCell
                              rowSpan={rowSpan}
                              className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400"
                            >
                              <div className="flex items-center gap-2">
                                <EditButton
                                  onClick={() => {
                                    setSelectedServis(item);
                                    setIsModalOpen(true);
                                  }}
                                />
                                <DeleteButton
                                  onClick={() => handleDelete(item.id_servis)}
                                />
                              </div>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow key={item.id_servis}>
                      <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                        {item.no_unik}
                      </TableCell>
                      <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                        {formatTanggal(item.tanggal)}
                      </TableCell>
                      <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                        {item.nama_bengkel}
                      </TableCell>
                      <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                        Rp {item.biaya_servis.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                        <a
                          href={item.nota_pembayaran}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Lihat
                        </a>
                      </TableCell>
                      <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                        <a
                          href={item.dokumentasi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Lihat
                        </a>
                      </TableCell>
                      <TableCell
                        colSpan={4}
                        className="px-5 py-3 text-center text-gray-400 italic text-theme-sm dark:text-gray-500"
                      >
                        Tidak ada onderdil
                      </TableCell>
                      <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <EditButton
                            onClick={() => {
                              setSelectedServis(item);
                              setIsModalOpen(true);
                            }}
                          />
                          <DeleteButton
                            onClick={() => handleDelete(item.id_servis)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
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
