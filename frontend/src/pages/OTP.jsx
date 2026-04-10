import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("otpEmail");
    if (!storedEmail) {
      navigate("/login");
      return;
    }
    setEmail(storedEmail);
  }, [navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await api.post("/verify-otp", { email, otp });
      localStorage.setItem("token", response.data.token);
      sessionStorage.removeItem("otpEmail");
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setMessage("");
    setLoading(true);

    try {
      await api.post("/resend-otp", { email });
      setMessage("OTP resent to your email.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-semibold">Verify OTP</h1>
        <p className="mb-4 text-sm text-slate-600">
          Enter the 6-digit verification code sent to <strong>{email}</strong>.
        </p>
        {message && (
          <div className="mb-4 rounded-xl bg-slate-100 px-4 py-3 text-slate-700">
            {message}
          </div>
        )}
        <form onSubmit={handleVerify} className="space-y-4">
          <label className="block">
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP code"
              className="mt-1 w-full rounded-2xl border border-slate-300 p-3"
              required
              maxLength={6}
              minLength={6}
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <button
          onClick={handleResend}
          disabled={loading}
          className="mt-4 w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}
