import axios from "axios"
import React, { useEffect, useState } from "react"

function AddRoleToUser() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const roles = [
    {
      id: 1,
      name: "student",
    },
    {
      id: 2,
      name: "teacher",
    },
    {
      id: 3,
      name: "admin",
    },
  ]
  useEffect(() => {
    // Загрузка пользователей
    axios
      .get("http://localhost:8080/users/")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error))

    // Загрузка ролей
  }, [])

  const handleAddRole = () => {
    if (!selectedUser || !selectedRole) {
      alert("Please select both user and role.")
      return
    }

    axios
      .post(
        "http://localhost:8080/add-role-to-user",
        {
          user_id: selectedUser,
          role_name: selectedRole,
        },
        { withCredentials: true }
      )
      .then(() => alert("Role added successfully!"))
      .catch((error) => console.error(error))
  }

  return (
    <div className="bg-white  border-4 rounded-lg shadow p-6 m-10">
      <h3 className="text-xl font-semibold mb-4">Add Role to User</h3>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="user-select"
            className="text-sm font-medium text-gray-900 block mb-2">
            Select User
          </label>
          <select
            id="user-select"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.ID} value={user.ID}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="role-select"
            className="text-sm font-medium text-gray-900 block mb-2">
            Select Role
          </label>
          <select
            id="role-select"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}>
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="mt-4 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5"
        onClick={handleAddRole}>
        Add Role
      </button>
    </div>
  )
}

export default AddRoleToUser
