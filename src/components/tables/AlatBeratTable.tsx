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
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AddButton from "../ui/button/AddBtn";
import ExcelButton from "../ui/button/ExcelBtn";
import PDFButton from "../ui/button/PdfBtn";
import SearchInput from "../ui/search/Search";
import RowsSelector from "../ui/rowsSelector/rowsSelector";
import { useNavigate } from "react-router-dom";
import AlatBeratFormInputModal from "../modals/AlatBeratInput";
import api from "../../services/api";
import { Link } from "react-router-dom";

type AlatBeratData = {
  id_alatberat: number;
  qrcode: string;
  gambar: string;
  merek: string;
  no_registrasi: string;
  no_mesin: string;
  no_rangka: string;
  warna: string;
  harga_pembelian: number;
  tahun_pembuatan: number;
  kategori: string;
  pajak: string;
  penggunaan: string;
  kondisi: string;
};

export default function TableAlatBerat() {
  const [alatBeratData, setAlatBeratData] = useState<AlatBeratData[]>([]);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await api.get("/api/alatberat"); // url sementara
      setAlatBeratData(response.data.data);
    } catch (err) {
      console.error("Gagal mengambil data alat berat:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = alatBeratData
    .filter((item) => item.merek.toLowerCase().includes(search.toLowerCase()))
    .slice(0, rows);

  const handleEdit = (id_alatberat: number) => {
    navigate(`/edit-alatberat/${id_alatberat}`);
  };

  const handleDelete = async (id_alatberat: number) => {
    if (confirm("Yakin ingin menghapus alat berat ini?")) {
      try {
        await api.delete(`/api/alatberat/${id_alatberat}`);
        setAlatBeratData((prev) =>
          prev.filter((item) => item.id_alatberat !== id_alatberat)
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
      "No. Registrasi": item.no_registrasi,
      "No. Mesin": item.no_mesin,
      "No. Rangka": item.no_rangka,
      Warna: item.warna,
      "Harga Pembelian": item.harga_pembelian,
      "Tahun Pembuatan": item.tahun_pembuatan,
      Kategori: item.kategori,
      Pajak: item.pajak,
      Penggunaan: item.penggunaan,
      Kondisi: item.kondisi,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Alat Berat");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, "data-alatberat.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    const tableColumn = [
      "QR Code",
      "Merek",
      "No. Registrasi",
      "No. Mesin",
      "No. Rangka",
      "Warna",
      "Harga Pembelian",
      "Tahun Pembuatan",
      "Kategori",
      "Pajak",
      "Penggunaan",
      "Kondisi",
    ];

    const tableRows = filteredData.map((item) => [
      item.qrcode,
      item.merek,
      item.no_registrasi,
      item.no_mesin,
      item.no_rangka,
      item.warna,
      `Rp ${item.harga_pembelian.toLocaleString("id_alatberat-ID")}`,
      item.tahun_pembuatan,
      item.kategori,
      item.pajak
        ? new Date(item.pajak).toLocaleDateString("id_alatberat-ID")
        : "-",
      item.penggunaan,
      item.kondisi,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
    });

    doc.save("data-alatberat.pdf");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <AddButton onClick={() => setIsModalOpen(true)} />
          {isModalOpen && (
            <AlatBeratFormInputModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => {
                setIsModalOpen(false);
                fetchData();
              }}
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
      {loading && <p className="p-4 text-gray-500">Loading data...</p>}
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
                  No Mesin
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  No Rangka
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
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id_alatberat}>
                    <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                      <Link
                        to={`http://localhost:3000/static/uploads/alat-berat/qrcode/${item.qrcode}`}
                      >
                        Lihat
                      </Link>
                    </TableCell>
                    <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                      <Link
                        to={`http://localhost:3000/static/uploads/alat-berat/${item.gambar}`}
                      >
                        Lihat
                      </Link>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.merek}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.no_registrasi}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.no_mesin}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.no_rangka}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.warna}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      Rp {item.harga_pembelian.toLocaleString("id-ID")}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.tahun_pembuatan}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.kategori}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.pajak
                        ? new Date(item.pajak).toLocaleDateString("id-ID")
                        : "-"}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.penggunaan}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.kondisi}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <ServiceButton
                          onClick={() =>
                            navigate(`/service-alat-berat/${item.id_alatberat}`)
                          }
                        />
                        <EditButton
                          onClick={() => handleEdit(item.id_alatberat)}
                        />
                        <DeleteButton
                          onClick={() => handleDelete(item.id_alatberat)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-center py-5 text-gray-500">
                    Tidak ada data yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
