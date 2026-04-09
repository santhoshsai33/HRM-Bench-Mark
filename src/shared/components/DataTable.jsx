import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  MoreVertical,
  MoreHorizontal,
  Search,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { cn } from '../utils/cn';
import Button from './Button';

const DataTable = ({
  columns,
  data,
  isLoading,
  pageSize = 10,
  onRowClick,
  onView,
  onEdit,
  onDelete,
  emptyMessage = "No records found.",
  actions,
  searchPlaceholder = "Search..."
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [activeMenuId, setActiveMenuId] = useState(null);

  useEffect(() => {
    const handleDocumentClick = () => setActiveMenuId(null);
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // Handle Filtering
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.accessor];
        return val ? String(val).toLowerCase().includes(searchTerm.toLowerCase()) : false;
      })
    );
  }, [data, columns, searchTerm]);

  // Handle Sorting
  const sortedData = useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  // Handle Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden">
      {/* Header / Toolbar */}
      <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-500/10 focus:bg-white transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {actions && <div className="flex items-center space-x-2">{actions}</div>}
      </div>

      {/* Table Content */}
      <div className="flex-grow overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-max">
          <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
            <tr className="border-b border-slate-100">
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400 cursor-pointer hover:text-slate-700 transition-colors"
                  onClick={() => requestSort(col.accessor)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{col.header}</span>
                    <ArrowUpDown className="w-3 h-3 opacity-30" />
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
               Array(5).fill(0).map((_, i) => (
                 <tr key={i} className="animate-pulse">
                    {columns.map((_, j) => (
                      <td key={j} className="px-6 py-4"><div className="h-4 bg-slate-100 rounded"></div></td>
                    ))}
                    <td className="px-6 py-4"></td>
                 </tr>
               ))
            ) : paginatedData.length > 0 ? (
               paginatedData.map((row, idx) => (
                <tr 
                  key={idx} 
                  className={cn(
                    "hover:bg-slate-50 transition-colors group cursor-pointer",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <td key={col.accessor} className="px-6 py-4 text-sm font-medium text-slate-600 whitespace-nowrap">
                       {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right relative" onClick={(e) => e.stopPropagation()}>
                    {onView || onEdit || onDelete ? (
                      <div className="relative inline-block text-left">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(activeMenuId === idx ? null : idx);
                          }}
                          className={cn(
                            "p-1.5 rounded-lg transition-colors flex items-center justify-center",
                            activeMenuId === idx ? "bg-primary-50 text-primary-600" : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                          )}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeMenuId === idx && (
                          <div className="absolute right-6 top-8 mt-1 w-36 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                            {onView && (
                              <button onClick={() => { onView(row); setActiveMenuId(null); }} className="w-full flex items-center px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <Eye className="w-3.5 h-3.5 mr-2" /> View Details
                              </button>
                            )}
                            {onEdit && (
                              <button onClick={() => { onEdit(row); setActiveMenuId(null); }} className="w-full flex items-center px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors">
                                <Edit className="w-3.5 h-3.5 mr-2" /> Edit Record
                              </button>
                            )}
                            {onDelete && (
                               <>
                                 {(onView || onEdit) && <div className="border-t border-slate-50 my-1"></div>}
                                 <button onClick={() => { onDelete(row); setActiveMenuId(null); }} className="w-full flex items-center px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
                                   <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
                                 </button>
                               </>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <button className="p-1 px-2 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
               ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-slate-50 rounded-full mb-3 text-slate-300">
                      <Search className="w-8 h-8" />
                    </div>
                    <p className="text-slate-500 font-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {!isLoading && totalPages > 0 && (
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="flex items-center space-x-2">
             <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 disabled:opacity-30 hover:bg-white hover:text-primary-600 transition-all shadow-sm"
             >
                <ChevronsLeft className="w-4 h-4" />
             </button>
             <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 disabled:opacity-30 hover:bg-white hover:text-primary-600 transition-all shadow-sm"
             >
                <ChevronLeft className="w-4 h-4" />
             </button>
             <div className="flex px-2 space-x-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={cn(
                        "w-8 h-8 rounded-lg text-xs font-bold transition-all shadow-sm",
                        currentPage === pageNum 
                          ? "bg-primary-600 text-white shadow-primary-200" 
                          : "bg-white text-slate-600 border border-slate-200 hover:border-primary-400 hover:text-primary-600"
                      )}
                    >
                      {pageNum}
                    </button>
                  );
                })}
             </div>
             <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 disabled:opacity-30 hover:bg-white hover:text-primary-600 transition-all shadow-sm"
             >
                <ChevronRight className="w-4 h-4" />
             </button>
             <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 disabled:opacity-30 hover:bg-white hover:text-primary-600 transition-all shadow-sm"
             >
                <ChevronsRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
