import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      await api.post("/register", { username, email, password });
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-semibold">Create account</h1>
        {message && (
          <div className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-red-700">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-slate-300 p-3"
            />
          </label>
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
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Confirm password
            </span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-slate-300 p-3"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white"
          >
            Register
          </button>
        </form>
        <p className="mt-5 text-center text-slate-500">
          Already have an account?{" "}
          <Link className="text-sky-600" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
