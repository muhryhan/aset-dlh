import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function handleExportPdf(
  headers: string[],
  rows: any[][],
  filename: string
) {
  const doc = new jsPDF();
  autoTable(doc, { head: [headers], body: rows, styles: { fontSize: 8 } });
  doc.save(`${filename}.pdf`);
}
