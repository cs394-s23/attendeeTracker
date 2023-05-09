import React, { useState, useEffect } from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";

import { useDbData } from "./utilities/firebase";



function App() {
  const [data, error] = useDbData("/");
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Home data={data} />
              </div>
            }
          />

          <Route
            path="/:eventId"
            element={
              <div>
                <Dashboard />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
