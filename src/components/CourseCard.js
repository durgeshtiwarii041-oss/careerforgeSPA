import React from "react";
import { Star, Clock, Users, BookOpen } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function CourseCard({ course }) {
  const { navigate } = useApp();
  return (
    <div className="card overflow-hidden cursor-pointer group" onClick={() => navigate("course-detail", { course })}>
      <div className="relative overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 left-2 flex gap-1">
          <span className={`badge ${course.live ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
            {course.live ? "🔴 Live" : "📹 Recorded"}
          </span>
        </div>
        <div className="absolute top-2 right-2">
          <span className="badge bg-blue-600 text-white">{course.level}</span>
        </div>
      </div>
      <div className="p-4">
        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">{course.category}</span>
        <h3 className="font-semibold text-slate-900 mt-1 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
        <p className="text-sm text-slate-500 mb-3">by {course.instructor}</p>
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1"><Clock size={12} />{course.duration}</span>
          <span className="flex items-center gap-1"><BookOpen size={12} />{course.projects} projects</span>
          <span className="flex items-center gap-1"><Users size={12} />{(course.enrolled / 1000).toFixed(1)}k</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-slate-800">{course.rating}</span>
          <span className="text-xs text-slate-400">({course.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-slate-900">₹{course.price.toLocaleString()}</span>
            <span className="text-sm text-slate-400 line-through ml-2">₹{course.originalPrice.toLocaleString()}</span>
          </div>
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {Math.round((1 - course.price / course.originalPrice) * 100)}% off
          </span>
        </div>
      </div>
    </div>
  );
}
