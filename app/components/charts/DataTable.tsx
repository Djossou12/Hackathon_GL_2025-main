"use client";

interface Column {
  header: string;
  accessor: string;
  cell?: (value: unknown) => React.ReactNode;
}

interface DataTableProps {
  data: { [key: string]: unknown }[];
  columns: Column[];
  height?: number;
}

export function DataTable({ data, columns, height = 300 }: DataTableProps) {
  return (
    <div className="overflow-auto" style={{ height }}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((column) => (
                <td key={column.accessor} className="px-6 py-4 whitespace-nowrap">
                  {column.cell ? column.cell(row[column.accessor as keyof typeof row]) : String(row[column.accessor as keyof typeof row])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}