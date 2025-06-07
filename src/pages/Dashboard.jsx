import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";
import { fetchStatus, fetchUsers } from "../utils/api";
import Toolbar from "../components/ToolBar";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const asyncFetcher = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Ошибка при загрузке пользователей:", error);
      }
    };
    asyncFetcher();
  }, []);

  return (
    <>
      {users.length === 0 ? (
        <h1 className="text-blue-500 text-center text-lg font-bold m-20">
          Loading...
        </h1>
      ) : (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">User Management</h1>
          <Toolbar
            users={users}
            setUsers={setUsers}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
          <UserTable
            users={users}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
