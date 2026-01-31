// src/api.js

export async function fetchVenues() {
  const res = await fetch("https://YOUR-BACKEND.onrender.com/api/venues");
  const data = await res.json();
  return data;
}

export async function scheduleLecture(lectureData, token) {
  const res = await fetch(
    "https://YOUR-BACKEND.onrender.com/api/lecturer/lectures",
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
