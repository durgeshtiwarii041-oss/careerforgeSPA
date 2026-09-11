import React, { useState, useMemo } from "react";
import { Grid, List } from "lucide-react";
import CourseCard from "../components/CourseCard";
import FilterBar from "../components/FilterBar";
import { courses } from "../data/courses";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("relevance");

  const filtered = useMemo(() => {
    let list = courses.filter(c => {
      const q = search.toLowerCase();
      if (q && !c.title.toLowerCase().includes(q) && !c.instructor.toLowerCase().includes(q) && !c.skills.some(s => s.toLowerCase().includes(q))) return false;
      if (filters.category && c.category !== filters.category) return false;
      if (filters.level && c.level !== filters.level) return false;
      if (filters.type && ((filters.type === "Live" && !c.live) || (filters.type === "Recorded" && c.live))) return false;
      return true;
    });
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "newest") list = [...list].sort((a, b) => b.id - a.id);
    return list;
  }, [search, filters, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">All Courses</h1>
        <p className="text-slate-500">Job-focused courses with live sessions, projects and certificates.</p>
      </div>
      <FilterBar search={search} onSearch={setSearch} placeholder="Search courses, skills..."
        filters={[
          { key: "category", label: "Category", options: ["Frontend", "Backend", "Full Stack", "Data Science", "Data Analytics", "AI/ML", "Design", "DSA", "Marketing"] },
          { key: "level", label: "Level", options: ["Beginner", "Intermediate", "Advanced"] },
          { key: "type", label: "Type", options: ["Live", "Recorded"] },
        ]}
        activeFilters={filters} onFilter={(k, v) => setFilters(p => ({ ...p, [k]: v }))} />
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-slate-500">{filtered.length} courses found</p>
        <div className="flex items-center gap-3">
          <select value={sort} onChange={e => setSort(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="relevance">Relevance</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Newest</option>
          </select>
          <div className="flex border border-slate-300 rounded-lg overflow-hidden">
            <button onClick={() => setView("grid")} className={`p-2 ${view === "grid" ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}><Grid size={16} /></button>
            <button onClick={() => setView("list")} className={`p-2 ${view === "list" ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}><List size={16} /></button>
          </div>
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-medium">No courses found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" : "space-y-4"}>
          {filtered.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      )}
    </div>
  );
}
