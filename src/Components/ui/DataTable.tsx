'use client';

import { memo } from 'react';

interface Column {
  key: string;
  label: string;
  render?: (value: string | number, row: Record<string, string | number>) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: Record<string, string | number>[];
  maxHeight?: string;
}

const DataTable: React.FC<DataTableProps> = memo(({
  title,
  columns,
  data,
  maxHeight = '400px',
}) => {
  return (
    <div className="bg-linear-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
      <h3 className="text-base sm:text-lg font-semibold text-white mb-4 text-right">{title}</h3>
      <div className="overflow-x-auto" style={{ maxHeight }}>
        <table className="w-full text-sm text-right">
          <thead className="sticky top-0 bg-gray-800 text-gray-300 text-xs uppercase">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-semibold">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-800/50 transition-colors duration-150"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-gray-200">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

DataTable.displayName = 'DataTable';

export default DataTable;
