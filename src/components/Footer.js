import React from "react";
import { Zap, Mail, Globe, Rss, Code2 } from "lucide-react";
import { useApp } from "../context/AppContext";

const footerLinks = {
  "Learn": [
    { label: "Courses", page: "courses" },
    { label: "Learning Paths", page: "paths" },
    { label: "Projects", page: "projects" },
    { label: "Assessments", page: "interviews" },
    { label: "Certificates", page: "dashboard", tab: "certificates" },
  ],
  "Mentorship": [
    { label: "Find Mentors", page: "mentors" },
    { label: "Book Trial", page: "mentors" },
    { label: "Mock Interviews", page: "interviews" },
    { label: "Career Guidance", page: "mentors" },
    { label: "Resume Review", page: "resume" },
  ],
  "Career": [
    { label: "Job Board", page: "jobs" },
    { label: "Application Tracker", page: "dashboard", tab: "applications" },
    { label: "Success Stories", page: "paths" },
    { label: "Community", page: "community" },
    { label: "Pricing", page: "home" },
  ],
  "Company": [
    { label: "About Us", page: "home" },
    { label: "Blog", page: "community" },
    { label: "Careers", page: "jobs" },
    { label: "Privacy Policy", page: "home" },
    { label: "Terms of Service", page: "home" },
  ],
};

export default function Footer() {
  const { navigate, setDashboardTab } = useApp();

  const handleLink = (link) => {
    if (link.tab) setDashboardTab(link.tab);
    navigate(link.page);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <button onClick={() => navigate("home")} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Zap size={18} className="text-white" /></div>
              <span className="text-xl font-bold text-white">Career<span className="text-blue-400">Forge</span></span>
            </button>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">Learn skills, get mentored, and become job ready. Your complete career development platform.</p>
            <div className="flex gap-3">
              {[Rss, Globe, Code2, Mail].map((Icon, i) => (
                <button key={i} className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-3 text-sm">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <button onClick={() => handleLink(link)} className="text-sm text-slate-400 hover:text-white transition-colors text-left">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">© 2024 CareerForge. All rights reserved. Frontend-only demo platform.</p>
          <div className="flex gap-4 text-sm text-slate-500">
            <button onClick={() => navigate("home")} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => navigate("home")} className="hover:text-white transition-colors">Terms</button>
            <button onClick={() => navigate("home")} className="hover:text-white transition-colors">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
