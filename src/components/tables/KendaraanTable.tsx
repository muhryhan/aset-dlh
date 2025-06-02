import { useEffect, useState } from "react";
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
import KendaraanFormInputModal from "../../pages/Modals/KendaraanInputModal";
// import api from "../../../services/api";
import { kendaraanData, KendaraanData } from "../../dataDummy/kendaraanData";

const tableData: KendaraanData[] = kendaraanData;

export default function TableKendaraan() {
  const [kendaraanData, setKendaraanData] = useState<KendaraanData[]>([]);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //  fetch dari API
  // useEffect(() => {
  //   const fetchKendaraan = async () => {
  //     try {
  //       const response = await api.get("/api/kendaraan"); // sesuaikan endpoint backend-mu
  //       setKendaraanData(response.data);
  //     } catch (error) {
  //       console.error("Gagal ambil data kendaraan", error);
  //     }
  //   };

  //   fetchKendaraan();
  // }, []);


  useEffect(() => {
  // Simulasi fetch data dari backend
  const dummyData: KendaraanData[] = kendaraanData;

  setKendaraanData(dummyData);
}, [kendaraanData]);

  const filteredData = tableData
    .filter((item) =>
      item.merek.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, rows);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleExportExcel = () => {
    const data = filteredData.map((item) => ({
      "QR Code": item.qrCode,
      Gambar: item.gambar,
      Merek: item.merek,
      "No. Polisi": item.nomorPolisi,
      "No. Mesin": item.nomorMesin,
      "No. Rangka": item.nomorRangka,
      Warna: item.warna,
      "Harga Pembelian": item.hargaPembelian,
      "Tahun Pembuatan": item.tahunPembuatan,
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

    const tableColumn = [
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

    const tableRows = filteredData.map((item) => [
      item.qrCode,
      item.merek,
      item.nomorPolisi,
      item.nomorMesin,
      item.nomorRangka,
      item.warna,
      `Rp ${item.hargaPembelian.toLocaleString("id-ID")}`,
      item.tahunPembuatan,
      item.kategori,
      new Date(item.pajak).toLocaleDateString("id-ID"),
      item.pemegang,
      item.nik,
      item.penggunaan,
      item.kondisi,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
    });

    doc.save("data-kendaraan.pdf");
  };

  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <AddButton onClick={openModal} />
          {isModalOpen && <KendaraanFormInputModal onClose={closeModal} />}
          <RowsSelector value={rows} onChange={setRows} />
        </div>

        <div className="flex gap-2 items-center">
          <SearchInput value={search} onChange={setSearch} />
          <ExcelButton onClick={handleExportExcel} />
          <PDFButton onClick={handleExportPDF} />
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px] max-h-[500px] overflow-y-auto">
          <Table>
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
                  No. Polisi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  No. Mesin
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  No. Rangka
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
                  Pemegang
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  NIK
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
                  className="px-6 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.map((kendaraanData) => (
                <TableRow key={kendaraanData.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.qrCode}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <img
                      src={kendaraanData.gambar}
                      alt="Gambar Kendaraan"
                      className="w-16 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.merek}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.nomorPolisi}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.nomorMesin}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.nomorRangka}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.warna}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {`Rp ${kendaraanData.hargaPembelian.toLocaleString(
                      "id-ID"
                    )}`}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.tahunPembuatan}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.kategori}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(kendaraanData.pajak).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.pemegang}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.nik}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {kendaraanData.penggunaan}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        kendaraanData.kondisi === "Baik"
                          ? "bg-green-100 text-green-700"
                          : kendaraanData.kondisi === "Perlu Servis"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {kendaraanData.kondisi}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <ServiceButton
                        onClick={() =>
                          navigate(`/service-kendaraan/${kendaraanData.id}`)
                        }
                      />
                      <EditButton
                        onClick={() => console.log("Edit", kendaraanData.id)}
                      />
                      <DeleteButton
                        onClick={() => console.log("Delete", kendaraanData.id)}
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
