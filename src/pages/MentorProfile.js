import React from "react";
import { ArrowLeft, Star, CheckCircle, Briefcase, Calendar, MessageSquare } from "lucide-react";
import { useApp } from "../context/AppContext";

const mockReviews = [
  { name: "Rahul K", rating: 5, text: "Excellent mentor! Helped me crack my first FAANG interview.", date: "2 weeks ago" },
  { name: "Priya M", rating: 5, text: "Very patient and knowledgeable. Highly recommend!", date: "1 month ago" },
  { name: "Amit S", rating: 4, text: "Great sessions. Gave me a clear roadmap for my career.", date: "1 month ago" },
];

export default function MentorProfile() {
  const { selectedMentor: mentor, navigate, setModalOpen, setChatOpen, chatConversations } = useApp();
  if (!mentor) return <div className="text-center py-20 text-slate-400">Mentor not found. <button onClick={() => navigate("mentors")} className="text-blue-600">Browse mentors</button></div>;

  const conv = chatConversations.find(c => c.mentorId === mentor.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate("mentors")} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 text-sm"><ArrowLeft size={16} />Back to Mentors</button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="flex items-start gap-5">
              <div className="relative flex-shrink-0">
                <img src={mentor.photo} alt={mentor.name} className="w-20 h-20 rounded-full object-cover" />
                {mentor.verified && <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center"><CheckCircle size={14} className="text-white" /></div>}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-slate-900">{mentor.name}</h1>
                  {mentor.verified && <span className="badge bg-blue-50 text-blue-600">✓ Verified</span>}
                  <span className={`badge ${mentor.availability === "Available" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>{mentor.availability}</span>
                </div>
                <p className="text-slate-600 mt-1">{mentor.role} at <span className="font-semibold text-slate-800">{mentor.company}</span></p>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Star size={13} className="text-yellow-400 fill-yellow-400" />{mentor.rating} ({mentor.reviews} reviews)</span>
                  <span><Briefcase size={13} className="inline mr-1" />{mentor.experience} years exp</span>
                  <span>💬 {mentor.sessions} sessions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="font-semibold text-slate-900 mb-3">About</h2>
            <p className="text-slate-600 leading-relaxed">{mentor.bio}</p>
          </div>

          <div className="card p-5">
            <h2 className="font-semibold text-slate-900 mb-3">Expertise</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {mentor.expertise.map(e => <span key={e} className="badge bg-blue-50 text-blue-700">{e}</span>)}
            </div>
            <h3 className="font-medium text-slate-700 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {mentor.skills.map(s => <span key={s} className="badge bg-slate-100 text-slate-600">{s}</span>)}
            </div>
          </div>

          <div className="card p-5">
            <h2 className="font-semibold text-slate-900 mb-4">Reviews</h2>
            <div className="space-y-4">
              {mockReviews.map((r, i) => (
                <div key={i} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-slate-800">{r.name}</span>
                    <span className="text-xs text-slate-400">{r.date}</span>
                  </div>
                  <div className="flex mb-1">{[...Array(r.rating)].map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}</div>
                  <p className="text-sm text-slate-600">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card p-5 sticky top-20 space-y-4">
            <h3 className="font-semibold text-slate-900">Book a Session</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2"><Calendar size={14} className="text-blue-600" />Free 30-min trial session</div>
              <div className="flex items-center gap-2"><MessageSquare size={14} className="text-blue-600" />1:1 personalized guidance</div>
              <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" />Career roadmap planning</div>
              <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" />Resume & profile review</div>
            </div>
            <button onClick={() => setModalOpen({ type: "trial", mentor })} className="w-full btn-primary py-3">Book Free Trial Session</button>
            <button onClick={() => setChatOpen && setChatOpen(mentor)} className="w-full py-2.5 rounded-lg font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2">
              <MessageSquare size={16} />Start Chat
            </button>
            <button onClick={() => navigate("mentors")} className="w-full btn-secondary py-2.5 text-sm">← Change Mentor</button>
          </div>
        </div>
      </div>
    </div>
  );
}