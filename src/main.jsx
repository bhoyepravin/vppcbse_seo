import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

/* 🔒 GLOBAL PROTECTION CODE START */

// Disable right click
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable copy, cut, paste
["copy", "cut", "paste"].forEach((event) => {
  document.addEventListener(event, (e) => e.preventDefault());
});

// Disable keyboard shortcuts (Ctrl+C, Ctrl+U, Ctrl+S, Ctrl+P, F12, Ctrl+Shift+I)
document.addEventListener("keydown", (e) => {
  if (
    (e.ctrlKey && ["c", "u", "s", "p"].includes(e.key.toLowerCase())) ||
    (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") ||
    e.key === "F12"
  ) {
    e.preventDefault();
  }
});

// Blur page when tab is hidden (basic screenshot discourage)
document.addEventListener("visibilitychange", () => {
  document.body.classList.toggle("blur-content", document.hidden);
});

/* 🔒 GLOBAL PROTECTION CODE END */

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);