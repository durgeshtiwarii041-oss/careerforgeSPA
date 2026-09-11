import React, { useState } from "react";
import { useApp } from "../context/AppContext";

const initialForm = {
  name: "",
  email: "",
  role: "",
  company: "",
  experience: "",
  domain: "",
  skills: "",
  style: "",
  pricing: "",
  availability: "",
};

export default function BecomeMentor() {
  const { showToast } = useApp();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);

  const update = (key, value) => {
    setForm(previous => ({ ...previous, [key]: value }));
  };

  const handleNext = () => {
    if (step === 1 && (!form.name.trim() || !form.email.trim() || !form.role.trim() || !form.experience || !form.domain)) {
      showToast("Please complete all required profile fields.", "error");
      return;
    }
    if (step === 2 && !form.skills.trim()) {
      showToast("Please add at least one area of expertise.", "error");
      return;
    }
    setStep(previous => Math.min(4, previous + 1));
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!form.style.trim() || !form.pricing.trim() || !form.availability.trim()) {
      showToast("Please complete your mentorship preferences.", "error");
      return;
    }
    showToast("Mentor application submitted! We will contact you soon.");
    setForm(initialForm);
    setStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Become a Mentor</h1>
        <p className="text-slate-500">Join 700+ mentors and inspire the next generation of careers.</p>
      </div>

      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3, 4].map(number => (
          <React.Fragment key={number}>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= number ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                {number}
              </div>
            </div>
            {number < 4 && <div className={`w-8 h-1 rounded ${step > number ? "bg-blue-600" : "bg-slate-200"}`} />}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="card p-6">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Your Profile</h2>
            <p className="text-sm text-slate-500 mb-5">Tell us about yourself.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required value={form.name} onChange={event => update("name", event.target.value)} className="input" placeholder="Full Name" />
              <input required type="email" value={form.email} onChange={event => update("email", event.target.value)} className="input" placeholder="Email" />
              <input required value={form.role} onChange={event => update("role", event.target.value)} className="input" placeholder="Current Role" />
              <input value={form.company} onChange={event => update("company", event.target.value)} className="input" placeholder="Company" />
              <input required type="number" min="1" value={form.experience} onChange={event => update("experience", event.target.value)} className="input" placeholder="Years of Experience" />
              <select required value={form.domain} onChange={event => update("domain", event.target.value)} className="input">
                <option value="">Select Domain</option>
                {["Engineering", "Data Science", "Product", "Design", "Business"].map(option => <option key={option}>{option}</option>)}
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Expertise</h2>
            <p className="text-sm text-slate-500 mb-5">What are you an expert in?</p>
            <textarea required value={form.skills} onChange={event => update("skills", event.target.value)} className="input resize-none" rows={4} placeholder="Skills (comma separated)" />
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Mentorship Style</h2>
            <p className="text-sm text-slate-500 mb-5">How do you want to mentor?</p>
            <textarea required value={form.style} onChange={event => update("style", event.target.value)} className="input resize-none" rows={4} placeholder="Describe your mentorship style..." />
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">Pricing & Availability</h2>
            <p className="text-sm text-slate-500 mb-5">Set your terms.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required value={form.pricing} onChange={event => update("pricing", event.target.value)} className="input" placeholder="Monthly Pricing (e.g. ₹2,000)" />
              <input required value={form.availability} onChange={event => update("availability", event.target.value)} className="input" placeholder="Availability (e.g. Weekends)" />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button type="button" onClick={() => setStep(previous => Math.max(1, previous - 1))} disabled={step === 1} className="btn-secondary disabled:opacity-40">
            Back
          </button>
          {step < 4 ? (
            <button type="button" onClick={handleNext} className="btn-primary">Continue</button>
          ) : (
            <button type="submit" className="btn-primary">Submit Application</button>
          )}
        </div>
      </form>
    </div>
  );
}
