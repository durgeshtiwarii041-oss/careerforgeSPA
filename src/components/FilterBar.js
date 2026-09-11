import React from "react";
import { Search, X } from "lucide-react";

export default function FilterBar({ search, onSearch, filters, activeFilters, onFilter, placeholder = "Search...", onClear }) {
  const hasActiveFilters = search || Object.values(activeFilters || {}).some(v => v);

  const handleClear = () => {
    onSearch("");
    filters.forEach(f => onFilter(f.key, ""));
    if (onClear) onClear();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => onSearch(e.target.value)} placeholder={placeholder} className="input pl-9" />
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {filters.map(f => (
          <select key={f.key} value={activeFilters[f.key] || ""} onChange={e => onFilter(f.key, e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option value="">{f.label}</option>
            {f.options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
        {hasActiveFilters && (
          <button onClick={handleClear} className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium">
            <X size={14} />Clear
          </button>
        )}
      </div>
    </div>
  );
}
