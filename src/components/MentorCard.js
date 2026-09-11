import React from "react";
import { Star, Briefcase, CheckCircle, Calendar, MessageSquare } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function MentorCard({ mentor }) {
  const { navigate, setModalOpen, setChatOpen } = useApp();
  return (
    <div className="card p-5">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <img src={mentor.photo} alt={mentor.name} className="w-14 h-14 rounded-full object-cover" />
          {mentor.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
              <CheckCircle size={12} className="text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900 truncate">{mentor.name}</h3>
            {mentor.verified && <span className="badge bg-blue-50 text-blue-600 text-xs">Verified</span>}
          </div>
          <p className="text-sm text-slate-600 truncate">{mentor.role}</p>
          <p className="text-sm font-medium text-slate-700 flex items-center gap-1"><Briefcase size={12} />{mentor.company}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-3 text-sm text-slate-500">
        <span className="flex items-center gap-1"><Star size={13} className="text-yellow-400 fill-yellow-400" />{mentor.rating} ({mentor.reviews})</span>
        <span>{mentor.experience} yrs exp</span>
        <span className={`badge ${mentor.availability === "Available" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
          {mentor.availability}
        </span>
      </div>
      <div className="flex flex-wrap gap-1 mb-4">
        {mentor.skills.slice(0, 4).map(s => (
          <span key={s} className="badge bg-slate-100 text-slate-600">{s}</span>
        ))}
      </div>
      <p className="text-sm text-slate-500 line-clamp-2 mb-4">{mentor.bio}</p>
      <div className="flex gap-2">
        <button onClick={() => navigate("mentor-profile", { mentor })} className="flex-1 btn-secondary text-sm py-2">View Profile</button>
        <button onClick={() => setModalOpen({ type: "trial", mentor })} className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-1">
          <Calendar size={14} />Book Trial
        </button>
        <button
          onClick={() => setChatOpen && setChatOpen(mentor)}
          className="px-3 py-2 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1"
          title="Chat with mentor"
        >
          <MessageSquare size={14} />Chat
        </button>
      </div>
    </div>
  );
}