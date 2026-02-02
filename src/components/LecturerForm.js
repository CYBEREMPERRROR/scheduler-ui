import React, { useState, useEffect } from "react";
import { fetchVenues } from "../api";
import "./LecturerForm.css";
export default function LecturerFormWrapper() {
  const [hasAccess, setHasAccess] = useState(false);
  const [keyInput, setKeyInput] = useState("");

  const handleKeySubmit = () => {
    // call backend to verify token
    fetch("https://science-scheduler.onrender.com/api/lecturer/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: keyInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) setHasAccess(true);
        else alert("Invalid access key!");
      })
      .catch(() => alert("Error verifying key"));
  };

  if (!hasAccess) {
    return (
      <div className="lecturer-access">
        <h2>Enter Lecturer Access Key</h2>
        <input
          type="password"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="Access Key"
        />
        <button onClick={handleKeySubmit}>Submit</button>
      </div>
    );
  }

  return <LecturerFormComponent />;
}

function LecturerForm() {
  const [venues, setVenues] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [form, setForm] = useState({
    course: "",
    venue: "",
    date: "",
    start: "",
    end_time: "",
    department: "",
    level: "",
  });

  useEffect(() => {
    fetchVenues()
      .then((data) => {
        if (Array.isArray(data)) {
          setVenues(data);
        } else {
          console.error("Venues response is not an array:", data);
          setVenues([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch venues", err);
        setVenues([]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://science-scheduler.onrender.com/api/lecturer/lectures",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer dev-secret-123",
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
          start: "",
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
            <option value="">Select a venue</option>
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
            type="time"
            name="start"
            value={form.start}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          End Time:
          <input
            type="time"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Schedule Lecture</button>
      </form>

      <h3>Current Lectures</h3>
      <div className="lecture-cards">
        {lectures.length === 0 ? (
          <p>No lectures scheduled yet.</p>
        ) : (
          lectures.map((lec, idx) => (
            <div key={idx} className="lecture-card">
              <p>
                <strong>{lec.course}</strong> ({lec.department} - Level{" "}
                {lec.level})
              </p>
              <p>
                {lec.venue} | {lec.date} | {lec.start} – {lec.end_time}h
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


