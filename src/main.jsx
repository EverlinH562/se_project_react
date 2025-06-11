import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter basename="/se_project_react"
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
    >
      <App />
    </BrowserRouter>
  </StrictMode>
);