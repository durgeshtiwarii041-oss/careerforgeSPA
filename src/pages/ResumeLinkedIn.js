import React, { useState } from "react";
import { CheckCircle, AlertCircle, TrendingUp, User, Link } from "lucide-react";
import ProgressBar from "../components/ProgressBar";
import { useApp } from "../context/AppContext";

const resumeChecklist = [
  { id: 1, label: "Contact Information", done: true },
  { id: 2, label: "Professional Summary", done: true },
  { id: 3, label: "Work Experience / Projects", done: true },
  { id: 4, label: "Education", done: true },
  { id: 5, label: "Technical Skills", done: false },
  { id: 6, label: "Certifications", done: false },
  { id: 7, label: "GitHub / Portfolio Link", done: false },
  { id: 8, label: "Quantified Achievements", done: false },
];

const linkedinChecklist = [
  { id: 1, label: "Professional Profile Photo", done: true },
  { id: 2, label: "Compelling Headline", done: false },
  { id: 3, label: "About Section (200+ words)", done: false },
  { id: 4, label: "Featured Section with Projects", done: false },
  { id: 5, label: "All Experience Listed", done: true },
  { id: 6, label: "Skills & Endorsements (10+)", done: false },
  { id: 7, label: "Recommendations (2+)", done: false },
  { id: 8, label: "Open to Work Banner", done: true },
];

export default function ResumeLinkedIn() {
  const { showToast } = useApp();
  const [tab, setTab] = useState("resume");
  const [resumeItems, setResumeItems] = useState(resumeChecklist);
  const [linkedinItems, setLinkedinItems] = useState(linkedinChecklist);

  const resumeScore = Math.round((resumeItems.filter(i => i.done).length / resumeItems.length) * 100);
  const linkedinScore = Math.round((linkedinItems.filter(i => i.done).length / linkedinItems.length) * 100);

  const toggle = (id, type) => {
    if (type === "resume") setResumeItems(p => p.map(i => i.id === id ? { ...i, done: !i.done } : i));
    else setLinkedinItems(p => p.map(i => i.id === id ? { ...i, done: !i.done } : i));
    showToast("Profile updated!", "success");
  };

  const items = tab === "resume" ? resumeItems : linkedinItems;
  const score = tab === "resume" ? resumeScore : linkedinScore;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Resume & LinkedIn Readiness</h1>
        <p className="text-slate-500">Optimize your profile to attract recruiters and land interviews.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><User size={20} className="text-blue-600" /></div>
            <div>
              <p className="font-semibold text-slate-900">Resume Score</p>
              <p className="text-sm text-slate-500">{resumeScore}% complete</p>
            </div>
          </div>
          <ProgressBar value={resumeScore} color={resumeScore >= 80 ? "bg-green-500" : resumeScore >= 60 ? "bg-yellow-500" : "bg-red-500"} />
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><Link size={20} className="text-blue-600" /></div>
            <div>
              <p className="font-semibold text-slate-900">LinkedIn Score</p>
              <p className="text-sm text-slate-500">{linkedinScore}% complete</p>
            </div>
          </div>
          <ProgressBar value={linkedinScore} color={linkedinScore >= 80 ? "bg-green-500" : linkedinScore >= 60 ? "bg-yellow-500" : "bg-red-500"} />
        </div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-slate-200">
        {["resume", "linkedin"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors capitalize ${tab === t ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
            {t === "resume" ? "Resume Checklist" : "LinkedIn Checklist"}
          </button>
        ))}
      </div>

      <div className="card p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900">{tab === "resume" ? "Resume" : "LinkedIn"} Checklist</h2>
          <span className={`badge ${score >= 80 ? "bg-green-100 text-green-700" : score >= 60 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
            {score >= 80 ? "Recruiter Ready" : score >= 60 ? "Needs Work" : "Incomplete"}
          </span>
        </div>
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <button onClick={() => toggle(item.id, tab)} className="flex-shrink-0">
                {item.done ? <CheckCircle size={20} className="text-green-500" /> : <AlertCircle size={20} className="text-slate-300" />}
              </button>
              <span className={`text-sm ${item.done ? "text-slate-700 line-through" : "text-slate-800 font-medium"}`}>{item.label}</span>
              {!item.done && <span className="ml-auto text-xs text-orange-600 font-medium">Missing</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><TrendingUp size={18} className="text-blue-600" />Improvement Tips</h2>
        <div className="space-y-2 text-sm text-slate-600">
          {tab === "resume" ? [
            "💡 Add 3-5 quantified achievements (e.g., 'Reduced load time by 40%')",
            "💡 Include GitHub profile and portfolio link prominently",
            "💡 List technical skills with proficiency levels",
            "💡 Keep resume to 1 page for freshers",
            "💡 Use action verbs: Built, Developed, Implemented, Optimized",
          ] : [
            "💡 Write a headline that includes your target role and top skills",
            "💡 Add a 200+ word About section with your story and goals",
            "💡 Pin your best project in the Featured section",
            "💡 Get at least 2 recommendations from peers or mentors",
            "💡 Add 10+ skills and ask connections for endorsements",
          ].map(tip => <p key={tip}>{tip}</p>)}
        </div>
      </div>
    </div>
  );
}
