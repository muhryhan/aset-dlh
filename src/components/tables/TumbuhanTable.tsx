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
} from "../ui/button/ActionBtn";
import { useState, useEffect } from "react";
import AddButton from "../ui/button/AddBtn";
import ExcelButton from "../ui/button/ExcelBtn";
import PDFButton from "../ui/button/PdfBtn";
import SearchInput from "../ui/search/Search";
import RowsSelector from "../ui/rowsSelector/rowsSelector";
import { useNavigate } from "react-router-dom";
import TumbuhanFormInputModal from "../../pages/Modals/TumbuhanInputModal";
// import api from "../../../services/api";
import { tumbuhanData, TumbuhanData } from "../../dataDummy/tumbuhanData";

const tableData: TumbuhanData[] = tumbuhanData;

export default function Tumbuhan() {
  const [tumbuhanData, setTumbuhanData] = useState<TumbuhanData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);

  //  fetch dari API
    // useEffect(() => {
    //   const fetchTumbuhan = async () => {
    //     try {
    //       const response = await api.get("/api/tumbuhan");
    //       setTumbuhanData(response.data);
    //     } catch (error) {
    //       console.error("Gagal ambil data tumbuhan", error);
    //     }
    //   };
  
    //   fetchTumbuhan();
    // }, []);
  
  
    useEffect(() => {
    // Simulasi fetch data dari backend
    const dummyData: TumbuhanData[] = tumbuhanData;
  
    setTumbuhanData(dummyData);
  }, [tumbuhanData]);

  const filteredData = tableData
    .filter((item) =>
      item.nama.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, rows);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleExportExcel = () => console.log("Export ke Excel");
  const handleExportPDF = () => console.log("Export ke PDF");

  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <AddButton onClick={openModal} />
          {isModalOpen && <TumbuhanFormInputModal onClose={closeModal} />}
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
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <img
                      src={item.gambar}
                      alt={`Gambar ${item.nama}`}
                      className="h-10 w-10 object-cover rounded"
                    />
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
                          navigate(`/distribusi-tumbuhan/${item.id}`)
                        }
                      />
                      <EditButton
                        onClick={() => console.log("Edit", item.id)}
                      />
                      <DeleteButton
                        onClick={() => console.log("Delete", item.id)}
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
