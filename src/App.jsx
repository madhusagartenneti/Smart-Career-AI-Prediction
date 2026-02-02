import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import Dashboard from "./../pages/Dashboard";
import Predict from "./../pages/Predict";
import Profile from "./../pages/Profile";
import Navbar from "./../components/Navbar";
import ProtectedRoute from "./../routes/ProtectedRoute";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={token ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={token ? <Navigate to="/" /> : <Register />}
      />

      {/* Protected Routes with Navbar */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1  mt-12 md:mt-10">
                <Dashboard />
              </main>
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/predict"
        element={
          <ProtectedRoute>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1  mt-12 md:mt-10">
                <Predict />
              </main>
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1  mt-4 md:mt-6">
                <Profile />
              </main>
            </div>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
