import { useState, useEffect } from "react";
import axios from "axios";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);
  const [servisData, setServisData] = useState<ServisData[]>([]);

  const no_unik = "B1234XYZ"; // ⚠️ Ganti ini dengan no_unik yang diinginkan

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/servis/nounik/${no_unik}`);
      setServisData(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data servis:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = (servisData ?? []).filter((servis) =>
  servis?.tanggal?.toLowerCase().includes(search.toLowerCase()) ||
  servis?.no_unik?.toLowerCase().includes(search.toLowerCase())
).slice(0, rows);

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
            <ServisKendaraanFormInputModal onClose={closeModal} />
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
              {filteredData.map((item) => {
                const rowSpan = item.onderdil.length || 1;

                return item.onderdil.length > 0 ? (
                  item.onderdil.map((onder, index) => (
                    <TableRow key={`${item.id_servis}-${onder.id_onderdil}`}>
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

                      <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        {onder.nama_onderdil}
                      </TableCell>
                      <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        {onder.jumlah}
                      </TableCell>
                      <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Rp {onder.harga.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Rp{" "}
                        {(
                          onder.jumlah * onder.harga +
                          (index === 0 ? item.biaya_servis : 0)
                        ).toLocaleString("id-ID")}
                      </TableCell>

                      {index === 0 && (
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
                      colSpan={5}
                      className="px-5 py-3 text-center text-gray-400 italic text-theme-xs dark:text-gray-500"
                    >
                      Tidak ada onderdil
                    </TableCell>
                    <TableCell className="px-5 py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                      <div className="flex gap-2">
                        <EditButton
                          onClick={() => console.log("Edit", item.id_servis)}
                        />
                        <DeleteButton
                          onClick={() => console.log("Delete", item.id_servis)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
