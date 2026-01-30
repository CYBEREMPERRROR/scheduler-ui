import React, { useState } from "react";
import { scheduleLecture, fetchVenues } from "../api/backend";

export default function LecturerForm() {
  const [venues, setVenues] = useState([]);
  const [form, setForm] = useState({
    course: "",
    venue: "",
    date: "",
    start: "",
    end: "",
  });

  React.useEffect(() => {
    fetchVenues().then(setVenues);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await scheduleLecture(form);
    alert(JSON.stringify(res));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Schedule Lecture</h2>
      <input placeholder="Course" onChange={e => setForm({...form, course: e.target.value})} />
      <select onChange={e => setForm({...form, venue: e.target.value})}>
        <option value="">Select Venue</option>
        {venues.map(v => <option key={v.name} value={v.name}>{v.name}</option>)}
      </select>
      <input type="date" onChange={e => setForm({...form, date: e.target.value})} />
      <input type="number" placeholder="Start hour" onChange={e => setForm({...form, start: Number(e.target.value)})} />
      <input type="number" placeholder="End hour" onChange={e => setForm({...form, end: Number(e.target.value)})} />
      <button type="submit">Schedule</button>
    </form>
  );
}
