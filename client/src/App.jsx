import "./App.css";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Questions from "./components/Questions";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <main className="min-h-dvh max-w-dvw">
        <nav className="sticky top-0 bg-gray-200 h-10 border-b">
          <div className=" flex gap-5">
            <h2>Navbar</h2>
            <ul className="flex gap-4 ">
              <li onClick={() => navigate("/home")}>Home</li>
            </ul>
            <ul>
              <li onClick={() => navigate("/question")}>Questions</li>
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
          <Route path="question" element={<Questions />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

function NotFound() {
  return <Navigate to={"/"} replace />;
}
