export const mockUser = {
  id: 1,
  name: "Durgesh Tiwari",
  email: "durgesh@example.com",
  avatar: "DT",
  goal: "Full Stack Developer",
  joinDate: "Jan 2024",
  streak: 12,
  profileCompletion: 72,
  stats: {
    coursesEnrolled: 3,
    coursesCompleted: 1,
    projectsCompleted: 2,
    mockInterviews: 4,
    mentorSessions: 2,
    jobsApplied: 5,
    certificates: 1,
    interviewReadiness: 65,
  },
  currentCourse: { id: 1, title: "Full Stack Web Development", progress: 45 },
  currentPath: { id: 1, title: "Full Stack Developer", progress: 38 },
  upcomingSession: { mentor: "Ananya Krishnan", date: "Tomorrow", time: "6:00 PM", topic: "React Performance Optimization" },
  recentActivity: [
    { type: "lesson", text: "Completed: React Hooks Deep Dive", time: "2 hours ago" },
    { type: "quiz", text: "Scored 80% in JavaScript Quiz", time: "Yesterday" },
    { type: "project", text: "Started: E-Commerce Platform", time: "2 days ago" },
    { type: "interview", text: "Completed Frontend Mock Interview", time: "3 days ago" },
  ],
};

export const communityQuestions = [
  { id: 1, title: "How to handle async state updates in React?", category: "React", author: "Rahul K", answers: 3, likes: 12, time: "2 hours ago", answered: true },
  { id: 2, title: "Best way to learn DSA for placements?", category: "DSA", author: "Priya M", answers: 5, likes: 28, time: "5 hours ago", answered: true },
  { id: 3, title: "How to transition from non-CS to data science?", category: "Career", author: "Amit S", answers: 2, likes: 19, time: "1 day ago", answered: false },
  { id: 4, title: "What projects should I build for a frontend portfolio?", category: "Frontend", author: "Sneha R", answers: 7, likes: 34, time: "2 days ago", answered: true },
  { id: 5, title: "How to prepare for system design interviews?", category: "System Design", author: "Karan P", answers: 4, likes: 22, time: "3 days ago", answered: false },
];
