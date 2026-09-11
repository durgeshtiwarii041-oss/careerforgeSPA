import React, { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle, TrendingUp, Briefcase, Code, BarChart2, Palette, Brain, ShoppingBag, MessageSquare } from "lucide-react";
import { useApp } from "../context/AppContext";
import CourseCard from "../components/CourseCard";
import MentorCard from "../components/MentorCard";
import ProjectCard from "../components/ProjectCard";
import { PricingModal } from "../components/Modal";
import { courses } from "../data/courses";
import { mentors } from "../data/mentors";
import { projects } from "../data/projects";
import { learningPaths, testimonials } from "../data/learningPaths";

// Fix: Store icon as component reference, not JSX element (JSX at module level causes React scope issues)
const careerGoals = [
  { Icon: Code, label: "Frontend Dev", color: "bg-blue-50 text-blue-600 border-blue-200" },
  { Icon: TrendingUp, label: "Backend Dev", color: "bg-green-50 text-green-600 border-green-200" },
  { Icon: Briefcase, label: "Full Stack", color: "bg-purple-50 text-purple-600 border-purple-200" },
  { Icon: BarChart2, label: "Data Analyst", color: "bg-orange-50 text-orange-600 border-orange-200" },
  { Icon: Brain, label: "Data Scientist", color: "bg-pink-50 text-pink-600 border-pink-200" },
  { Icon: Brain, label: "AI/ML", color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
  { Icon: Palette, label: "UI/UX Designer", color: "bg-rose-50 text-rose-600 border-rose-200" },
  { Icon: ShoppingBag, label: "Business Analyst", color: "bg-teal-50 text-teal-600 border-teal-200" },
  { Icon: MessageSquare, label: "Digital Marketing", color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
];

const howItWorks = [
  { step: "01", title: "Choose Your Goal", desc: "Select your target career path from our curated options.", icon: "🎯" },
  { step: "02", title: "Learn & Build", desc: "Follow structured courses and build real-world projects.", icon: "📚" },
  { step: "03", title: "Find a Mentor", desc: "Connect with industry experts for 1:1 guidance.", icon: "🤝" },
  { step: "04", title: "Practice Interviews", desc: "Ace mock interviews with AI-powered feedback.", icon: "💬" },
  { step: "05", title: "Improve Your Profile", desc: "Get resume and LinkedIn optimization tips.", icon: "✨" },
  { step: "06", title: "Track Job Readiness", desc: "Monitor your progress and apply to curated jobs.", icon: "🚀" },
];

const faqData = [
  { q: "How are courses delivered?", a: "Courses are available in both live and recorded formats. Live sessions have scheduled timings while recorded content is available 24/7 at your own pace." },
  { q: "How does mentorship work?", a: "You can browse verified industry mentors, view their profiles, and book a free trial session. After the trial, you can continue with regular 1:1 sessions." },
  { q: "Are the projects real-world?", a: "Yes! All projects are based on real-world problem statements. They are portfolio-ready and guided step-by-step to help you build practical skills." },
  { q: "What are mock interviews?", a: "Mock interviews simulate real technical and HR interviews. You get questions by category, a timer, and a score with feedback on strengths and weak areas." },
  { q: "Do I get a certificate?", a: "Yes, certificates are awarded on eligible programs upon successful completion. Each certificate has a unique ID for verification." },
  { q: "Is this platform suitable for beginners?", a: "Absolutely! CareerForge is designed for students, freshers and career switchers. All learning paths start from fundamentals." },
  { q: "Is this a real platform with backend?", a: "CareerForge is a frontend-only demo SPA. All data is mock/static. No real payments, authentication or backend services are involved." },
];

export default function Home() {
  const { navigate } = useApp();
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [pricingModal, setPricingModal] = useState(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>10,000+ learners placed in top companies</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight">
            Learn Skills. Get Mentored.<br /><span className="text-yellow-300">Become Job Ready.</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            The complete career development platform — structured learning, real projects, industry mentors, mock interviews and job support. All in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate("paths")} className="bg-white text-blue-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
              Explore Learning Paths <ArrowRight size={18} />
            </button>
            <button onClick={() => navigate("mentors")} className="bg-white/10 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-colors">
              Find a Mentor
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-blue-100">
            {[["50+", "Courses"], ["200+", "Mentors"], ["10k+", "Learners"], ["4.8★", "Rating"]].map(([n, l]) => (
              <div key={l} className="text-center"><div className="text-2xl font-bold text-white">{n}</div><div>{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm font-medium text-slate-600">
            {["✅ Practical Learning", "🎓 Industry Mentorship", "🛠️ Real Projects", "💬 Mock Interviews", "📄 Resume Support", "🏆 Certification"].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Career Goals */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">What's Your Career Goal?</h2>
            <p className="text-slate-500">Choose your path and we'll build a personalized roadmap for you.</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 gap-3">
            {careerGoals.map(({ Icon, label, color }) => (
              <button key={label} onClick={() => navigate("paths")}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 hover:shadow-md transition-all ${color}`}>
                <Icon size={22} />
                <span className="text-xs font-medium text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Learning Paths</h2>
              <p className="text-slate-500">Structured roadmaps from beginner to job-ready.</p>
            </div>
            <button onClick={() => navigate("paths")} className="btn-secondary hidden sm:flex items-center gap-2">View All <ArrowRight size={16} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningPaths.map(path => (
              <button key={path.id} onClick={() => navigate("path-detail", { path })}
                className="card p-5 text-left hover:border-blue-300 hover:shadow-md transition-all group">
                <div className="text-3xl mb-3">{path.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{path.title}</h3>
                <p className="text-sm text-slate-500 mb-3 line-clamp-2">{path.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>⏱ {path.duration}</span>
                  <span className="text-blue-600 font-medium">Explore →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Courses</h2>
              <p className="text-slate-500">Job-focused courses with live sessions and real projects.</p>
            </div>
            <button onClick={() => navigate("courses")} className="btn-secondary hidden sm:flex items-center gap-2">All Courses <ArrowRight size={16} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courses.slice(0, 4).map(c => <CourseCard key={c.id} course={c} />)}
          </div>
          <div className="text-center mt-6 sm:hidden">
            <button onClick={() => navigate("courses")} className="btn-secondary">View All Courses</button>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Project Garage</h2>
              <p className="text-slate-500">Real-world projects to build your portfolio.</p>
            </div>
            <button onClick={() => navigate("projects")} className="btn-secondary hidden sm:flex items-center gap-2">All Projects <ArrowRight size={16} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.slice(0, 4).map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Meet Our Mentors</h2>
              <p className="text-slate-500">Industry experts from top companies ready to guide you.</p>
            </div>
            <button onClick={() => navigate("mentors")} className="btn-secondary hidden sm:flex items-center gap-2">All Mentors <ArrowRight size={16} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mentors.slice(0, 4).map(m => <MentorCard key={m.id} mentor={m} />)}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">How CareerForge Works</h2>
            <p className="text-slate-500">Your complete journey from learner to job-ready professional.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {howItWorks.map(item => (
              <div key={item.step} className="flex gap-4 p-5 card">
                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                <div>
                  <div className="text-xs font-bold text-blue-600 mb-1">STEP {item.step}</div>
                  <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Success Stories</h2>
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 mb-6">
            <div className="flex items-center justify-center gap-4 mb-5">
              <img src={testimonials[testimonialIdx].photo} alt={testimonials[testimonialIdx].name} className="w-16 h-16 rounded-full object-cover border-2 border-white/30" />
              <div className="text-left">
                <p className="font-semibold text-white">{testimonials[testimonialIdx].name}</p>
                <p className="text-sm text-blue-200">{testimonials[testimonialIdx].prevRole} → <span className="text-yellow-300 font-medium">{testimonials[testimonialIdx].newRole}</span></p>
                <p className="text-sm text-blue-200">@ {testimonials[testimonialIdx].company}</p>
              </div>
            </div>
            <p className="text-blue-100 italic text-lg leading-relaxed">"{testimonials[testimonialIdx].quote}"</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setTestimonialIdx(prev => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === testimonialIdx ? "bg-white w-6" : "bg-white/40 w-2"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setTestimonialIdx(prev => (prev + 1) % testimonials.length)}
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Simple, Transparent Pricing</h2>
            <p className="text-slate-500">Choose the plan that fits your career goals.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Free", price: "₹0", period: "forever", features: ["5 free courses", "Basic projects", "Community access", "Quiz practice", "Job board access"], cta: "Get Started Free", highlight: false },
              { name: "Pro", price: "₹999", period: "/month", features: ["All courses", "All learning paths", "All projects", "Assessments & quizzes", "Certificates", "Priority support"], cta: "Start Pro", highlight: true },
              { name: "Career", price: "₹2,499", period: "/month", features: ["Everything in Pro", "1:1 Mentor sessions", "Mock interviews", "Resume review", "LinkedIn optimization", "Job referrals"], cta: "Start Career Plan", highlight: false },
            ].map(plan => (
              <div key={plan.name} className={`card p-6 ${plan.highlight ? "border-blue-500 border-2 relative" : ""}`}>
                {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>}
                <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                <div className="mb-4"><span className="text-3xl font-extrabold text-slate-900">{plan.price}</span><span className="text-slate-500 text-sm">{plan.period}</span></div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle size={15} className="text-green-500 flex-shrink-0" />{f}</li>)}
                </ul>
                <button onClick={() => setPricingModal(plan.name)} className={`w-full py-2.5 rounded-lg font-semibold transition-colors ${plan.highlight ? "btn-primary" : "btn-secondary"}`}>{plan.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqData.map((item, i) => (
              <div key={i} className="card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                  <span className="font-medium text-slate-900">{item.q}</span>
                  <span className={`text-slate-400 transition-transform duration-200 inline-block ${openFaq === i ? "rotate-180" : ""}`}>▼</span>
                </button>
                {openFaq === i && <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {pricingModal && <PricingModal plan={pricingModal} onClose={() => setPricingModal(null)} />}
    </div>
  );
}
