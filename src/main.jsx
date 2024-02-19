import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import { CountriesContextProvider } from "./contexts/CountriesContext.jsx";
import Layout from "./components/pages/Layout";
import CountriesPage from "./components/pages/CountriesPage";
import CountryPage from "./components/pages/CountryPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <CountriesContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CountriesPage />} />
            <Route path="/:country" element={<CountryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CountriesContextProvider>
  </ThemeContextProvider>,
);
