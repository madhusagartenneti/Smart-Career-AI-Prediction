import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    number: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile(localStorage.getItem("token"));
        setProfile(data);
        setFormData({
          username: data.username || "",
          email: data.email || "",
          number: data.number || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleUpdate() {
    try {
      setSaving(true);
      const updated = await updateProfile(
        localStorage.getItem("token"),
        formData
      );
      setProfile(updated);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  // ================= LOADING =================
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-800 text-lg">Loading profile...</p>
        </div>
      </div>
    );

  // ================= ERROR =================
  if (!profile)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">
          Failed to load profile
        </p>
      </div>
    );

  // ================= PROFILE =================
  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-white">
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-gray-100 border shadow-lg">
        
        {/* Edit Icon */}
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="absolute top-4 right-4 p-2 rounded-full
                       bg-indigo-600 text-white
                       hover:bg-indigo-700 transition shadow"
            title="Edit Profile"
          >
            ✏️
          </button>
        )}

        {/* Avatar */}
        <div className="w-24 h-24 mx-auto mb-5 rounded-full
                        bg-gradient-to-br from-indigo-500 to-purple-600
                        flex items-center justify-center
                        text-3xl font-extrabold text-white">
          {profile.username?.charAt(0).toUpperCase()}
        </div>

        {!editing ? (
          <>
            <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-2">
              {profile.username}
            </h2>
            <p className="text-gray-700 text-center">{profile.email}</p>
            <p className="text-gray-600 text-center">{profile.number}</p>

            <div className="my-6 h-px bg-gray-300"></div>

            <p className="text-green-600 text-sm text-center">
              ✅ Profile Active
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-indigo-800 mb-4 text-center">
              Update Profile
            </h2>

            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full mb-3 px-4 py-2 rounded-xl border
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full mb-3 px-4 py-2 rounded-xl border
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full mb-5 px-4 py-2 rounded-xl border
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex gap-3">
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="flex-1 py-2 rounded-xl bg-green-600 text-white
                           font-semibold hover:bg-green-700 transition"
              >
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => setEditing(false)}
                className="flex-1 py-2 rounded-xl bg-gray-400 text-white
                           font-semibold hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
