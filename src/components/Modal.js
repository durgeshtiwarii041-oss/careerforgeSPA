import React, { useState } from "react";
import { X, Eye, EyeOff, Zap } from "lucide-react";
import { useApp } from "../context/AppContext";

export function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export function AuthModal({ onClose, initialMode = "login" }) {
  const { showToast, setUser, navigate } = useApp();
  const [mode, setMode] = useState(initialMode);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", goal: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (mode === "signup" && !form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (mode === "signup" && !form.goal) e.goal = "Please select your goal";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === "login") {
        showToast(`Welcome back! You're now logged in.`);
      } else {
        const initials = form.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
        setUser(prev => ({ ...prev, name: form.name, email: form.email, avatar: initials, goal: form.goal || prev.goal }));
        showToast(`Account created! Welcome to CareerForge, ${form.name.split(" ")[0]}!`);
      }
      onClose();
      navigate("dashboard");
    }, 800);
  };

  const Field = ({ label, name, type = "text", children }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {children || (
        <input
          type={type}
          value={form[name]}
          onChange={e => { setForm(p => ({ ...p, [name]: e.target.value })); setErrors(p => ({ ...p, [name]: "" })); }}
          className="input"
          placeholder={label}
        />
      )}
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Zap size={16} className="text-white" /></div>
              <span className="text-lg font-bold text-slate-900">Career<span className="text-blue-600">Forge</span></span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X size={20} /></button>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            {mode === "login" ? "Welcome back!" : "Create your account"}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {mode === "login" ? "Sign in to continue your learning journey." : "Join 50,000+ learners building their careers."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <Field label="Full Name" name="name" />
            )}
            <Field label="Email Address" name="email" type="email" />
            <Field label="Password" name="password">
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={e => { setForm(p => ({ ...p, password: e.target.value })); setErrors(p => ({ ...p, password: "" })); }}
                  className="input pr-10"
                  placeholder="Enter password"
                />
                <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </Field>
            {mode === "signup" && (
              <Field label="Career Goal" name="goal">
                <select value={form.goal} onChange={e => { setForm(p => ({ ...p, goal: e.target.value })); setErrors(p => ({ ...p, goal: "" })); }} className="input">
                  <option value="">Select your goal</option>
                  {["Full Stack Developer", "Frontend Developer", "Backend Developer", "Data Scientist", "Data Analyst", "UI/UX Designer", "AI/ML Engineer", "Product Manager"].map(g => <option key={g}>{g}</option>)}
                </select>
                {errors.goal && <p className="text-red-500 text-xs mt-1">{errors.goal}</p>}
              </Field>
            )}
            <button type="submit" disabled={loading} className="w-full btn-primary py-3 flex items-center justify-center gap-2">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{mode === "login" ? "Signing in..." : "Creating account..."}</>
              ) : (
                mode === "login" ? "Sign In" : "Create Account"
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-slate-500">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setErrors({}); }} className="text-blue-600 font-medium hover:underline">
                {mode === "login" ? "Sign up free" : "Sign in"}
              </button>
            </p>
          </div>

          {mode === "login" && (
            <p className="text-center text-xs text-slate-400 mt-3">
              Demo: use any email + 6+ char password
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function TrialSessionModal({ mentor, onClose }) {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: "", email: "", goal: "", date: "", time: "", challenge: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.goal) e.goal = "Please select a goal";
    if (!form.date) e.date = "Please select a date";
    if (!form.time) e.time = "Please select a time";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    showToast(`Trial session booked with ${mentor.name}! Check your email for confirmation.`);
    onClose();
  };

  const Field = ({ label, name, type = "text", children }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {children || <input type={type} value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))} className="input" />}
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <Modal title={`Book Free Trial with ${mentor.name}`} onClose={onClose}>
      <div className="flex items-center gap-3 mb-5 p-3 bg-blue-50 rounded-xl">
        <img src={mentor.photo} alt={mentor.name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-slate-900">{mentor.name}</p>
          <p className="text-sm text-slate-600">{mentor.role} @ {mentor.company}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Your Name" name="name" />
        <Field label="Email Address" name="email" type="email" />
        <Field label="Career Goal" name="goal">
          <select value={form.goal} onChange={e => setForm(p => ({ ...p, goal: e.target.value }))} className="input">
            <option value="">Select your goal</option>
            {["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Analyst", "Data Scientist", "UI/UX Designer", "AI/ML Engineer"].map(g => <option key={g}>{g}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Preferred Date" name="date" type="date" />
          <Field label="Preferred Time" name="time" type="time" />
        </div>
        <Field label="Main Challenge" name="challenge">
          <textarea value={form.challenge} onChange={e => setForm(p => ({ ...p, challenge: e.target.value }))} className="input resize-none" rows={3} placeholder="What do you want to discuss?" />
        </Field>
        <button type="submit" className="w-full btn-primary py-3">Book Free Trial Session</button>
      </form>
    </Modal>
  );
}

export function PricingModal({ plan, onClose }) {
  const { showToast } = useApp();
  return (
    <Modal title="Confirm Plan" onClose={onClose}>
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">{plan === "Free" ? "🎯" : plan === "Pro" ? "⚡" : "🚀"}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{plan} Plan Selected</h3>
        <p className="text-slate-500 mb-6">You're about to activate the {plan} plan. This is a demo — no real payment required.</p>
        <button onClick={() => { showToast(`${plan} plan activated! Welcome to CareerForge.`); onClose(); }} className="w-full btn-primary py-3">
          {plan === "Free" ? "Get Started Free" : "Activate Plan (Demo)"}
        </button>
      </div>
    </Modal>
  );
}

// Re-export ChatWindow so App.js can import it from here
export { default as ChatWindow } from "./ChatWindow";
