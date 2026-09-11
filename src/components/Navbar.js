import React, { useState } from "react";
import { Menu, X, Zap, User, MessageSquare, BookOpen, Star, UserPlus } from "lucide-react";
import { useApp } from "../context/AppContext";

const navLinks = [
  { label: "Courses", page: "courses" },
  { label: "Learning Paths", page: "paths" },
  { label: "Projects", page: "projects" },
  { label: "Mentors", page: "mentors" },
  { label: "Mock Interviews", page: "interviews" },
  { label: "Jobs", page: "jobs" },
];

const moreLinks = [
  { label: "Blog", page: "blog", icon: BookOpen },
  { label: "Success Stories", page: "success-stories", icon: Star },
  { label: "Become a Mentor", page: "become-mentor", icon: UserPlus },
];

export default function Navbar() {
  const { navigate, currentPage, setModalOpen, setChatOpen, chatConversations } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const totalUnread = chatConversations.reduce((s, c) => s + (c.unread || 0), 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => navigate("home")} className="flex items-center gap-2 focus:outline-none">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Career<span className="text-blue-600">Forge</span></span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button key={link.page} onClick={() => navigate(link.page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === link.page ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}>
                {link.label}
              </button>
            ))}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                More
              </button>
              {moreOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl border border-slate-200 shadow-lg py-2 z-50">
                  {moreLinks.map(link => (
                    <button
                      key={link.page}
                      onClick={() => { navigate(link.page); setMoreOpen(false); }}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors ${currentPage === link.page ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"}`}
                    >
                      <link.icon size={16} />{link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setChatOpen && setChatOpen({ id: 1, name: "Ananya Krishnan", photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" })}
              className="relative flex items-center gap-1.5 btn-ghost text-sm"
              title="Open chat with mentor"
            >
              <MessageSquare size={15} />Chat
              {totalUnread > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{totalUnread}</span>}
            </button>
            <button onClick={() => navigate("dashboard")} className="flex items-center gap-1.5 btn-ghost text-sm">
              <User size={15} />Dashboard
            </button>
            <button onClick={() => setModalOpen({ type: "auth", mode: "login" })} className="btn-ghost text-sm">
              Sign In
            </button>
            <button onClick={() => setModalOpen({ type: "auth", mode: "signup" })} className="btn-primary text-sm">
              Get Started
            </button>
          </div>

          <button className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <button key={link.page} onClick={() => { navigate(link.page); setMobileOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentPage === link.page ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"}`}>
              {link.label}
            </button>
          ))}
          <div className="border-t border-slate-100 pt-2 mt-2">
            {moreLinks.map(link => (
              <button key={link.page} onClick={() => { navigate(link.page); setMobileOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentPage === link.page ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"}`}>
                <link.icon size={16} />{link.label}
              </button>
            ))}
          </div>
          <button onClick={() => { setChatOpen && setChatOpen({ id: 1, name: "Ananya Krishnan", photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" }); setMobileOpen(false); }} className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-700 hover:bg-emerald-50 flex items-center gap-2">
            <MessageSquare size={15} />Chat with Mentor
          </button>
          <button onClick={() => { navigate("dashboard"); setMobileOpen(false); }} className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <User size={15} />Dashboard
          </button>
          <div className="pt-2 flex gap-2">
            <button onClick={() => { setModalOpen({ type: "auth", mode: "login" }); setMobileOpen(false); }} className="flex-1 btn-secondary text-sm">Sign In</button>
            <button onClick={() => { setModalOpen({ type: "auth", mode: "signup" }); setMobileOpen(false); }} className="flex-1 btn-primary text-sm">Get Started</button>
          </div>
        </div>
      )}
    </header>
  );
}