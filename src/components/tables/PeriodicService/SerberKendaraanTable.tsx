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

interface SerberKendaraanData {
  id_serberkendaraan: number;
  noPolisi: string;
  oliMesin: string;
  filterOliMesin: string;
  oliGardan: string;
  oliTransmisi: string;
  ban: string;
}

const tableData: SerberKendaraanData[] = [
  {
    id_serberkendaraan: 1,
    noPolisi: "B1234XYZ",
    oliMesin: "Shell Helix HX7",
    filterOliMesin: "Filter Bosch",
    oliGardan: "Castrol AXLE",
    oliTransmisi: "Castrol Manual T",
    ban: "Michelin Primacy 4",
  },
  {
    id_serberkendaraan: 2,
    noPolisi: "D5678ABC",
    oliMesin: "Pertamina Fastron",
    filterOliMesin: "Filter Sakura",
    oliGardan: "Shell Spirax",
    oliTransmisi: "Valvoline ATF",
    ban: "Bridgestone Turanza",
  },
  // Tambahkan entri lainnya jika perlu
];

export default function SerberKendaraan() {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);

  const filteredData = tableData.filter((SerberKendaraan) =>
    SerberKendaraan.noPolisi.toLowerCase().includes(search.toLowerCase())
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
                  No. Polisi
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
                  Filter Oli
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400"
                >
                  Oli Gardan
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400"
                >
                  Oli Transmisi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400"
                >
                  Ban
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
              {filteredData.map((SerberKendaraan) => (
                <TableRow key={SerberKendaraan.id_serberkendaraan}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm font-medium text-gray-800 dark:text-white/90">
                    {SerberKendaraan.noPolisi}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {SerberKendaraan.oliMesin}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {SerberKendaraan.filterOliMesin}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {SerberKendaraan.oliGardan}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {SerberKendaraan.oliTransmisi}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {SerberKendaraan.ban}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <EditButton
                        onClick={() =>
                          console.log(
                            "Edit",
                            SerberKendaraan.id_serberkendaraan
                          )
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
