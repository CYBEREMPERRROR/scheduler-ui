import React from "react";
import LecturerForm from "./components/LecturerForm";
import StudentCalendar from "./components/StudentCalendar";

function App() {
  return (
    <div style={{padding:"20px"}}>
      <LecturerForm />
      <hr />
      <StudentCalendar />
    </div>
  );
}

export default App;
