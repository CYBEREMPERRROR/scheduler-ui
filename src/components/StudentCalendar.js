import React, { useState } from "react";

export default function StudentCalendar() {
  const [schedule, setSchedule] = useState([]);
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");

  // Fetch lectures from backend with department & level filters
  const fetchLectures = async () => {
    if (!department || !level) {
      alert("Please enter both department and level");
      return;
    }

    try {
      const res = await fetch(
        `https://science-scheduler.onrender.com/lectures?department=${department}&level=${level}`
      );
      const data = await res.json();
      setSchedule(data);
    } catch (err) {
      console.error("Failed to fetch lectures", err);
      alert("Error fetching lectures from server");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Lecture Calendar</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchLectures();
        }}
        style={{ marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button type="submit">View Lectures</button>
      </form>

      {schedule.length === 0 ? (
        <p>No lectures found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Course</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((lec) => (
              <tr key={lec.id}>
                <td>{lec.course}</td>
                <td>{lec.venue}</td>
                <td>{lec.date}</td>
                <td>{lec.start}:00</td>
                <td>{lec.end_time}:00</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
