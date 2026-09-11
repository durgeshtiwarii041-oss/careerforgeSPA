import React, { useState, useEffect, useCallback } from "react";
import { Timer, ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react";
import { mockInterviewQuestions, quizzes } from "../data/quizzes";
import ProgressBar from "../components/ProgressBar";

const categories = Object.keys(mockInterviewQuestions);

function InterviewSession({ category, onFinish }) {
  const questions = mockInterviewQuestions[category];
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [submitted, setSubmitted] = useState(false);

  // Fix: useCallback to avoid stale closure in setInterval
  const handleSubmit = useCallback(() => setSubmitted(true), []);

  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { handleSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [submitted, handleSubmit]);

  const q = questions[current];
  const mcqTotal = questions.filter(q => q.type === "mcq").length;
  const score = questions.filter(q => q.type === "mcq" && answers[q.id] === q.correct).length;

  if (submitted) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="card p-8 text-center max-w-lg mx-auto">
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Interview Complete!</h2>
          <p className="text-slate-500 mb-6">Category: {category}</p>
          {mcqTotal > 0 && (
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <div className="text-3xl font-bold text-blue-600">{score}/{mcqTotal}</div>
              <div className="text-sm text-slate-500">MCQ Score</div>
            </div>
          )}
          <div className="text-left space-y-2 mb-6">
            <p className="text-sm font-medium text-slate-700">✅ Strengths: Clear communication, structured answers</p>
            <p className="text-sm font-medium text-slate-700">⚠️ Improve: Practice more {category} concepts</p>
            <p className="text-sm font-medium text-slate-700">📚 Recommended: Take the {category} course</p>
          </div>
          <button onClick={onFinish} className="btn-primary w-full">Back to Interviews</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-600">Question {current + 1} of {questions.length}</span>
          <div className={`flex items-center gap-2 text-sm font-semibold ${timeLeft < 60 ? "text-red-600" : "text-slate-600"}`}>
            <Timer size={16} />{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </div>
        </div>
        <ProgressBar value={current + 1} max={questions.length} />
        <div className="card p-6 mt-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <span className={`badge ${q.difficulty === "Easy" ? "bg-green-100 text-green-700" : q.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{q.difficulty}</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">{q.question}</h3>
          {q.type === "mcq" ? (
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => setAnswers(prev => ({ ...prev, [q.id]: i }))}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-colors text-sm ${answers[q.id] === i ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 hover:border-slate-300 text-slate-700"}`}>
                  <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                </button>
              ))}
            </div>
          ) : (
            <textarea
              value={answers[q.id] || ""}
              onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
              className="input resize-none"
              rows={5}
              placeholder="Type your answer here..."
            />
          )}
        </div>
        <div className="flex gap-3">
          <button onClick={() => setCurrent(prev => Math.max(0, prev - 1))} disabled={current === 0} className="btn-secondary flex items-center gap-2 disabled:opacity-40">
            <ChevronLeft size={16} />Previous
          </button>
          {current < questions.length - 1
            ? <button onClick={() => setCurrent(prev => prev + 1)} className="btn-primary flex items-center gap-2 ml-auto">Next <ChevronRight size={16} /></button>
            : <button onClick={handleSubmit} className="btn-primary ml-auto">Submit Interview</button>
          }
        </div>
      </div>
    </div>
  );
}

function QuizSession({ quiz, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);

  const handleSubmit = useCallback(() => setSubmitted(true), []);

  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { handleSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [submitted, handleSubmit]);

  const q = quiz.questions[current];
  const score = quiz.questions.filter(q => answers[q.id] === q.correct).length;

  if (submitted) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="card p-8 max-w-lg mx-auto">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">{score >= quiz.questions.length * 0.8 ? "🏆" : score >= quiz.questions.length * 0.6 ? "👍" : "📚"}</div>
            <h2 className="text-2xl font-bold text-slate-900">Quiz Complete!</h2>
            <div className="text-4xl font-bold text-blue-600 mt-3">{score}/{quiz.questions.length}</div>
            <p className="text-slate-500 text-sm mt-1">{Math.round((score / quiz.questions.length) * 100)}% correct</p>
          </div>
          <div className="space-y-3 mb-6">
            {quiz.questions.map(ques => (
              <div key={ques.id} className={`flex items-start gap-3 p-3 rounded-lg ${answers[ques.id] === ques.correct ? "bg-green-50" : "bg-red-50"}`}>
                {answers[ques.id] === ques.correct
                  ? <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  : <XCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                }
                <div>
                  <p className="text-sm font-medium text-slate-800">{ques.question}</p>
                  {answers[ques.id] !== ques.correct && <p className="text-xs text-slate-500 mt-1">✓ {ques.options[ques.correct]}</p>}
                  <p className="text-xs text-slate-400 mt-1">{ques.explanation}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={onFinish} className="btn-primary w-full">Back to Quizzes</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-600">{quiz.title} — Q{current + 1}/{quiz.questions.length}</span>
          <div className={`flex items-center gap-2 text-sm font-semibold ${timeLeft < 60 ? "text-red-600" : "text-slate-600"}`}>
            <Timer size={16} />{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </div>
        </div>
        <ProgressBar value={current + 1} max={quiz.questions.length} />
        <div className="card p-6 mt-4 mb-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">{q.question}</h3>
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => setAnswers(prev => ({ ...prev, [q.id]: i }))}
                className={`w-full text-left p-3 rounded-lg border-2 transition-colors text-sm ${answers[q.id] === i ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 hover:border-slate-300 text-slate-700"}`}>
                <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setCurrent(prev => Math.max(0, prev - 1))} disabled={current === 0} className="btn-secondary flex items-center gap-2 disabled:opacity-40">
            <ChevronLeft size={16} />Prev
          </button>
          {current < quiz.questions.length - 1
            ? <button onClick={() => setCurrent(prev => prev + 1)} className="btn-primary ml-auto flex items-center gap-2">Next <ChevronRight size={16} /></button>
            : <button onClick={handleSubmit} className="btn-primary ml-auto">Submit Quiz</button>
          }
        </div>
      </div>
    </div>
  );
}

export default function MockInterviews() {
  const [mode, setMode] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [tab, setTab] = useState("interview");

  if (mode === "interview" && selectedCategory) return <InterviewSession category={selectedCategory} onFinish={() => { setMode("home"); setSelectedCategory(null); }} />;
  if (mode === "quiz" && selectedQuiz) return <QuizSession quiz={selectedQuiz} onFinish={() => { setMode("home"); setSelectedQuiz(null); }} />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Mock Interviews & Quizzes</h1>
        <p className="text-slate-500">Practice with real interview questions and get instant feedback.</p>
      </div>
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        {["interview", "quiz"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors capitalize ${tab === t ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
            {t === "interview" ? "Mock Interviews" : "Quizzes & Assessments"}
          </button>
        ))}
      </div>
      {tab === "interview" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setSelectedCategory(cat); setMode("interview"); }}
              className="card p-5 text-left hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="text-3xl mb-3">{cat === "Frontend" ? "🎨" : cat === "DSA" ? "🧮" : cat === "System Design" ? "🏗️" : "💬"}</div>
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{cat}</h3>
              <p className="text-sm text-slate-500 mt-1">{mockInterviewQuestions[cat].length} questions</p>
              <div className="mt-3 text-xs text-blue-600 font-medium">Start Interview →</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map(quiz => (
            <button key={quiz.id} onClick={() => { setSelectedQuiz(quiz); setMode("quiz"); }}
              className="card p-5 text-left hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className={`badge ${quiz.difficulty === "Beginner" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{quiz.difficulty}</span>
                <span className="text-xs text-slate-400">{quiz.timeLimit / 60} min</span>
              </div>
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{quiz.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{quiz.questions.length} questions • {quiz.category}</p>
              <div className="mt-3 text-xs text-blue-600 font-medium">Start Quiz →</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
