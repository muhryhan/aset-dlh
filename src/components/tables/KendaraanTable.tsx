import { useSearch } from "../../hooks/useSearch";
import { usePagination } from "../../hooks/usePagination";
import { useFetch } from "../../hooks/useFetch";
import { handleExportExcel } from "../../handler/handleExportExcel";
import { handleExportPdf } from "../../handler/handleExportPdf";

import AddButton from "../ui/button/AddBtn";
import ExcelButton from "../ui/button/ExcelBtn";
import PDFButton from "../ui/button/PdfBtn";
import SearchInput from "../ui/search/Search";
import {
  ServiceButton,
  EditButton,
  DeleteButton,
} from "../ui/button/ActionBtn";

import api from "../../services/api";
import KendaraanInputModal from "../modals/KendaraanInput";
import { AssetTable } from "./AssetTable";

import { KendaraanData } from "../../types/kendaraan";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function   KendaraanTable() {
  const { data, setData, loading, fetchData } =
    useFetch<KendaraanData>("/api/kendaraan");
  const { search, setSearch, filtered } = useSearch(
    data,
    (item, query) =>
      item.merek.toLowerCase().includes(query) ||
      item.no_polisi.toLowerCase().includes(query) ||
      item.warna.toLowerCase().includes(query) ||
      item.pemegang.toLowerCase().includes(query) ||
      item.penggunaan.toLowerCase().includes(query) ||
      item.kondisi.toLowerCase().includes(query) ||
      item.kategori.toLowerCase().includes(query) ||
      item.tahun_pembuatan.toString().includes(query)
  );

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    getPageNumbers,
  } = usePagination(filtered);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<KendaraanData | null>(null);

  const columns = [
    {
      header: "QR Code",
      accessor: (d: KendaraanData) => (
        <a
          href={`http://localhost:3000/static/uploads/kendaraan/qrcode/${d.qrcode}`}
          target="_blank"
          className="text-blue-500 underline"
        >
          Lihat
        </a>
      ),
    },
    {
      header: "Gambar",
      accessor: (d: KendaraanData) => (
        <a
          href={`http://localhost:3000/static/uploads/kendaraan/${d.gambar}`}
          target="_blank"
          className="text-blue-500 underline"
        >
          Lihat
        </a>
      ),
    },
    { header: "Merek", accessor: (d: KendaraanData) => d.merek },
    { header: "No. Polisi", accessor: (d: KendaraanData) => d.no_polisi },
    { header: "Warna", accessor: (d: KendaraanData) => d.warna },
    {
      header: "Harga",
      accessor: (d: KendaraanData) =>
        `Rp ${d.harga_pembelian.toLocaleString("id-ID")}`,
    },
    { header: "Tahun", accessor: (d: KendaraanData) => d.tahun_pembuatan },
    { header: "Kategori", accessor: (d: KendaraanData) => d.kategori },
    {
      header: "Pajak",
      accessor: (d: KendaraanData) =>
        d.pajak ? new Date(d.pajak).toLocaleDateString("id-ID") : "-",
    },
    { header: "Pemegang", accessor: (d: KendaraanData) => d.pemegang },
    { header: "Penggunaan", accessor: (d: KendaraanData) => d.penggunaan },
    { header: "Kondisi", accessor: (d: KendaraanData) => d.kondisi },
  ];

  const actions = (item: KendaraanData) => (
    <div className="flex items-center gap-2">
      <ServiceButton
        onClick={() => navigate(`/servis/nounik/${item.no_polisi}`)}
      />
      <EditButton
        onClick={async () => {
          const res = await api.get(`/api/kendaraan/${item.no_polisi}`);
          setSelected(res.data.data);
          setIsModalOpen(true);
        }}
      />
      <DeleteButton
        onClick={async () => {
          if (confirm("Yakin ingin menghapus kendaraan ini?")) {
            await api.delete(`/api/kendaraan/${item.id_kendaraan}`);
            setData((prev) =>
              prev.filter((k) => k.id_kendaraan !== item.id_kendaraan)
            );
          }
        }}
      />
    </div>
  );

  const exportHeaders = columns.map((col) => col.header);
  const exportRows = filtered.map((d) => columns.map((col) => col.accessor(d)));

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <AddButton
            onClick={() => {
              setSelected(null);
              setIsModalOpen(true);
            }}
          />
        </div>
        <div className="flex gap-2 items-center">
          <SearchInput value={search} onChange={setSearch} />
          <ExcelButton
            onClick={() => handleExportExcel(filtered, "data-kendaraan")}
          />
          <PDFButton
            onClick={() =>
              handleExportPdf(exportHeaders, exportRows, "data-kendaraan")
            }
          />
        </div>
      </div>

      {isModalOpen && (
        <KendaraanInputModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchData();
          }}
          initialData={selected ?? undefined}
        />
      )}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <AssetTable
            data={paginatedData}
            columns={columns}
            actions={actions}
          />
          {/* Pagination */}
          <div className="flex justify-center mt-4 items-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 mr-5"
            >
              &lt;
            </button>
            {getPageNumbers().map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`px-3 py-1 rounded ${
                  n === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 ml-5"
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}
