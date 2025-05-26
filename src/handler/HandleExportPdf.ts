import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Export data ke file PDF
 * @param data Array of objects (hasil filter/pencarian)
 * @param fileName Nama file output
 */
export const handleExportPDF = <T extends Record<string, unknown>>(
  data: T[],
  fileName: string = "filtered-data.pdf"
) => {
  if (!data || data.length === 0) {
    console.warn("Tidak ada data yang bisa diekspor ke PDF.");
    return;
  }

  const doc = new jsPDF();

  const columns = Object.keys(data[0]);
  const rows = data.map((row) => columns.map((col) => String(row[col as keyof T] ?? "")));

  autoTable(doc, {
    head: [columns],
    body: rows,
  });

  doc.save(fileName);
};