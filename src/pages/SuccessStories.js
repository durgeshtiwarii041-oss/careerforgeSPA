import React, { useState } from "react";
import { Quote } from "lucide-react";
import { successStories, successStats } from "../data/successStories";

const DOMAINS = ["All", "Engineering", "Data Science", "Product", "Design", "Business", "Leadership"];

export default function SuccessStories() {
  const [domain, setDomain] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = successStories.filter(s => {
    if (domain !== "All" && s.domain !== domain) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.company.toLowerCase().includes(search.toLowerCase()) && !s.mentor.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">Success Stories</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">See how our mentees landed their dream jobs within months, thanks to expert mentorship and targeted guidance.</p>
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              [successStats.menteesPlaced, "Mentees Placed"],
              [successStats.highestPackage, "Highest Package"],
              [successStats.averageRating, "Avg Rating"],
              [successStats.mentorshipSuccessRate, "Success Rate"],
            ].map(([n, l]) => (
              <div key={l}><div className="text-3xl font-bold">{n}</div><div className="text-blue-200 text-sm">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, company, mentor..." className="input" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {DOMAINS.map(d => (
              <button key={d} onClick={() => setDomain(d)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${domain === d ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-50"}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-6">{filtered.length} success stories found</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <div className="text-5xl mb-3">🔍</div>
            <p className="font-medium">No stories found</p>
            <button onClick={() => { setDomain("All"); setSearch(""); }} className="mt-3 btn-secondary text-sm">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(s => (
              <div key={s.id} className="card p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <img src={s.photo} alt={s.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{s.name}</h3>
                    <p className="text-sm text-slate-500">{s.prevRole} → <span className="font-semibold text-blue-600">{s.newRole}</span></p>
                    <p className="text-sm text-slate-500">@ {s.company}</p>
                  </div>
                  <span className="badge bg-blue-50 text-blue-600 text-xs">{s.domain}</span>
                </div>
                <Quote size={16} className="text-blue-300 mb-2" />
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">"{s.quote}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-400">Mentor</p>
                    <p className="text-sm font-medium text-slate-700">{s.mentor}</p>
                    <p className="text-xs text-slate-400">{s.mentorTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Timeline</p>
                    <p className="text-sm font-semibold text-slate-700">{s.timeline}</p>
                    <p className="text-xs font-bold text-green-600">{s.package}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}