import React, { useState, useCallback } from "react";
import { Heart, Plus, X, MessageSquare, Search } from "lucide-react";
import { communityQuestions } from "../data/users";
import { useApp } from "../context/AppContext";

const CATEGORIES = ["General", "Frontend", "Backend", "DSA", "Career", "React", "Python", "System Design"];

export default function Community() {
  const { showToast } = useApp();
  const [questions, setQuestions] = useState(communityQuestions);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newQ, setNewQ] = useState({ title: "", body: "", category: "General" });
  const [liked, setLiked] = useState({});
  const [expandedId, setExpandedId] = useState(null);

  const filtered = questions.filter(q => {
    if (search && !q.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (category && q.category !== category) return false;
    return true;
  });

  const handleAdd = () => {
    if (!newQ.title.trim()) { showToast("Please enter a question title", "error"); return; }
    const question = {
      id: Date.now(),
      title: newQ.title,
      body: newQ.body,
      category: newQ.category,
      author: "You",
      answers: 0,
      likes: 0,
      time: "Just now",
      answered: false,
    };
    setQuestions(p => [question, ...p]);
    setNewQ({ title: "", body: "", category: "General" });
    setShowForm(false);
    showToast("Question posted successfully!");
  };

  // Fix: read liked state inside the updater to avoid stale closure
  const toggleLike = useCallback((id) => {
    setLiked(prev => {
      const isLiked = prev[id];
      setQuestions(qs => qs.map(q => q.id === id ? { ...q, likes: q.likes + (isLiked ? -1 : 1) } : q));
      return { ...prev, [id]: !isLiked };
    });
  }, []);

  const handleClear = () => { setSearch(""); setCategory(""); };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Community</h1>
          <p className="text-slate-500">Ask questions, share knowledge, get mentor answers.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2"><Plus size={16} />Ask Question</button>
      </div>

      {showForm && (
        <div className="card p-5 mb-6 border-blue-200 border-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Ask a Question</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
          </div>
          <input
            value={newQ.title}
            onChange={e => setNewQ(p => ({ ...p, title: e.target.value }))}
            placeholder="What's your question? (required)"
            className="input mb-3"
          />
          <textarea
            value={newQ.body}
            onChange={e => setNewQ(p => ({ ...p, body: e.target.value }))}
            placeholder="Add more details (optional)..."
            className="input mb-3 resize-none"
            rows={3}
          />
          <div className="flex gap-3">
            <select value={newQ.category} onChange={e => setNewQ(p => ({ ...p, category: e.target.value }))} className="input flex-1">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <button onClick={handleAdd} className="btn-primary px-6">Post Question</button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..." className="input pl-9" />
        </div>
        <div className="flex gap-2 items-center">
          <select value={category} onChange={e => setCategory(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option value="">All Categories</option>
            {CATEGORIES.filter(c => c !== "General").map(c => <option key={c}>{c}</option>)}
          </select>
          {(search || category) && (
            <button onClick={handleClear} className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium">
              <X size={14} />Clear
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">{filtered.length} question{filtered.length !== 1 ? "s" : ""}</p>
        <p className="text-xs text-slate-400">{questions.length} total in community</p>
      </div>

      <div className="space-y-3">
        {filtered.map(q => (
          <div key={q.id} className="card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="badge bg-blue-50 text-blue-600">{q.category}</span>
                  {q.answered && <span className="badge bg-green-100 text-green-700">✓ Answered</span>}
                </div>
                <button
                  onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                  className="text-left w-full"
                >
                  <h3 className="font-medium text-slate-900 mb-2 hover:text-blue-600 transition-colors">{q.title}</h3>
                </button>
                {expandedId === q.id && q.body && (
                  <p className="text-sm text-slate-600 mb-3 bg-slate-50 p-3 rounded-lg">{q.body}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>by {q.author}</span>
                  <span>{q.time}</span>
                  <span className="flex items-center gap-1"><MessageSquare size={12} />{q.answers} answers</span>
                </div>
              </div>
              <button
                onClick={() => toggleLike(q.id)}
                className={`flex items-center gap-1 text-sm transition-colors flex-shrink-0 ${liked[q.id] ? "text-red-500" : "text-slate-400 hover:text-red-400"}`}
              >
                <Heart size={16} className={liked[q.id] ? "fill-red-500" : ""} />{q.likes}
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <div className="text-5xl mb-3">💬</div>
            <p className="font-medium">No questions found</p>
            <p className="text-sm">Be the first to ask!</p>
          </div>
        )}
      </div>
    </div>
  );
}
