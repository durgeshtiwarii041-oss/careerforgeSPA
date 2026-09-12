import React from "react";
import {
  Award,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Flame,
  GraduationCap,
  LayoutDashboard,
  Target,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import ProgressBar from "../components/ProgressBar";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "applications", label: "Applications", icon: Briefcase },
  { id: "certificates", label: "Certificates", icon: Award },
];

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="card p-5">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
        <Icon size={20} />
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

export default function Dashboard() {
  const { user, applications, dashboardTab, setDashboardTab, navigate } = useApp();
  const stats = user?.stats || {};
  const currentCourse = user?.currentCourse;
  const currentPath = user?.currentPath;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-blue-600 font-semibold mb-1">Your learning hub</p>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.name?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-slate-500 mt-1">Keep building momentum toward your career goals.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 px-4 py-2 rounded-lg">
          <Flame size={18} />
          <span className="font-semibold">{user?.streak || 0} day streak</span>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 mb-8 overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setDashboardTab(id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
              dashboardTab === id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {dashboardTab === "applications" && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Application Tracker</h2>
          {applications.length === 0 ? (
            <div className="card p-10 text-center">
              <Briefcase size={36} className="mx-auto text-slate-300 mb-3" />
              <p className="font-medium text-slate-700">No applications yet</p>
              <p className="text-sm text-slate-500 mt-1">Explore the job board to start applying.</p>
              <button onClick={() => navigate("jobs")} className="btn-primary mt-5">Browse jobs</button>
            </div>
          ) : (
            <div className="card divide-y divide-slate-100">
              {applications.map(application => (
                <div key={application.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{application.jobTitle}</p>
                    <p className="text-sm text-slate-500">{application.company} · Applied {application.appliedDate}</p>
                  </div>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full">
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {dashboardTab === "certificates" && (
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Certificates</h2>
          <div className="card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award size={24} />
            </div>
            <div>
              <p className="font-semibold text-slate-900">{stats.certificates || 0} certificate earned</p>
              <p className="text-sm text-slate-500">Complete more courses to grow your certificate collection.</p>
            </div>
          </div>
        </section>
      )}

      {dashboardTab === "overview" && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={GraduationCap} label="Courses enrolled" value={stats.coursesEnrolled || 0} color="bg-blue-50 text-blue-600" />
            <StatCard icon={CheckCircle2} label="Courses completed" value={stats.coursesCompleted || 0} color="bg-emerald-50 text-emerald-600" />
            <StatCard icon={Target} label="Projects completed" value={stats.projectsCompleted || 0} color="bg-violet-50 text-violet-600" />
            <StatCard icon={FileText} label="Jobs applied" value={stats.jobsApplied || 0} color="bg-orange-50 text-orange-600" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-slate-900">Continue learning</h2>
                  <button onClick={() => navigate("courses")} className="text-sm text-blue-600 font-medium flex items-center gap-1">
                    View courses <ChevronRight size={15} />
                  </button>
                </div>
                {currentCourse ? (
                  <div className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Current course</p>
                        <h3 className="font-semibold text-slate-900 mt-1">{currentCourse.title}</h3>
                      </div>
                      <GraduationCap className="text-blue-500 shrink-0" size={22} />
                    </div>
                    <ProgressBar value={currentCourse.progress || 0} showLabel label="Course progress" />
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No active course yet.</p>
                )}
              </div>

              <div className="card p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-5">Recent activity</h2>
                <div className="space-y-4">
                  {(user?.recentActivity || []).map((activity, index) => (
                    <div key={`${activity.text}-${index}`} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={16} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-700">{activity.text}</p>
                        <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Profile completion</h2>
                <ProgressBar value={user?.profileCompletion || 0} showLabel label="Profile" />
                <button onClick={() => navigate("resume")} className="btn-secondary w-full mt-5">Complete profile</button>
              </div>
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock3 size={18} className="text-blue-600" />
                  <h2 className="font-bold text-slate-900">Upcoming session</h2>
                </div>
                {user?.upcomingSession ? (
                  <>
                    <p className="font-medium text-slate-800">{user.upcomingSession.topic}</p>
                    <p className="text-sm text-slate-500 mt-1">{user.upcomingSession.mentor}</p>
                    <p className="text-sm text-blue-600 mt-3">{user.upcomingSession.date} · {user.upcomingSession.time}</p>
                  </>
                ) : (
                  <p className="text-sm text-slate-500">No upcoming sessions.</p>
                )}
              </div>
              {currentPath && (
                <div className="card p-6">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Learning path</p>
                  <p className="font-semibold text-slate-900 mt-1">{currentPath.title}</p>
                  <ProgressBar value={currentPath.progress || 0} showLabel label="Path progress" />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}