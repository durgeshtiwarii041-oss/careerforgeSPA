import React from "react";
import { Clock, TrendingUp } from "lucide-react";
import { useApp } from "../context/AppContext";

const difficultyColor = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Advanced: "bg-red-100 text-red-700",
};

export default function ProjectCard({ project }) {
  const { startProject, projectProgress, showToast } = useApp();
  const progress = projectProgress[project.id] || 0;
  const started = progress > 0;

  const handleStart = (e) => {
    e.stopPropagation();
    if (started) {
      showToast(`Continuing "${project.title}"`, "info");
    } else {
      startProject(project.id);
    }
  };

  return (
    <div className="card overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          <span className={`badge ${difficultyColor[project.difficulty]}`}>{project.difficulty}</span>
          {project.portfolioReady && <span className="badge bg-purple-100 text-purple-700">Portfolio Ready</span>}
        </div>
      </div>
      <div className="p-4">
        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">{project.category}</span>
        <h3 className="font-semibold text-slate-900 mt-1 mb-2">{project.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.technologies.slice(0, 3).map(t => (
            <span key={t} className="badge bg-slate-100 text-slate-600">{t}</span>
          ))}
          {project.technologies.length > 3 && (
            <span className="badge bg-slate-100 text-slate-500">+{project.technologies.length - 3}</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1"><Clock size={12} />{project.duration}</span>
          <span className="flex items-center gap-1"><TrendingUp size={12} />{project.completionRate}% complete rate</span>
        </div>
        {started && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Progress</span><span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
        <button
          onClick={handleStart}
          className={`w-full text-sm py-2 rounded-lg font-medium transition-colors ${started ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100" : "btn-primary"}`}
        >
          {started ? "Continue Project" : "Start Project"}
        </button>
      </div>
    </div>
  );
}
