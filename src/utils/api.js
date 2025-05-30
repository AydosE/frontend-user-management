export const fetchUsers = async () => {
  const response = await fetch("http://localhost:5000/users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch("http://localhost:5000/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data.token;
};

export const updateUserStatus = async (id, status) => {
  const response = await fetch(`http://localhost:5000/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ status }),
  });
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`http://localhost:5000/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const registerUser = async (name, email, password) => {
  const response = await fetch("http://localhost:5000/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data.token;
};
