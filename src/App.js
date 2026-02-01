import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LecturerForm from "./components/LecturerForm";
import StudentCalendar from "./components/StudentCalendar";
import Header from "./components/Header";
import "./cards.css";

// Landing page with role selection
function Landing() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card role-grid">
        <div className="role-card" onClick={() => navigate("/lecturer")}>
          <h3>Lecturer</h3>
          <p>Schedule and manage lectures</p>
        </div>

        <div className="role-card" onClick={() => navigate("/student")}>
          <h3>Student</h3>
          <p>View lecture timetable</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/lecturer" element={<LecturerForm />} />
        <Route path="/student" element={<StudentCalendar />} />
      </Routes>
    </>
  );
}
