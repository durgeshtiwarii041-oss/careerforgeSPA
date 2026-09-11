import React from "react";

export default function ProgressBar({ value, max = 100, color = "bg-blue-600", height = "h-2", showLabel = false, label = "" }) {
  const pct = Math.min(Math.round((value / max) * 100), 100);
  return (
    <div>
      {showLabel && (
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>{label}</span><span>{pct}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full ${height}`}>
        <div className={`${color} ${height} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
