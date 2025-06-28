import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function handleExportPdf(
  headers: string[],
  rows: unknown[][],
  filename: string
) {
  const stringifiedRows: string[][] = rows.map((row) =>
    row.map((cell) => {
      if (cell === null || cell === undefined) return "-";
      return String(cell);
    })
  );

  const doc = new jsPDF();
  autoTable(doc, {
    head: [headers],
    body: stringifiedRows,
    styles: { fontSize: 8 },
  });
  doc.save(`${filename}.pdf`);
}