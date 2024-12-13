// store.js
import axios from "axios"
import { create } from "zustand"

const useUsersStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get("http://localhost:8080/users/") // Replace with your API endpoint
      set({ users: response.data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
}))

export default useUsersStore
