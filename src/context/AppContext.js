import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { mockUser } from "../data/users";
import { chatConversations } from "../data/chatMessages";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [modalOpen, setModalOpen] = useState(null);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(mockUser);
  const [dashboardTab, setDashboardTab] = useState("overview");
  const [chatOpen, setChatOpen] = useState(null);
  const [chatConversationsState, setChatConversationsState] = useState(chatConversations);

  const [savedJobs, setSavedJobs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cf_savedJobs")) || []; } catch { return []; }
  });
  const [applications, setApplications] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cf_applications")) || []; } catch { return []; }
  });
  const [courseProgress, setCourseProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cf_courseProgress")) || {}; } catch { return {}; }
  });
  const [projectProgress, setProjectProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cf_projectProgress")) || {}; } catch { return {}; }
  });

  useEffect(() => { localStorage.setItem("cf_savedJobs", JSON.stringify(savedJobs)); }, [savedJobs]);
  useEffect(() => { localStorage.setItem("cf_applications", JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem("cf_courseProgress", JSON.stringify(courseProgress)); }, [courseProgress]);
  useEffect(() => { localStorage.setItem("cf_projectProgress", JSON.stringify(projectProgress)); }, [projectProgress]);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const navigate = useCallback((page, data = null) => {
    setCurrentPage(page);
    if (data?.course) setSelectedCourse(data.course);
    if (data?.mentor) setSelectedMentor(data.mentor);
    if (data?.path) setSelectedPath(data.path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleSaveJob = useCallback((job) => {
    setSavedJobs(prev => {
      const exists = prev.find(j => j.id === job.id);
      if (exists) {
        showToast("Job removed from saved", "info");
        return prev.filter(j => j.id !== job.id);
      }
      showToast("Job saved successfully!");
      return [...prev, job];
    });
  }, [showToast]);

  const addApplication = useCallback((job) => {
    setApplications(prev => {
      const exists = prev.find(a => a.jobId === job.id);
      if (exists) {
        showToast("Already applied to this job", "info");
        return prev;
      }
      showToast(`Applied to ${job.title} at ${job.company}!`);
      return [...prev, {
        id: Date.now(),
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        status: "Applied",
        appliedDate: new Date().toLocaleDateString(),
        logo: job.logo,
      }];
    });
  }, [showToast]);

  const updateApplicationStatus = useCallback((id, status) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  }, []);

  const deleteApplication = useCallback((id) => {
    setApplications(prev => prev.filter(a => a.id !== id));
    showToast("Application removed", "info");
  }, [showToast]);

  const updateCourseProgress = useCallback((courseId, lessonIndex) => {
    setCourseProgress(prev => ({ ...prev, [courseId]: Math.max(prev[courseId] || 0, lessonIndex) }));
  }, []);

  const startProject = useCallback((projectId) => {
    setProjectProgress(prev => {
      if (prev[projectId]) return prev;
      showToast("Project started! Good luck!");
      return { ...prev, [projectId]: 10 };
    });
  }, [showToast]);

  const sendMessage = useCallback((conversationId, text) => {
    setChatConversationsState(prev => prev.map(conv => {
      if (conv.id !== conversationId) return conv;
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const newMsg = { id: Date.now(), sender: "user", senderName: "You", text, time, date: "Today" };
      const updated = { ...conv, messages: [...conv.messages, newMsg], lastMessage: text, lastTime: time, unread: 0 };
      // simulate mentor reply
      setTimeout(() => {
        setChatConversationsState(p2 => p2.map(c => {
          if (c.id !== conversationId) return c;
          const replies = [
            "Got it! Let me think about that and get back to you with a concrete plan.",
            "Thanks for sharing. That's a great question — let's discuss it in our next session.",
            "I see what you mean. Try breaking it down into smaller steps.",
            "Good point. I'll send you a few resources that cover this in detail.",
            "Makes sense. Keep up the momentum — you're on the right track!",
          ];
          const reply = { id: Date.now() + 1, sender: "mentor", senderName: conv.mentorName, text: replies[Math.floor(Math.random() * replies.length)], time, date: "Today" };
          return { ...c, messages: [...c.messages, reply], lastMessage: reply.text, lastTime: time };
        }));
      }, 1200);
      return updated;
    }));
  }, []);

  return (
    <AppContext.Provider value={{
      currentPage, navigate, selectedCourse, selectedMentor, selectedPath,
      modalOpen, setModalOpen, toast, setToast, showToast, user, setUser,
      savedJobs, toggleSaveJob,
      applications, addApplication, updateApplicationStatus, deleteApplication,
      courseProgress, updateCourseProgress,
      projectProgress, startProject,
      dashboardTab, setDashboardTab,
      chatOpen, setChatOpen,
      chatConversations: chatConversationsState,
      sendMessage,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);