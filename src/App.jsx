import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Create from "./components/Create.jsx";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";

import { useDbData } from "./utilities/firebase";

function App() {
  const [data, error] = useDbData("/");
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <div>
                <Home data={data} />
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div>
                <SignIn />
              </div>
            }
          />

          <Route
            path="/:eventId"
            element={
              <div>
                <Dashboard data={data} />
              </div>
            }
          />

          <Route path="/create" element={<Create data={data} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
