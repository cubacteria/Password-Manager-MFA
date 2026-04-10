import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import Dashboard from "./pages/Dashboard";

const getToken = () => localStorage.getItem("token");

const ProtectedRoute = ({ children }) => {
  return getToken() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OTP />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
