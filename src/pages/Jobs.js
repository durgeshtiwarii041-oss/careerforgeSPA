import React, { useState, useMemo } from "react";
import JobCard from "../components/JobCard";
import FilterBar from "../components/FilterBar";
import { jobs } from "../data/jobs";

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  const filtered = useMemo(() => jobs.filter(j => {
    const q = search.toLowerCase();
    if (q && !j.title.toLowerCase().includes(q) && !j.company.toLowerCase().includes(q) && !j.skills.some(s => s.toLowerCase().includes(q))) return false;
    if (filters.mode && j.mode !== filters.mode) return false;
    if (filters.type && j.type !== filters.type) return false;
    if (filters.location && j.location !== filters.location) return false;
    return true;
  }), [search, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Job Opportunities</h1>
        <p className="text-slate-500">Curated job listings for freshers and early-career professionals.</p>
      </div>
      <FilterBar search={search} onSearch={setSearch} placeholder="Search jobs, companies, skills..."
        filters={[
          { key: "mode", label: "Work Mode", options: ["Remote", "Hybrid", "On-site"] },
          { key: "type", label: "Type", options: ["Full-time", "Internship"] },
          { key: "location", label: "Location", options: ["Bangalore", "Mumbai", "Delhi", "Pune", "Hyderabad", "Chennai"] },
        ]}
        activeFilters={filters} onFilter={(k, v) => setFilters(p => ({ ...p, [k]: v }))} />
      <p className="text-sm text-slate-500 mb-5">{filtered.length} jobs found</p>
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <div className="text-5xl mb-4">💼</div>
          <p className="text-lg font-medium">No jobs found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(j => <JobCard key={j.id} job={j} />)}
        </div>
      )}
    </div>
  );
}
