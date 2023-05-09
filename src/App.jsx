import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
