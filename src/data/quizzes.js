export const quizzes = [
  {
    id: 1, title: "JavaScript Fundamentals", category: "Frontend", difficulty: "Beginner", timeLimit: 600,
    questions: [
      { id: 1, question: "What is the output of typeof null in JavaScript?", options: ["null", "object", "undefined", "string"], correct: 1, explanation: "typeof null returns 'object' — this is a known JavaScript quirk." },
      { id: 2, question: "Which method removes the last element from an array?", options: ["shift()", "pop()", "splice()", "slice()"], correct: 1, explanation: "pop() removes and returns the last element of an array." },
      { id: 3, question: "What does === check in JavaScript?", options: ["Value only", "Type only", "Value and type", "Reference"], correct: 2, explanation: "=== is strict equality — checks both value and type." },
      { id: 4, question: "What is a closure in JavaScript?", options: ["A loop construct", "A function with access to outer scope", "An error handler", "A class method"], correct: 1, explanation: "A closure is a function that retains access to its outer lexical scope." },
      { id: 5, question: "Which keyword declares a block-scoped variable?", options: ["var", "let", "function", "global"], correct: 1, explanation: "let declares a block-scoped variable, unlike var which is function-scoped." },
    ]
  },
  {
    id: 2, title: "React.js Concepts", category: "Frontend", difficulty: "Intermediate", timeLimit: 600,
    questions: [
      { id: 1, question: "What hook is used for side effects in React?", options: ["useState", "useEffect", "useContext", "useRef"], correct: 1, explanation: "useEffect is used for side effects like data fetching and subscriptions." },
      { id: 2, question: "What does the key prop do in React lists?", options: ["Styles the element", "Helps React identify changed items", "Sets the element ID", "Adds event listeners"], correct: 1, explanation: "key helps React efficiently update and re-render list items." },
      { id: 3, question: "What is the virtual DOM?", options: ["A browser API", "A lightweight copy of the real DOM", "A CSS framework", "A database"], correct: 1, explanation: "Virtual DOM is React's in-memory representation of the real DOM for efficient updates." },
      { id: 4, question: "Which hook replaces componentDidMount?", options: ["useState", "useCallback", "useEffect with []", "useMemo"], correct: 2, explanation: "useEffect with an empty dependency array runs once after mount, like componentDidMount." },
      { id: 5, question: "What is prop drilling?", options: ["A performance optimization", "Passing props through many component levels", "A React hook", "A build tool"], correct: 1, explanation: "Prop drilling is passing data through multiple component layers unnecessarily." },
    ]
  },
  {
    id: 3, title: "Python & Data Science", category: "Data Science", difficulty: "Beginner", timeLimit: 600,
    questions: [
      { id: 1, question: "Which library is used for data manipulation in Python?", options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"], correct: 1, explanation: "Pandas is the primary library for data manipulation and analysis in Python." },
      { id: 2, question: "What does df.head() return?", options: ["Last 5 rows", "First 5 rows", "Column names", "Data types"], correct: 1, explanation: "df.head() returns the first 5 rows of a DataFrame by default." },
      { id: 3, question: "What is overfitting in ML?", options: ["Model performs well on all data", "Model memorizes training data but fails on new data", "Model is too simple", "Model has no parameters"], correct: 1, explanation: "Overfitting occurs when a model learns noise in training data and fails to generalize." },
      { id: 4, question: "Which algorithm is used for classification?", options: ["Linear Regression", "K-Means", "Logistic Regression", "PCA"], correct: 2, explanation: "Logistic Regression is used for binary and multi-class classification problems." },
      { id: 5, question: "What is a null value in a dataset?", options: ["Zero value", "Missing or undefined value", "Negative value", "String value"], correct: 1, explanation: "Null values represent missing or undefined data in a dataset." },
    ]
  },
];

export const mockInterviewQuestions = {
  Frontend: [
    { id: 1, question: "Explain the difference between var, let, and const.", type: "text", difficulty: "Easy" },
    { id: 2, question: "What is the event loop in JavaScript?", type: "text", difficulty: "Medium" },
    { id: 3, question: "How does React's reconciliation algorithm work?", type: "text", difficulty: "Hard" },
    { id: 4, question: "What are CSS specificity rules?", type: "text", difficulty: "Easy" },
    { id: 5, question: "Explain lazy loading and code splitting in React.", type: "text", difficulty: "Medium" },
  ],
  DSA: [
    { id: 1, question: "What is the time complexity of binary search?", type: "mcq", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1, difficulty: "Easy" },
    { id: 2, question: "Explain the difference between BFS and DFS.", type: "text", difficulty: "Medium" },
    { id: 3, question: "What data structure is used in a call stack?", type: "mcq", options: ["Queue", "Stack", "Heap", "Tree"], correct: 1, difficulty: "Easy" },
    { id: 4, question: "What is dynamic programming?", type: "text", difficulty: "Hard" },
    { id: 5, question: "What is the worst-case time complexity of quicksort?", type: "mcq", options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"], correct: 2, difficulty: "Medium" },
  ],
  "System Design": [
    { id: 1, question: "How would you design a URL shortener like bit.ly?", type: "text", difficulty: "Medium" },
    { id: 2, question: "What is horizontal vs vertical scaling?", type: "text", difficulty: "Easy" },
    { id: 3, question: "Explain CAP theorem.", type: "text", difficulty: "Hard" },
    { id: 4, question: "How would you design a notification system?", type: "text", difficulty: "Medium" },
    { id: 5, question: "What is a CDN and when would you use it?", type: "text", difficulty: "Easy" },
  ],
  HR: [
    { id: 1, question: "Tell me about yourself.", type: "text", difficulty: "Easy" },
    { id: 2, question: "Where do you see yourself in 5 years?", type: "text", difficulty: "Easy" },
    { id: 3, question: "Describe a challenging project you worked on.", type: "text", difficulty: "Medium" },
    { id: 4, question: "Why do you want to join this company?", type: "text", difficulty: "Easy" },
    { id: 5, question: "How do you handle tight deadlines?", type: "text", difficulty: "Medium" },
  ],
};
