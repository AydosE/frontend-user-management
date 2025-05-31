import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Auth from "./pages/Auth";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null); // Храним данные о пользователе

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("https://backend-user-management-b6b7.onrender.com/auth/status", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => setUser(data.user)); // Обновляем состояние
    }
  }, []);

  // return (
  //   <div>
  //     {user ? <Dashboard /> : <Login />} {/* Переключаем между страницами */}
  //   </div>
  // );

  return (
    <Router>
      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
      </Routes> */}
      <Routes>
        {user ? (
          <Route path="/" element={<Auth />} />
        ) : (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
