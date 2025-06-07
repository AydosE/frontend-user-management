import { useNavigate } from "react-router-dom";
import {
  updateUserStatus,
  deleteUser,
  fetchUsers,
  logoutUser,
} from "../utils/api";
import { toast } from "react-toastify";

const Toolbar = ({ selectedUsers, setUsers, setSelectedUsers }) => {
  const navigate = useNavigate();

  const handleBlock = async () => {
    if (!selectedUsers.length) return;

    try {
      await Promise.all(
        selectedUsers.map((id) => updateUserStatus(id, "blocked"))
      );

      fetchUsers().then((updatedUsers) => {
        setUsers(updatedUsers);
        setSelectedUsers([]);

        const allBlocked = updatedUsers.every(
          (user) => user.status === "blocked"
        );
        if (allBlocked) navigate("/");

        toast.success(`${selectedUsers.length} пользователей заблокированы!`);
      });
    } catch (error) {
      toast.error("Ошибка блокировки пользователей!");
    }
  };

  const handleUnblock = async () => {
    if (!selectedUsers.length) return;

    try {
      await Promise.all(
        selectedUsers.map((id) => updateUserStatus(id, "active"))
      );

      fetchUsers().then((updatedUsers) => {
        setUsers(updatedUsers);
        setSelectedUsers([]);

        toast.success(`${selectedUsers.length} пользователей разблокированы!`);
      });
    } catch (error) {
      toast.error("Ошибка разблокировки пользователей!");
    }
  };

  const handleDelete = async () => {
    if (!selectedUsers.length) return;

    try {
      await Promise.all(selectedUsers.map((id) => deleteUser(id)));

      fetchUsers().then((updatedUsers) => {
        setUsers(updatedUsers);
        setSelectedUsers([]);

        toast.success(`${selectedUsers.length} пользователей удалены!`);
      });
    } catch (error) {
      toast.error("Ошибка удаления пользователей!");
    }
  };

  const handleLogout = () => {
    logoutUser(navigate);
  };

  return (
    <div className="flex gap-3 p-4 w-full justify-between">
      <div className="flex gap-3">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleBlock}
        >
          Block
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleUnblock}
        >
          Unblock
        </button>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Toolbar;
