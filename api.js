const API = "https://smart-career-predict-backend.onrender.com";

// LOGIN
export async function loginUser(data) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

// REGISTER
export async function registerUser(data) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

// PROFILE GET
export async function getProfile(token) {
  const res = await fetch(`${API}/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
}

// PROFILE UPDATE
export async function updateProfile(data, token) {
  const res = await fetch(`${API}/profile/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}


// CAREER PREDICTION
export async function predictCareer(data, token) {
  const res = await fetch(`${API}/predict/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}
