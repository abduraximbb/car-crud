import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Car from "./components/car/Car";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Car />
      </div>
    </>
  );
}

export default App;
