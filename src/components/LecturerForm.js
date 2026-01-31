import React, { useState, useEffect } from "react";
import { fetchVenues } from "../api"; // assuming fetchVenues is correct

export default function LecturerForm() {
  const [venues, setVenues] = useState([]);
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
        "https://YOUR-BACKEND.onrender.com/api/lecturer/lectures",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer dev-secret-123", // Replace with your Render ENV token
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Lecture scheduled successfully!");
        // Reset form
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
          {venues.map((v) => (
            <option key={v.name} value={v.name}>
              {v.name} (Capacity: {v.capacity})
            </option>
          ))}
        </select>
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
        Start Time (hour):
        <input
          type="number"
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          required
          min="0"
          max="23"
        />
      </label>

      <label>
        End Time (hour):
        <input
          type="number"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          required
          min="0"
          max="23"
        />
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

      <button type="submit">Schedule Lecture</button>
    </form>
  );
}
