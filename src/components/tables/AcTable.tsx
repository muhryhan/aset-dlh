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
import AcFormInputModal from "../modals/AcInput";
import api from "../../services/api";
import { Link } from "react-router-dom";

type AcData = {
  id_ac: number;
  qrcode: string;
  gambar: string;
  merek: string;
  no_registrasi: string;
  no_serial: string;
  ukuran: string;
  ruangan: string;
  asal: string;
  tahun_pembelian: number;
  harga_pembelian: number;
  kondisi: string;
  keterangan: string;
};

export default function TableAc() {
  const [acData, setAcData] = useState<AcData[]>([]);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await api.get("/api/ac"); // url sementara
      setAcData(response.data.data);
    } catch (err) {
      console.error("Gagal mengambil data ac:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = acData
    .filter((item) => item.merek.toLowerCase().includes(search.toLowerCase()))
    .slice(0, rows);

  const handleEdit = (id_ac: number) => {
    navigate(`/edit-ac/${id_ac}`);
  };

  const handleDelete = async (id_ac: number) => {
    if (confirm("Yakin ingin menghapus ac ini?")) {
      try {
        await api.delete(`/api/ac/${id_ac}`);
        setAcData((prev) => prev.filter((item) => item.id_ac !== id_ac));
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
      "No. Serial": item.no_serial,
      Ukuran: item.ukuran,
      Ruangan: item.ruangan,
      Asal: item.asal,
      "Tahun Pembelian": item.tahun_pembelian,
      "Harga Pembelian": item.harga_pembelian,
      Kondisi: item.kondisi,
      Keterangan: item.keterangan,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ac");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, "data-ac.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    const tableColumn = [
      "QR Code",
      "Merek",
      "No. Registrasi",
      "No. Serial",
      "Ukuran",
      "Ruangan",
      "Asal",
      "Tahun Pembelian",
      "Harga Pembelian",
      "Kondisi",
      "Keterangan",
    ];

    const tableRows = filteredData.map((item) => [
      item.qrcode,
      item.merek,
      item.no_registrasi,
      item.no_serial,
      item.ukuran,
      item.ruangan,
      item.asal,
      item.tahun_pembelian,
      `Rp ${item.harga_pembelian.toLocaleString("id_ac-ID")}`,
      item.kondisi,
      item.keterangan,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
    });

    doc.save("data-ac.pdf");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <AddButton onClick={() => setIsModalOpen(true)} />
          {isModalOpen && (
            <AcFormInputModal
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
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id_ac}>
                    <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                      <Link
                        to={`http://localhost:3000/static/uploads/ac/qrcode/${item.qrcode}`}
                      >
                        Lihat
                      </Link>
                    </TableCell>
                    <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                      <Link
                        to={`http://localhost:3000/static/uploads/ac/${item.gambar}`}
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
                      {item.no_serial}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.ukuran}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.ruangan}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.asal}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.tahun_pembelian}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      Rp {item.harga_pembelian.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.kondisi}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.keterangan}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <ServiceButton
                          onClick={() => navigate(`/service-ac/${item.id_ac}`)}
                        />
                        <EditButton onClick={() => handleEdit(item.id_ac)} />
                        <DeleteButton
                          onClick={() => handleDelete(item.id_ac)}
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
