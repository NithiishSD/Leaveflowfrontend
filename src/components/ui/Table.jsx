
import React from 'react';

export function Table({
  columns,
  data,
  emptyMessage = 'No data available',
  keyExtractor
}) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>);

  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map((column) =>
            <th
              key={column.key}
              className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${column.className || ''}`}>

                {column.header}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item) =>
          <tr
            key={keyExtractor(item)}
            className="hover:bg-gray-50 transition-colors">

              {columns.map((column) =>
            <td
              key={column.key}
              className={`px-4 py-4 text-sm text-gray-700 ${column.className || ''}`}>

                  {column.render ?
              column.render(item) :
              item[column.key]}
                </td>
            )}
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}