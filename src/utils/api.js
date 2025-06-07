const backURL = "https://backend-user-management-b6b7.onrender.com";
import { toast } from "react-toastify";
export const fetchUsers = async () => {
  const response = await fetch(`${backURL}/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
};

export const fetchStatus = async () => {
  const response = await fetch(`${backURL}/auth/status`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.json();
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${backURL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    if (data.status === "blocked") {
      toast.error("Аккаунт заблокирован!");
      throw new Error("Аккаунт заблокирован");
    }

    toast.success("Вход выполнен успешно!");
    return data.token;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const updateUserStatus = async (id, status) => {
  try {
    const response = await fetch(`${backURL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    toast.error(`Ошибка обновления: ${error.message}`);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${backURL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${backURL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    toast.success("Регистрация успешна!");
    return data.token;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const logoutUser = (navigate) => {
  localStorage.removeItem("token");
  toast.info("Вы вышли из аккаунта!");
  navigate("/");
};
