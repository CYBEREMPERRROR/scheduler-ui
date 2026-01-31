import React, { useState, useEffect } from "react";
import { fetchVenues } from "../api";
//import "./LecturerForm.css";

export default function LecturerForm() {
  const [venues, setVenues] = useState([]);
  const [lectures, setLectures] = useState([]); // FIX: lectures was missing
  const [form, setForm] = useState({
    course: "",
    venue: "",
    date: "",
    start_time: "",
    end_time: "",
    department: "",
    level: "",
  });

  // Fetch venues on mount
  useEffect(() => {
    fetchVenues().then(setVenues);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://science-scheduler.onrender.com/api/lecturer/lectures",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer dev-secret-123",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Lecture scheduled successfully!");
        setForm({
          course: "",
          venue: "",
          date: "",
          start_time: "",
          end_time: "",
          department: "",
          level: "",
        });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Failed to schedule lecture", err);
      alert("Failed to schedule lecture. Check console for details.");
    }
  };

  return (
    <div className="lecturer-container">
      <form onSubmit={handleSubmit}>
        <h2>Schedule Lecture</h2>

        <label>
          Course:
          <input
            type="text"
            name="course"
            value={form.course}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Venue:
          <select
            name="venue"
            value={form.venue}
            onChange={handleChange}
            required
          >
            {venues.map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>

        <label>
          Department:
          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Level:
          <input
            type="text"
            name="level"
            value={form.level}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Start Time:
          <input
            type="number"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          End Time:
          <input
            type="number"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Schedule Lecture</button>
      </form>

      {/* Display current lectures */}
      <h3>Current Lectures</h3>

      <div className="lecture-cards">
        {lectures.map((lec, idx) => (
          <div key={idx} className="lecture-card">
            <p>
              <strong>{lec.course}</strong> ({lec.department} - Level{" "}
              {lec.level})
            </p>
            <p>
              {lec.venue} | {lec.date} | {lec.start_time} – {lec.end_time}h
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

