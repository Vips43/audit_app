import "./App.css";
import { ChecklistView } from "./components/CheckListView";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ToastContainer, toast } from 'react-toastify';


const Layout = () => {
  return (
    <>
      {/* <NotificationManager /> */}
      <ToastContainer position="top-center" autoClose={2000} />
      <div>
        <Outlet />
      </div>
    </>
  );
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route index={true} path="/" element={<Login />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/q" element={<ChecklistView />} />
      </Route>
    </Routes>
  );
}

export default App;
