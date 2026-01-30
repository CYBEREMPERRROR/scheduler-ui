import React, { useEffect, useState } from "react";
import { fetchSchedule } from "../api/backend";

export default function StudentCalendar() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetchSchedule().then(setSchedule);
  }, []);

  return (
    <div>
      <h2>Student Schedule</h2>
      <ul>
        {schedule.map((s,i) => (
          <li key={i}>{s.course} - {s.venue} - {s.date} ({s.start}:00 to {s.end}:00)</li>
        ))}
      </ul>
    </div>
  );
}
