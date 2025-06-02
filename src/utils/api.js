const backURL = "https://backend-user-management-b6b7.onrender.com";

export const fetchUsers = async () => {
  const response = await fetch(`${backURL}/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const fetchStatus = async () => {
  console.log(localStorage.getItem("token"));
  console.log(!localStorage.getItem("token"));

  const response = await fetch(`${backURL}/auth/status`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log("Status fetch response:", response);

  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${backURL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data.token;
};

export const updateUserStatus = async (id, status) => {
  const response = await fetch(`${backURL}/users/${id}`, {
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
  const response = await fetch(`${backURL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const registerUser = async (name, email, password) => {
  const response = await fetch(`${backURL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data.token;
};
