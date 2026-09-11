import React, { useState } from "react";
import { ArrowLeft, Calendar, Clock, Search, X, BookOpen, Tag } from "lucide-react";
import { blogs, blogCategories, blogStats } from "../data/blogs";

export default function Blog() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = blogs.filter(b => {
    if (category !== "All" && b.category !== category) return false;
    if (search && !b.title.toLowerCase().includes(search.toLowerCase()) && !b.excerpt.toLowerCase().includes(search.toLowerCase()) && !b.author.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm mb-6">
            <BookOpen size={16} />Mentor-written career guides
          </div>
          <h1 className="text-4xl font-extrabold mb-4">The Career Blog</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">{blogStats.articles} articles across {blogStats.topics} topics — written by mentors who've been there.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles, topics, authors..." className="input pl-9" />
          </div>
          {(search || category !== "All") && (
            <button onClick={() => { setSearch(""); setCategory("All"); }} className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50">
              <X size={14} />Clear
            </button>
          )}
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {blogCategories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${category === c ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-50"}`}>
              {c}
            </button>
          ))}
        </div>

        <p className="text-sm text-slate-500 mb-6">{filtered.length} article{filtered.length !== 1 ? "s" : ""} found</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <div className="text-5xl mb-3">📚</div>
            <p className="font-medium">No articles found</p>
            <button onClick={() => { setSearch(""); setCategory("All"); }} className="mt-3 btn-secondary text-sm">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(b => (
              <article key={b.id} className="card overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative overflow-hidden">
                  <img src={b.image} alt={b.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-2 left-2 badge bg-blue-600 text-white text-xs">{b.category}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1"><Calendar size={12} />{b.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{b.readTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{b.title}</h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{b.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">{b.author.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                      <div>
                        <p className="text-xs font-medium text-slate-700">{b.author}</p>
                        <p className="text-[10px] text-slate-400">{b.authorTitle}</p>
                      </div>
                    </div>
                    <span className="text-xs text-blue-600 font-medium flex items-center gap-1">Read <ArrowLeft size={12} className="rotate-180" /></span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {b.tags.map(t => <span key={t} className="badge bg-slate-100 text-slate-500 text-xs flex items-center gap-1"><Tag size={10} />{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}