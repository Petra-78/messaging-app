import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
