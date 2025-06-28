import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DistributionButton,
  EditButton,
  DeleteButton,
  AddButton,
  ExcelButton,
  PDFButton,
} from "../ui/button/ActionButton";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SearchInput from "../ui/search/Search";
import RowsSelector from "../ui/rowsSelector/rowsSelector";
import { useNavigate } from "react-router-dom";
import TanamanFormInputModal from "../modals/TumbuhanInput";
import api from "../../services/api";
import { Link } from "react-router-dom";

type TanamanData = {
  id_tanaman: number;
  gambar: string;
  nama: string;
  jenis: string;
  stok: number;
  keterangan: string;
};

export default function Tumbuhan() {
  const [tanamanData, setTanamanData] = useState<TanamanData[]>([]);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await api.get("/api/tanaman"); // url sementara
      setTanamanData(response.data.data);
    } catch (err) {
      console.error("Gagal mengambil data tanaman:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = tanamanData
    .filter((item) => item.nama.toLowerCase().includes(search.toLowerCase()))
    .slice(0, rows);

  const handleEdit = (id_tanaman: number) => {
    navigate(`/edit-tanaman/${id_tanaman}`);
  };

  const handleDelete = async (id_tanaman: number) => {
    if (confirm("Yakin ingin menghapus tanaman ini?")) {
      try {
        await api.delete(`/api/tanaman/${id_tanaman}`);
        setTanamanData((prev) =>
          prev.filter((item) => item.id_tanaman !== id_tanaman)
        );
      } catch (err) {
        console.error("Gagal menghapus data:", err);
      }
    }
  };

  const handleExportExcel = () => {
    const data = filteredData.map((item) => ({
      Gambar: item.gambar,
      Nama: item.nama,
      Jenis: item.jenis,
      Stok: item.stok,
      Keterangan: item.keterangan,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tanaman");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, "data-tanaman.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    const tableColumn = ["Nama", "Jenis", "Stok", "Keterangan"];

    const tableRows = filteredData.map((item) => [
      item.nama,
      item.jenis,
      item.stok,
      item.keterangan,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
    });

    doc.save("data-tanaman.pdf");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <AddButton onClick={() => setIsModalOpen(true)} />
          {isModalOpen && (
            <TanamanFormInputModal
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
        {loading && <p className="p-4 text-gray-500">Loading data...</p>}
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
                  Gambar
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nama
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Jenis
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Stok
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
                  <TableRow key={item.id_tanaman}>
                    <TableCell className="px-5 py-3 text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                      <Link
                        to={`http://localhost:3000/uploads/tanaman/${item.gambar}`}
                      >
                        Lihat
                      </Link>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.nama}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.jenis}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.stok}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.keterangan}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <DistributionButton
                          onClick={() =>
                            navigate(`/distribusi-tumbuhan/${item.id_tanaman}`)
                          }
                        />
                        <EditButton
                          onClick={() => handleEdit(item.id_tanaman)}
                        />
                        <DeleteButton
                          onClick={() => handleDelete(item.id_tanaman)}
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
