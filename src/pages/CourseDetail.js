import React, { useState } from "react";
import { ArrowLeft, Star, Clock, Users, BookOpen, ChevronDown, ChevronUp, Play, CheckCircle } from "lucide-react";
import { useApp } from "../context/AppContext";
import { courseModules } from "../data/courses";
import ProgressBar from "../components/ProgressBar";

export default function CourseDetail() {
  const { selectedCourse: course, navigate, courseProgress, updateCourseProgress, showToast } = useApp();
  const [openModule, setOpenModule] = useState(0);
  const [enrolled, setEnrolled] = useState(false);
  const modules = courseModules[course?.id] || courseModules[1];
  const progress = courseProgress[course?.id] || 0;

  if (!course) return <div className="text-center py-20 text-slate-400">Course not found. <button onClick={() => navigate("courses")} className="text-blue-600">Browse courses</button></div>;

  const handleEnroll = () => {
    setEnrolled(true);
    showToast(`Enrolled in ${course.title}! Start learning now.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate("courses")} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 text-sm"><ArrowLeft size={16} />Back to Courses</button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <span className="badge bg-blue-100 text-blue-700 mb-3">{course.category}</span>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">{course.title}</h1>
          <p className="text-slate-600 mb-4">Master {course.title} with hands-on projects, live sessions and expert mentorship. Build real-world applications and become job-ready.</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
            <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" />{course.rating} ({course.reviews.toLocaleString()} reviews)</span>
            <span className="flex items-center gap-1"><Users size={14} />{course.enrolled.toLocaleString()} enrolled</span>
            <span className="flex items-center gap-1"><Clock size={14} />{course.duration}</span>
            <span className="flex items-center gap-1"><BookOpen size={14} />{course.projects} projects</span>
            <span className="badge bg-slate-100 text-slate-600">{course.level}</span>
          </div>
          <p className="text-sm text-slate-500 mb-6">Instructor: <span className="font-medium text-slate-800">{course.instructor}</span></p>

          {enrolled && (
            <div className="card p-4 mb-6">
              <ProgressBar value={progress} max={modules.length * 4} showLabel label="Course Progress" />
            </div>
          )}

          <div className="card p-5 mb-6">
            <h2 className="font-semibold text-slate-900 mb-3">What You'll Learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.skills.map(s => <div key={s} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={14} className="text-green-500" />{s}</div>)}
              {["Build real projects", "Get job-ready", "Certificate on completion", "Mentor support"].map(s => (
                <div key={s} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={14} className="text-green-500" />{s}</div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h2 className="font-semibold text-slate-900 mb-4">Course Curriculum</h2>
            <div className="space-y-2">
              {modules.map((mod, i) => (
                <div key={mod.id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button onClick={() => setOpenModule(openModule === i ? -1 : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      {mod.completed ? <CheckCircle size={18} className="text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300" />}
                      <span className="font-medium text-slate-800">{mod.title}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <span>{mod.duration}</span>
                      {openModule === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>
                  {openModule === i && (
                    <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 space-y-2">
                      {mod.lessons.map((lesson, li) => (
                        <button key={li} onClick={() => { if (enrolled) { updateCourseProgress(course.id, i * 4 + li + 1); showToast(`Lesson "${lesson}" marked complete!`); } }}
                          className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 w-full text-left py-1 transition-colors">
                          <Play size={13} className="text-slate-400" />{lesson}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card p-5 sticky top-20">
            <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover rounded-lg mb-4" />
            <div className="mb-4">
              <span className="text-3xl font-bold text-slate-900">₹{course.price.toLocaleString()}</span>
              <span className="text-slate-400 line-through ml-2">₹{course.originalPrice.toLocaleString()}</span>
              <span className="ml-2 text-green-600 font-semibold text-sm">{Math.round((1 - course.price / course.originalPrice) * 100)}% off</span>
            </div>
            <button onClick={handleEnroll} className={`w-full py-3 rounded-xl font-semibold mb-3 transition-colors ${enrolled ? "bg-green-600 text-white" : "btn-primary"}`}>
              {enrolled ? "✓ Enrolled — Continue Learning" : "Enroll Now"}
            </button>
            <div className="space-y-2 text-sm text-slate-600">
              {[`📹 ${course.live ? "Live + Recorded" : "Recorded"}`, `⏱ ${course.duration}`, `🛠 ${course.projects} projects`, `🏆 Certificate`, `💬 Mentor support`, `📱 Mobile access`].map(f => (
                <div key={f} className="flex items-center gap-2">{f}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
