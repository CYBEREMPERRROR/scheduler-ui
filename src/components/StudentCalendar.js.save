import React, { useState, useEffect } from "react";
import "./StudentCalendar.css";

export default function StudentCalendar() {
  const [lectures, setLectures] = useState([]);
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    fetch("https://science-scheduler.onrender.com/lectures")
      .then(res => res.json())
      .then(data => setLectures(data))
      .catch(err => console.error("Failed to fetch lectures", err));
  }, []);

  const filteredLectures = lectures.filter(
    lec =>
      (!department || lec.department === department) &&
      (!level || lec.level === level)
  );

  return (
  <div className="student-container" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
    <h2>Student Lecture Schedule</h2>
    <p>Filter lectures by department and level</p>

    {/* Filters */}
    <div className="filters" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <select value={department} onChange={e => setDepartment(e.target.value)}>
        <option value="">All Departments</option>
        <option value="CS">Computer Science</option>
        <option value="PHY">Physics</option>
        <option value="CHEM">Chemistry</option>
      </select>

      <select value={level} onChange={e => setLevel(e.target.value)}>
        <option value="">All Levels</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="300">300</option>
        <option value="400">400</option>
      </select>
    </div>

    {/* Lectures */}
{filteredLectures.length === 0 ? (
  <p>No lectures found.</p>
) : (
  <div className="lecture-cards">
    {filteredLectures.map((lec, idx) => (
      <div key={idx} className="lecture-card">
        <p>
          <strong>{lec.course}</strong> ({lec.department} - Level {lec.level})
        </p>
        <p>
          {lec.venue} | {lec.date} | {lec.start} – {lec.end}h
        </p>
      </div>
    ))}
  </div>
)}
