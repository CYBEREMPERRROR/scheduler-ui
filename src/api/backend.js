// src/api/backend.js

const BASE_URL = "https://science-scheduler.onrender.com/"; // replace with your Render URL

export const fetchVenues = async () => {
  const res = await fetch(`${BASE_URL}/venues`);
  return res.json();
};

export const scheduleLecture = async (lectureData) => {
  const res = await fetch(`${BASE_URL}/schedule`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lectureData),
  });
  return res.json();
};

export const fetchSchedule = async () => {
  const res = await fetch(`${BASE_URL}/schedule`);
  return res.json();
};
