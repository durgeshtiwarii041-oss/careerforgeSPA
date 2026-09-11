import React from "react";
import { ArrowLeft, CheckCircle, Lock, Circle, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { learningPaths } from "../data/learningPaths";
import ProgressBar from "../components/ProgressBar";

function PathCard({ path }) {
  const { navigate } = useApp();
  return (
    <div className="card p-6 hover:border-blue-300 transition-all cursor-pointer group" onClick={() => navigate("path-detail", { path })}>
      <div className="text-4xl mb-3">{path.icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{path.title}</h3>
      <p className="text-sm text-slate-500 mb-4">{path.description}</p>
      <div className="flex flex-wrap gap-1 mb-4">
        {path.skills.slice(0, 4).map(s => <span key={s} className="badge bg-slate-100 text-slate-600">{s}</span>)}
      </div>
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>⏱ {path.duration}</span>
        <span className="text-blue-600 font-medium flex items-center gap-1">View Path <ArrowRight size={14} /></span>
      </div>
    </div>
  );
}

function PathDetail({ path }) {
  const { navigate } = useApp();
  const statusIcon = { completed: <CheckCircle size={20} className="text-green-500" />, current: <Circle size={20} className="text-blue-600 fill-blue-100" />, locked: <Lock size={20} className="text-slate-300" /> };
  const statusColor = { completed: "border-green-200 bg-green-50", current: "border-blue-300 bg-blue-50", locked: "border-slate-200 bg-white opacity-60" };
  const completedStages = path.stages.filter(s => s.completed === true || s.status === "completed").length;
  const progress = Math.round((completedStages / path.stages.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate("paths")} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 text-sm"><ArrowLeft size={16} />Back to Paths</button>
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-5xl">{path.icon}</div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{path.title}</h1>
            <p className="text-slate-500">{path.description}</p>
            <div className="flex gap-3 mt-2 text-sm text-slate-500">
              <span>⏱ {path.duration}</span>
              <span>📊 {path.level}</span>
            </div>
          </div>
        </div>
        <ProgressBar value={progress} showLabel label="Overall Progress" />
      </div>
      <div className="space-y-4">
        {path.stages.map((stage, i) => (
          <div key={stage.id} className={`card p-5 border-2 ${statusColor[stage.status]}`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-0.5">{statusIcon[stage.status]}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">Stage {i + 1}: {stage.title}</h3>
                  <span className="text-xs text-slate-400">{stage.weeks} weeks</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {stage.topics.map(t => <span key={t} className="badge bg-white border border-slate-200 text-slate-600">{t}</span>)}
                </div>
                {stage.status === "current" && (
                  <button onClick={() => navigate("courses")} className="btn-primary text-sm py-1.5 mt-2">Continue Learning →</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card p-5 mt-6">
        <h3 className="font-semibold text-slate-900 mb-3">Target Roles</h3>
        <div className="flex flex-wrap gap-2">
          {path.jobs.map(j => <span key={j} className="badge bg-blue-50 text-blue-700 text-sm px-3 py-1">{j}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function LearningPaths() {
  const { selectedPath, currentPage } = useApp();
  if (currentPage === "path-detail" && selectedPath) return <PathDetail path={selectedPath} />;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Learning Paths</h1>
        <p className="text-slate-500">Structured roadmaps from beginner to job-ready professional.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {learningPaths.map(p => <PathCard key={p.id} path={p} />)}
      </div>
    </div>
  );
}
