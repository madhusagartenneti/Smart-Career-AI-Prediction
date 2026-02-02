import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../src/assets/logo.png"; // correct path to your logo

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Predict", path: "/predict" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav
      className="fixed w-full top-0 z-50 border-b border-gray-200 backdrop-blur-md"
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "rgba(255,255,255,0.95)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ================= LOGO ================= */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer select-none flex items-center space-x-2"
          >
            <img
              src={logo}
              alt="Smart Career AI Logo"
              style={{ height: "50px" }}
            />
            <h1 className="text-xl font-extrabold text-indigo-600 transition-all duration-300 hidden sm:block">
              Smart Career AI
            </h1>
          </div>

          {/* ================= DESKTOP LINKS ================= */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-semibold transition
                    ${active
                      ? "text-indigo-600"
                      : "text-gray-700 hover:text-indigo-600"
                    }`}
                >
                  {link.name}

                  {/* underline */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-indigo-600 transition-all duration-300
                      ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
              );
            })}

            <button
              onClick={logout}
              className="ml-2 px-4 py-1.5 rounded-xl font-semibold
                         bg-gradient-to-r from-indigo-500 to-purple-500
                         text-white shadow-md hover:shadow-indigo-300/40
                         hover:scale-105 transition-all"
            >
              Logout
            </button>
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-gray-200 transition"
            >
              <svg
                className="h-6 w-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden
          ${menuOpen ? "max-h-80 py-4" : "max-h-0"}`}
        style={{
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <div className="flex flex-col px-4 space-y-3">
          {links.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-xl font-semibold transition
                  ${active
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-800 hover:bg-gray-100"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          <button
            onClick={logout}
            className="mt-2 px-4 py-2 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-indigo-500 to-purple-500
                       hover:scale-105 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
