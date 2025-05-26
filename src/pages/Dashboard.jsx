import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";
import Toolbar from "../components/Toolbar";
import { fetchUsers } from "../utils/api";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
      <Toolbar users={users} setUsers={setUsers} />
      <UserTable users={users} />
    </div>
  );
};

export default Dashboard;
