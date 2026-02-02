import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api";
import AnimatedLines from "../components/AnimatedLines";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = {
      username: e.target.username.value.trim(),
      password: e.target.password.value,
    };

    try {
      const res = await loginUser(data);
      if (res.token) {
        localStorage.setItem("token", res.token);
        navigate("/");
      } else {
        setError(res.message || "Login failed");
      }
    } catch {
      setError("Server not responding");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🌈 Animated Background */}
      <AnimatedLines />

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl
                      border border-white/30 rounded-3xl shadow-2xl p-8 text-gray-800">

        <h1 className="text-4xl font-bold text-center text-gray-900">
          Welcome Back 👋
        </h1>
        <p className="text-center text-sm text-gray-600 mt-2 mb-6">
          Login to Smart Career Prediction
        </p>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700
                          p-2 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="username"
            required
            placeholder="Username"
            className="w-full px-4 py-3 rounded-xl bg-gray-50
                       outline-none focus:ring-4 focus:ring-indigo-300"
          />

          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-gray-50
                       outline-none focus:ring-4 focus:ring-indigo-300"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl
                       bg-gradient-to-r from-indigo-500 to-purple-600
                       font-semibold shadow-md text-white
                       disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-semibold"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
