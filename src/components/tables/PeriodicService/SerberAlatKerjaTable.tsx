import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { EditButton } from "../../ui/button/ActionBtn";
import { useState } from "react";
import ExcelButton from "../../ui/button/ExcelBtn";
import PDFButton from "../../ui/button/PdfBtn";
import SearchInput from "../../ui/search/Search";
import RowsSelector from "../../ui/rowsSelector/rowsSelector";

interface SerberAlatKerjaData {
  idSerberalatkerja: number;
  noRegistrasi: string;
  oliMesin: string;
}

const tableData: SerberAlatKerjaData[] = [
  {
    idSerberalatkerja: 1,
    noRegistrasi: "Basdk1234sahkdZ",
    oliMesin: "Shell Helix HX7",
  },
  {
    idSerberalatkerja: 2,
    noRegistrasi: "Dasdnjsa5678Adanaksdj",
    oliMesin: "Pertamina Fastron",
  },
];

export default function SerberAlatKerja() {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);

  const filteredData = tableData
    .filter((SerberAlatKerja) =>
      SerberAlatKerja.noRegistrasi.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, rows);

  const handleExportExcel = () => console.log("Export ke Excel Servis");
  const handleExportPDF = () => console.log("Export ke PDF Servis");

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
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
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400"
                >
                  No. Registrasi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400"
                >
                  Oli Mesin
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400"
                >
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.map((SerberAlatKerja) => (
                <TableRow key={SerberAlatKerja.idSerberalatkerja}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm font-medium text-gray-800 dark:text-white/90">
                    {SerberAlatKerja.noRegistrasi}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {SerberAlatKerja.oliMesin}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <EditButton
                        onClick={() =>
                          console.log("Edit", SerberAlatKerja.idSerberalatkerja)
                        }
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
