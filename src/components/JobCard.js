import React from "react";
import { MapPin, Briefcase, Bookmark, BookmarkCheck } from "lucide-react";
import { useApp } from "../context/AppContext";

const modeColor = { Remote: "bg-green-100 text-green-700", Hybrid: "bg-blue-100 text-blue-700", "On-site": "bg-orange-100 text-orange-700" };

export default function JobCard({ job }) {
  const { savedJobs, toggleSaveJob, addApplication, applications } = useApp();
  const isSaved = savedJobs.find(j => j.id === job.id);
  const isApplied = applications.find(a => a.jobId === job.id);

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{job.logo}</div>
          <div>
            <h3 className="font-semibold text-slate-900">{job.title}</h3>
            <p className="text-sm text-slate-600">{job.company}</p>
          </div>
        </div>
        <button onClick={() => toggleSaveJob(job)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600">
          {isSaved ? <BookmarkCheck size={18} className="text-blue-600" /> : <Bookmark size={18} />}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-3 text-xs text-slate-500">
        <span className="flex items-center gap-1"><MapPin size={11} />{job.location}</span>
        <span className="flex items-center gap-1"><Briefcase size={11} />{job.experience}</span>
        <span className={`badge ${modeColor[job.mode]}`}>{job.mode}</span>
        <span className="badge bg-slate-100 text-slate-600">{job.type}</span>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {job.skills.slice(0, 4).map(s => <span key={s} className="badge bg-slate-100 text-slate-600">{s}</span>)}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold text-slate-900 text-sm">{job.salary}</span>
          <span className="text-xs text-slate-400 ml-2">{job.posted}</span>
        </div>
        <button onClick={() => addApplication(job)}
          className={`text-sm px-4 py-1.5 rounded-lg font-medium transition-colors ${isApplied ? "bg-green-50 text-green-700 border border-green-200" : "btn-primary"}`}>
          {isApplied ? "Applied ✓" : "Apply Now"}
        </button>
      </div>
    </div>
  );
}
