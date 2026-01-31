import React from "react";
import logo from "../assets/logo.png";
import "./Header.css";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <img src={logo} alt="School Logo" className="logo" />
        <h1>Science Lecture Scheduler</h1>
      </div>
    </header>
  );
}
