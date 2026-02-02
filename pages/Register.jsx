import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api";
import AnimatedLines from "../components/AnimatedLines";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = {
      username: e.target.username.value.trim(),
      email: e.target.email.value.trim(),
      number: e.target.number.value.trim(),
      password: e.target.password.value,
      confirm_password: e.target.confirm_password.value,
    };

    if (data.password !== data.confirm_password) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await registerUser(data);
      if (res.token || res.message?.toLowerCase().includes("success")) {
        navigate("/login");
      } else {
        setError(res.message || "Registration failed");
      }
    } catch {
      setError("Server not responding");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">

      {/* 🔥 Animated Background */}
      <AnimatedLines />

      {/* 🧾 Register Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-8 text-gray-800">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-900 tracking-wide">
          Create Account
        </h1>
        <p className="text-center text-sm text-gray-600 mt-2 mb-6">
          Start your smart career journey ✨
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-2 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            required
            placeholder="Username"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 outline-none focus:ring-4 focus:ring-indigo-300"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 outline-none focus:ring-4 focus:ring-indigo-300"
          />

          <input
            type="tel"
            name="number"
            required
            placeholder="Mobile Number"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 outline-none focus:ring-4 focus:ring-indigo-300"
          />

          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 outline-none focus:ring-4 focus:ring-indigo-300"
          />

          <input
            type="password"
            name="confirm_password"
            required
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 outline-none focus:ring-4 focus:ring-indigo-300"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-md hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
