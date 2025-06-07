import React, { useEffect, useState } from "react";
import { fetchStatus, loginUser, registerUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let token;
      if (isLogin) {
        token = await loginUser(email, password);
      } else {
        token = await registerUser(name, email, password);
      }
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // useEffect(() => {
  //   const fetcher = async () => {
  //     try {
  //       const status = await fetchStatus();
  //       if (status.isAuthenticated) {
  //         navigate("/dashboard");
  //       }
  //     } catch (error) {
  //       console.error("Ошибка при проверке статуса аутентификации:", error);
  //     }
  //   };
  //   fetcher();
  // }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Вход" : "Регистрация"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
          <button
            className="text-blue-500"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Регистрация" : "Вход"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
