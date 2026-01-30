import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LecturerForm from "./components/LecturerForm";
import StudentCalendar from "./components/StudentCalendar";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/lecturer">Lecturer</Link> | 
        <Link to="/student">Student</Link>
      </nav>
      <Routes>
        <Route path="/lecturer" element={<LecturerForm />} />
        <Route path="/student" element={<StudentCalendar />} />
        <Route path="*" element={<div>Welcome to Science Scheduler</div>} />
      </Routes>
    </Router>
  );
}

export default App;
