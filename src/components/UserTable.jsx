import React from "react";
import { formatDate, lastLogin } from "../utils/date";

const UserTable = ({ users, selectedUsers, setSelectedUsers }) => {
  const handleCheckboxChange = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  return (
    <table className="w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
      <thead className="bg-gray-100 rounded-t-lg">
        <tr>
          <th className="p-2 border border-gray-300">
            <input
              type="checkbox"
              onChange={(e) =>
                setSelectedUsers(
                  e.target.checked
                    ? users.map((user) => user.id.toString())
                    : []
                )
              }
              checked={
                selectedUsers.length === users.length && users.length > 0
              }
            />
          </th>
          <th className="p-2 border border-gray-300">Name</th>
          <th className="p-2 border border-gray-300">Email</th>
          <th className="p-2 border border-gray-300">Last Login</th>
          <th className="p-2 border border-gray-300">Status</th>
        </tr>
      </thead>

      <tbody className="rounded-b-lg">
        {users.map((user) => (
          <tr
            key={user.id}
            className="text-center even:bg-gray-100 odd:bg-white"
          >
            <td className="p-2 border border-gray-300">
              <input
                id={user.id}
                type="checkbox"
                className="user-checkbox"
                checked={selectedUsers.includes(user.id.toString())}
                onChange={(e) => handleCheckboxChange(e.target.id)}
              />
            </td>
            <td className="p-2 border border-gray-300">{user.name}</td>
            <td className="p-2 border border-gray-300">{user.email}</td>
            <td
              className="p-2 border border-gray-300"
              title={formatDate(user.last_login, user.timezone)}
            >
              {lastLogin(user.last_login, user.timezone)}
            </td>
            <td
              className={`p-2 border border-gray-300 font-bold ${
                user.status === "blocked" ? "text-red-600" : "text-green-600"
              }`}
            >
              {user.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
