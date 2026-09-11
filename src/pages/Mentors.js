import React, { useState, useMemo } from "react";
import MentorCard from "../components/MentorCard";
import MentorFilterSidebar from "../components/MentorFilterSidebar";
import { mentors } from "../data/mentors";
import { Search, X } from "lucide-react";

function getExpRange(exp) {
  if (exp <= 3) return "0-3";
  if (exp <= 6) return "3-6";
  return "6+";
}

export default function Mentors() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = mentors.filter(m => {
      const q = search.toLowerCase();
      if (q && !m.name.toLowerCase().includes(q) && !m.role.toLowerCase().includes(q) && !m.company.toLowerCase().includes(q) && !m.skills.some(s => s.toLowerCase().includes(q))) return false;
      if (filters.domain && filters.domain.length && !filters.domain.includes(m.domain)) return false;
      if (filters.company && filters.company.length && !filters.company.includes(m.company)) return false;
      if (filters.skills && filters.skills.length && !m.skills.some(s => filters.skills.includes(s))) return false;
      if (filters.experience && filters.experience.length && !filters.experience.includes(getExpRange(m.experience))) return false;
      if (filters.tools && filters.tools.length) {
        const mentorTools = (m.tools || []).concat(m.skills);
        if (!mentorTools.some(t => filters.tools.includes(t))) return false;
      }
      if (filters.languages && filters.languages.length) {
        const mentorLangs = m.languages || ["English"];
        if (!mentorLangs.some(l => filters.languages.includes(l))) return false;
      }
      if (filters.pricing && filters.pricing.length) {
        const price = (m.price || "").toLowerCase();
        const matched = filters.pricing.some(p => {
          if (p === "Free Trial") return price.includes("free");
          if (p === "Paid Mentorship") return price.includes("paid") || price.includes("₹");
          if (p === "Fixed Price") return price.includes("fixed");
          return false;
        });
        if (!matched) return false;
      }
      if (filters.starOnly && m.rating < 4.8) return false;
      if (filters.verifiedOnly && !m.verified) return false;
      if (filters.availableOnly && m.availability !== "Available") return false;
      return true;
    });

    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "reviews") list = [...list].sort((a, b) => b.reviews - a.reviews);
    if (sort === "experience") list = [...list].sort((a, b) => b.experience - a.experience);
    return list;
  }, [search, filters, sort]);

  const activeCount = Object.values(filters).filter(v => v === true || (Array.isArray(v) && v.length > 0)).length;

  const clearAll = () => {
    setSearch("");
    setFilters({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Find Your Mentor</h1>
        <p className="text-slate-500">Connect with verified industry experts for 1:1 guidance and career support.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - desktop */}
        <MentorFilterSidebar
          filters={filters}
          onFilter={(k, v) => setFilters(p => ({ ...p, [k]: v }))}
          onClear={clearAll}
          resultCount={filtered.length}
          totalMentors={mentors.length}
        />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, role, skill, company..."
                className="input pl-9"
              />
            </div>
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <span aria-hidden="true">☰</span>Filters {activeCount > 0 && `(${activeCount})`}
            </button>
            <select value={sort} onChange={e => setSort(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="recommended">Sort: Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>

          {/* Mobile filters */}
          {mobileFiltersOpen && (
            <div className="lg:hidden mb-5">
              <MentorFilterSidebar
                filters={filters}
                onFilter={(k, v) => setFilters(p => ({ ...p, [k]: v }))}
                onClear={clearAll}
                resultCount={filtered.length}
                totalMentors={mentors.length}
              />
            </div>
          )}

          <p className="text-sm text-slate-500 mb-5">
            {filtered.length} mentor{filtered.length !== 1 ? "s" : ""} found
            {activeCount > 0 && (
              <button onClick={clearAll} className="ml-2 text-red-600 hover:underline text-xs flex items-center gap-1 inline-flex">
                <X size={12} />Clear all filters
              </button>
            )}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <div className="text-5xl mb-4">👥</div>
              <p className="text-lg font-medium">No mentors found</p>
              <p className="text-sm mb-4">Try adjusting your filters</p>
              <button onClick={clearAll} className="btn-secondary text-sm">Clear All Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(m => <MentorCard key={m.id} mentor={m} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}