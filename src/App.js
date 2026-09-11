import React, { useCallback } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import { TrialSessionModal, AuthModal, ChatWindow } from "./components/Modal";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Mentors from "./pages/Mentors";
import MentorProfile from "./pages/MentorProfile";
import Projects from "./pages/Projects";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import MockInterviews from "./pages/MockInterviews";
import LearningPaths from "./pages/LearningPaths";
import ResumeLinkedIn from "./pages/ResumeLinkedIn";
import Community from "./pages/Community";
import Blog from "./pages/Blog";
import SuccessStories from "./pages/SuccessStories";
import BecomeMentor from "./pages/BecomeMentor";

function NotFound() {
  return (
    <div className="text-center py-32 text-slate-400">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-2xl font-bold text-slate-700 mb-2">Page Not Found</h2>
      <p className="mb-6">The page you're looking for doesn't exist.</p>
      <button onClick={() => window.location.reload()} className="btn-primary">Go Home</button>
    </div>
  );
}

const pageMap = {
  home: Home,
  courses: Courses,
  "course-detail": CourseDetail,
  mentors: Mentors,
  "mentor-profile": MentorProfile,
  projects: Projects,
  "project-detail": Projects,
  jobs: Jobs,
  dashboard: Dashboard,
  interviews: MockInterviews,
  paths: LearningPaths,
  "path-detail": LearningPaths,
  resume: ResumeLinkedIn,
  community: Community,
  blog: Blog,
  "success-stories": SuccessStories,
  "become-mentor": BecomeMentor,
};

function AppContent() {
  const { currentPage, modalOpen, setModalOpen, chatOpen, setChatOpen, chatConversations, sendMessage } = useApp();

  const closeModal = useCallback(() => setModalOpen(null), [setModalOpen]);
  const closeChat = useCallback(() => setChatOpen(null), [setChatOpen]);

  const PageComponent = pageMap[currentPage] || NotFound;

  // Resolve chat conversation from selected mentor
  let chatConversation = null;
  if (chatOpen) {
    chatConversation = chatConversations.find(c => c.mentorId === chatOpen.id) || {
      id: Date.now(),
      mentorId: chatOpen.id,
      mentorName: chatOpen.name,
      mentorPhoto: chatOpen.photo,
      lastMessage: "",
      lastTime: "",
      unread: 0,
      messages: [
        { id: 1, sender: "mentor", senderName: chatOpen.name, text: `Hi! I'm ${chatOpen.name}. How can I help you today?`, time: "Just now", date: "Today" },
      ],
    };
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <PageComponent />
      </main>
      <Footer />
      <Toast />
      {modalOpen?.type === "trial" && (
        <TrialSessionModal mentor={modalOpen.mentor} onClose={closeModal} />
      )}
      {modalOpen?.type === "auth" && (
        <AuthModal initialMode={modalOpen.mode || "login"} onClose={closeModal} />
      )}
      {chatConversation && (
        <ChatWindow
          conversation={chatConversation}
          onClose={closeChat}
          onSend={(text) => sendMessage(chatConversation.id, text)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}