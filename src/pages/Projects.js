import React, { useState, useMemo } from "react";
import ProjectCard from "../components/ProjectCard";
import FilterBar from "../components/FilterBar";
import { projects } from "../data/projects";

export default function Projects() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  const filtered = useMemo(() => projects.filter(p => {
    const q = search.toLowerCase();
    if (q && !p.title.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q) && !p.technologies.some(t => t.toLowerCase().includes(q))) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.difficulty && p.difficulty !== filters.difficulty) return false;
    if (filters.type && filters.type === "Guided" && !p.guided) return false;
    return true;
  }), [search, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Project Garage</h1>
        <p className="text-slate-500">Real-world projects to build your portfolio and demonstrate your skills.</p>
      </div>
      <FilterBar search={search} onSearch={setSearch} placeholder="Search projects, technologies..."
        filters={[
          { key: "category", label: "Category", options: ["Frontend", "Backend", "Full Stack", "Data Analytics", "Data Science", "AI/ML", "Design"] },
          { key: "difficulty", label: "Difficulty", options: ["Beginner", "Intermediate", "Advanced"] },
          { key: "type", label: "Type", options: ["Guided"] },
        ]}
        activeFilters={filters} onFilter={(k, v) => setFilters(p => ({ ...p, [k]: v }))} />
      <p className="text-sm text-slate-500 mb-5">{filtered.length} projects found</p>
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <div className="text-5xl mb-4">🛠️</div>
          <p className="text-lg font-medium">No projects found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </div>
  );
}
