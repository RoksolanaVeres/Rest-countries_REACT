import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import { CountriesContextProvider } from "./contexts/CountriesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <CountriesContextProvider>
      <App />
    </CountriesContextProvider>
  </ThemeContextProvider>,
);
