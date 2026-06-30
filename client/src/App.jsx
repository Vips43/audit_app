import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { ChecklistView } from "./components/CheckListView";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChecklistView />
    </>
  );
}

export default App;
