import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface AssetTableProps<T> {
  data: T[];
  columns: { header: string; accessor: (row: T) => React.ReactNode }[];
  actions?: (row: T) => React.ReactNode;
}

export function AssetTable<T>({ data, columns, actions }: AssetTableProps<T>) {
  return (
    <div className="max-w-full overflow-x-auto">
      <div className="min-w-[1102px]">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {columns.map((col, i) => (
                <TableCell
                  key={i}
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  {col.header}
                </TableCell>
              ))}
              {actions && (
                <TableCell
                  isHeader
                  className="px-5 py-3 font-bold text-gray-700 text-start text-theme-sm dark:text-gray-400"
                >
                  Aksi
                </TableCell>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col, idx) => (
                  <TableCell
                    key={idx}
                    className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400"
                  >
                    {col.accessor(row)}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-600 dark:text-gray-400">
                    {actions(row)}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
