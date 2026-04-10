import { useState } from "react";
import api from "../api";

export default function OTPModal({ email, onVerified, onClose }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      const response = await api.post("/auth/verify-otp", { email, otp });
      localStorage.setItem("token", response.data.token);
      onVerified();
    } catch (err) {
      setMessage(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Verify OTP</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900"
          >
            Close
          </button>
        </div>
        <p className="mb-4 text-sm text-slate-600">
          Enter the 6-digit code sent to {email}.
        </p>
        {message && (
          <div className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-red-700">
            {message}
          </div>
        )}
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="OTP code"
          className="w-full rounded-2xl border border-slate-300 p-3"
        />
        <button
          onClick={handleVerify}
          className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 text-white"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
