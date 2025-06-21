import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../services/api";

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
import RowsSelector from "../../ui/rowsSelector/rowsSelector";
import ServisKendaraanFormInputModal from "../../../pages/Modals/ServisKendaraanInputModal";

type Onderdil = {
  id_onderdil: number;
  nama_onderdil: string;
  jumlah: number;
  harga: number;
};

type ServisData = {
  id_servis: number;
  tanggal: string;
  no_unik: string;
  nama_bengkel: string;
  biaya_servis: number;
  nota_pembayaran: string;
  dokumentasi: string;
  onderdil: Onderdil[];
};

export default function ServisKendaraan() {
  const { no_polisi } = useParams<{ no_polisi: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);
  const [servisData, setServisData] = useState<ServisData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    if (!no_polisi) {
      setError("Nomor Polisi tidak ditemukan di URL.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await api.get(`/api/servis/nounik/${no_polisi}`);
        const data = response?.data?.data;

        if (data) {
          setServisData(data);
        } else {
          setError("Data kendaraan tidak ditemukan.");
        }
      } catch (err) {
        console.error("Gagal mengambil data servis kendaraan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [no_polisi]);

  // Handle filtered view
  const filteredData = servisData
    .filter(
      (item) =>
        item.tanggal.toLowerCase().includes(search.toLowerCase()) ||
        item.no_unik.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, rows);

  // UI Actions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleExportExcel = () => console.log("Export ke Excel Servis");
  const handleExportPDF = () => console.log("Export ke PDF Servis");

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <AddButton onClick={openModal} />
          {isModalOpen && (
            <ServisKendaraanFormInputModal
              onClose={closeModal}
              no_polisi={no_polisi}
            />
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
        {loading ? (
          <p className="p-4 text-gray-500">Memuat data...</p>
        ) : error ? (
          <p className="p-4 text-red-500">{error}</p>
        ) : (
          <div className="min-w-[1102px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Nomor Polisi
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
                    Nota Pembayaran
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Dokumentasi
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
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={11}
                      className="px-5 py-3 text-center text-gray-400 italic text-theme-xs dark:text-gray-500"
                    >
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => {
                    const hasOnderdil =
                      item.onderdil && item.onderdil.length > 0;
                    const rowSpan = hasOnderdil ? item.onderdil.length : 1;

                    // console.log(rowSpan);

                    return hasOnderdil ? (
                      item.onderdil.map((onderdil, index) => (
                        <TableRow
                          key={`${item.id_servis}-${onderdil.id_onderdil}`}
                        >
                          {index === 0 && (
                            <>
                              <TableCell
                                rowSpan={rowSpan}
                                className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                              >
                                {item.no_unik}
                              </TableCell>
                              <TableCell
                                rowSpan={rowSpan}
                                className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                              >
                                {item.tanggal}
                              </TableCell>
                              <TableCell
                                rowSpan={rowSpan}
                                className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                              >
                                {item.nama_bengkel}
                              </TableCell>
                              <TableCell
                                rowSpan={rowSpan}
                                className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                              >
                                Rp {item.biaya_servis.toLocaleString("id-ID")}
                              </TableCell>
                              <TableCell
                                rowSpan={rowSpan}
                                className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                              >
                                <a
                                  href={item.nota_pembayaran}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline"
                                >
                                  Lihat Nota
                                </a>
                              </TableCell>
                              <TableCell
                                rowSpan={rowSpan}
                                className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                              >
                                <a
                                  href={item.dokumentasi}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline"
                                >
                                  Lihat Foto
                                </a>
                              </TableCell>
                            </>
                          )}

                          {/* Kolom onderdil (satu baris per onderdil) */}
                          <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                            {onderdil.nama_onderdil}
                          </TableCell>
                          <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                            {onderdil.jumlah}
                          </TableCell>
                          <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                            Rp {onderdil.harga.toLocaleString("id-ID")}
                          </TableCell>

                          {index === 0 && (
                            <>
                              <TableCell
                                rowSpan={rowSpan}
                                className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400"
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
                                className="px-5 py-3 text-gray-500 text-theme-xs dark:text-gray-400"
                              >
                                <div className="flex items-center gap-2">
                                  <EditButton
                                    onClick={() =>
                                      console.log("Edit", item.id_servis)
                                    }
                                  />
                                  <DeleteButton
                                    onClick={() =>
                                      console.log("Delete", item.id_servis)
                                    }
                                  />
                                </div>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow key={item.id_servis}>
                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                          {item.no_unik}
                        </TableCell>
                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                          {item.tanggal}
                        </TableCell>
                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                          {item.nama_bengkel}
                        </TableCell>
                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                          Rp {item.biaya_servis.toLocaleString("id-ID")}
                        </TableCell>
                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                          <a
                            href={item.nota_pembayaran}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            Lihat Nota
                          </a>
                        </TableCell>
                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                          <a
                            href={item.dokumentasi}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            Lihat Foto
                          </a>
                        </TableCell>
                        <TableCell
                          colSpan={4}
                          className="px-5 py-3 text-center text-gray-400 italic text-theme-xs dark:text-gray-500"
                        >
                          Tidak ada onderdil
                        </TableCell>
                        <TableCell className="px-5 py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <EditButton
                              onClick={() =>
                                console.log("Edit", item.id_servis)
                              }
                            />
                            <DeleteButton
                              onClick={() =>
                                console.log("Delete", item.id_servis)
                              }
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
