import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/login", { email, password });
      sessionStorage.setItem("otpEmail", email);
      navigate("/verify-otp");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-semibold">Login</h1>
        {message && (
          <div className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-red-700">
            {message}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-slate-300 p-3"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-slate-300 p-3"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white"
          >
            Send OTP
          </button>
        </form>
        <p className="mt-5 text-center text-slate-500">
          Need an account?{" "}
          <Link className="text-sky-600" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
