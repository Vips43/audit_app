import "./App.css";
import { ChecklistView } from "./components/CheckListView";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";


const Layout = () => {
  const navigate = useNavigate();
  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <main className="max-h-dvh">
        <nav>
          <div className=" flex gap-5">
            <h2>Navbar</h2>
            <ul className="flex gap-4 ">
              <li onClick={() => navigate("/home")}>Home</li>
            </ul>
            <ul>
              <li onClick={() => navigate("/q")}>Questions</li>
            </ul>
          </div>
        </nav>
        <Outlet />
      </main>
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="q" element={<ChecklistView />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
