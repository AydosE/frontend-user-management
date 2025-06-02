import { updateUserStatus, deleteUser, fetchUsers } from "../utils/api";

const Toolbar = ({ selectedUsers, setUsers, setSelectedUsers }) => {
  const handleBlock = async () => {
    if (!selectedUsers.length) return;

    try {
      const responses = await Promise.all(
        selectedUsers.map((id) => updateUserStatus(id, "blocked"))
      );
      const allSuccessful = responses.every(
        (res) => res.message === "Статус обновлён"
      );

      if (allSuccessful) {
        fetchUsers().then(setUsers);
        setSelectedUsers([]);
      }
    } catch (error) {
      console.error("Ошибка блокировки пользователей:", error);
    }
  };

  const handleUnblock = async () => {
    if (!selectedUsers.length) return;

    try {
      const responses = await Promise.all(
        selectedUsers.map((id) => updateUserStatus(id, "active"))
      );
      const allSuccessful = responses.every(
        (res) => res.message === "Статус обновлён"
      );

      if (allSuccessful) {
        fetchUsers().then(setUsers);
        setSelectedUsers([]);
      }
    } catch (error) {
      console.error("Ошибка разблокировки пользователей:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedUsers.length) return;

    try {
      const responses = await Promise.all(
        selectedUsers.map((id) => deleteUser(id))
      );
      const allSuccessful = responses.every(
        (res) => res.message === "Пользователь удалён"
      );

      if (allSuccessful) {
        fetchUsers().then(setUsers);
        setSelectedUsers([]);
      }
    } catch (error) {
      console.error("Ошибка удаления пользователей:", error);
    }
  };

  return (
    <div className="flex gap-3 p-4">
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
  );
};

export default Toolbar;
