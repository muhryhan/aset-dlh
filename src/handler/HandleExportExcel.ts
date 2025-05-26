import * as XLSX from "xlsx";

/**
 * Export data ke file Excel
 * @param data Array of objects (hasil filter/pencarian)
 * @param fileName Nama file output (default: "filtered-data.xlsx")
 */
export const handleExportExcel = <T extends Record<string, unknown>>(
  data: T[],
  fileName: string = "filtered-data.xlsx"
): void => {
  if (!data || data.length === 0) {
    console.warn("Tidak ada data yang bisa diekspor ke Excel.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, fileName);
};