export const learningPaths = [
  {
    id: 1, title: "Full Stack Developer", icon: "💻", duration: "6 months", level: "Beginner to Advanced",
    description: "Master frontend and backend development to build complete web applications.",
    stages: [
      { id: 1, title: "Fundamentals", topics: ["HTML & CSS", "JavaScript Basics", "Git & GitHub"], status: "completed", courses: [8], weeks: 4 },
      { id: 2, title: "Frontend Core", topics: ["React.js", "State Management", "API Integration"], status: "current", courses: [2], weeks: 6 },
      { id: 3, title: "Backend Core", topics: ["Node.js", "Express", "REST APIs"], status: "locked", courses: [5], weeks: 5 },
      { id: 4, title: "Database & Deployment", topics: ["MongoDB", "SQL", "Docker", "AWS"], status: "locked", courses: [1], weeks: 4 },
      { id: 5, title: "Projects & Portfolio", topics: ["3 Full Stack Projects", "Portfolio Website"], status: "locked", courses: [], weeks: 4 },
      { id: 6, title: "Interview & Career", topics: ["DSA", "System Design", "Mock Interviews"], status: "locked", courses: [9], weeks: 3 },
    ],
    skills: ["React", "Node.js", "MongoDB", "JavaScript", "AWS"],
    jobs: ["Full Stack Developer", "MERN Stack Developer", "Software Engineer"],
  },
  {
    id: 2, title: "Frontend Developer", icon: "🎨", duration: "4 months", level: "Beginner to Intermediate",
    description: "Become a skilled frontend developer with React and modern CSS.",
    stages: [
      { id: 1, title: "Web Fundamentals", topics: ["HTML5", "CSS3", "Responsive Design"], status: "completed", courses: [8], weeks: 3 },
      { id: 2, title: "JavaScript Mastery", topics: ["ES6+", "DOM", "Async JS"], status: "completed", courses: [8], weeks: 4 },
      { id: 3, title: "React.js", topics: ["Components", "Hooks", "Redux"], status: "current", courses: [2], weeks: 5 },
      { id: 4, title: "Advanced Frontend", topics: ["Performance", "Testing", "TypeScript"], status: "locked", courses: [], weeks: 3 },
      { id: 5, title: "Projects & Career", topics: ["5 React Projects", "Portfolio", "Interviews"], status: "locked", courses: [], weeks: 3 },
    ],
    skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
    jobs: ["Frontend Developer", "React Developer", "UI Developer"],
  },
  {
    id: 3, title: "Data Scientist", icon: "📊", duration: "6 months", level: "Beginner to Advanced",
    description: "Learn data science from scratch — Python, ML, and real-world projects.",
    stages: [
      { id: 1, title: "Python Basics", topics: ["Python Syntax", "Data Structures", "OOP"], status: "completed", courses: [3], weeks: 3 },
      { id: 2, title: "Data Analysis", topics: ["Pandas", "NumPy", "Matplotlib", "SQL"], status: "current", courses: [6], weeks: 4 },
      { id: 3, title: "Machine Learning", topics: ["Supervised ML", "Unsupervised ML", "Model Evaluation"], status: "locked", courses: [7], weeks: 6 },
      { id: 4, title: "Deep Learning", topics: ["Neural Networks", "CNN", "NLP"], status: "locked", courses: [7], weeks: 5 },
      { id: 5, title: "Projects & Deployment", topics: ["3 ML Projects", "Flask API", "Streamlit"], status: "locked", courses: [], weeks: 4 },
    ],
    skills: ["Python", "ML", "Deep Learning", "SQL", "TensorFlow"],
    jobs: ["Data Scientist", "ML Engineer", "AI Engineer"],
  },
  {
    id: 4, title: "Data Analyst", icon: "📈", duration: "3 months", level: "Beginner",
    description: "Master data analysis tools and land your first analyst role.",
    stages: [
      { id: 1, title: "Excel & SQL", topics: ["Advanced Excel", "SQL Queries", "Joins"], status: "completed", courses: [6], weeks: 3 },
      { id: 2, title: "Python for Data", topics: ["Pandas", "Data Cleaning", "EDA"], status: "current", courses: [3], weeks: 3 },
      { id: 3, title: "Visualization", topics: ["Tableau", "Power BI", "Matplotlib"], status: "locked", courses: [], weeks: 3 },
      { id: 4, title: "Projects & Career", topics: ["3 Analytics Projects", "Dashboard", "Resume"], status: "locked", courses: [], weeks: 3 },
    ],
    skills: ["SQL", "Python", "Excel", "Tableau", "Power BI"],
    jobs: ["Data Analyst", "Business Analyst", "BI Analyst"],
  },
];

export const testimonials = [
  { id: 1, name: "Rahul Gupta", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", prevRole: "BCA Graduate (Fresher)", newRole: "Frontend Developer", company: "Infosys", quote: "CareerForge's structured learning path and mentor sessions helped me crack my first job in just 4 months. The mock interviews were exactly like the real ones!", path: "Frontend Developer" },
  { id: 2, name: "Priya Sharma", photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face", prevRole: "Marketing Executive", newRole: "Data Analyst", company: "Deloitte", quote: "I switched from marketing to data analytics with zero coding background. The step-by-step roadmap made it possible. Got placed in 5 months!", path: "Data Analyst" },
  { id: 3, name: "Amit Verma", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face", prevRole: "B.Tech CSE (Fresher)", newRole: "Full Stack Developer", company: "Startup (Series B)", quote: "The project-based learning approach was a game changer. I built 5 real projects and my mentor helped me negotiate a 9 LPA package!", path: "Full Stack Developer" },
  { id: 4, name: "Sneha Patel", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", prevRole: "Graphic Designer", newRole: "UI/UX Designer", company: "Zomato", quote: "The UI/UX path was comprehensive. My mentor reviewed my portfolio 3 times and helped me land a role at Zomato. Highly recommend!", path: "UI/UX Designer" },
  { id: 5, name: "Karan Mehta", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face", prevRole: "Non-CS Graduate", newRole: "Data Scientist", company: "Amazon", quote: "From zero Python knowledge to Data Scientist at Amazon in 8 months. The ML projects and mentor guidance were invaluable.", path: "Data Scientist" },
];
