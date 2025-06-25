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

interface SerberAcData {
  idSerberac: number;
  noRegistrasi: string;
  cuci: string;
}

const tableData: SerberAcData[] = [
  {
    idSerberac: 1,
    noRegistrasi: "Basdk1234sahkdZ",
    cuci: "5 x",
  },
  {
    idSerberac: 2,
    noRegistrasi: "Dasdnjsa5678Adanaksdj",
    cuci: "2 x",
  },
];

export default function SerberAc() {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);

  const filteredData = tableData.filter((SerberAc) =>
    SerberAc.noRegistrasi.toLowerCase().includes(search.toLowerCase())
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
                  Cuci
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
              {filteredData.map((SerberAc) => (
                <TableRow key={SerberAc.idSerberac}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm font-medium text-gray-800 dark:text-white/90">
                    {SerberAc.noRegistrasi}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {SerberAc.cuci}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <EditButton
                        onClick={() => console.log("Edit", SerberAc.idSerberac)}
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
