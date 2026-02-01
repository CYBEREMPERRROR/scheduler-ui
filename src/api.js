// src/api.js

const BASE_URL = "https://science-scheduler.onrender.com";

export async function fetchVenues() {
  const res = await fetch(`${BASE_URL}/api/venues`);
  const data = await res.json();
  return data;
}

export async function scheduleLecture(lectureData, token) {
  const res = await fetch(
    `${BASE_URL}/api/lecturer/lectures`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(lectureData),
    }
  );
  return res.json();
}
