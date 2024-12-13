import axios from "axios"
import { create } from "zustand"

// API базовый URL
const api = axios.create({
  baseURL: "http://localhost:8080", // Замените на ваш API URL
  withCredentials: true,
})

// Создание zustand хранилища
const useUserStore = create((set) => ({
  user: {
    ID: null,
    firstName: "",
    lastName: "",
    bio: "",
    email: "",
    password: "",
    roleID: null,
    phone: "",
    birth_date: "",
    gender: false,
    website: "",
    locate: "",
    roles: [],
  },
  isAuth: false,
  setUser: (user) => set({ user }),
  setRoles: (roles) => set((state) => ({ user: { ...state.user, roles } })),
  addRole: (role) =>
    set((state) => ({
      user: { ...state.user, roles: [...state.user.roles, role] },
    })),
  removeRole: (roleID) =>
    set((state) => ({
      user: {
        ...state.user,
        roles: state.user.roles.filter((role) => role.ID !== roleID),
      },
    })),
  updateUser: (updatedFields) =>
    set((state) => ({
      user: { ...state.user, ...updatedFields },
    })),
  fetchUserData: async () => {
    try {
      const response = await api.get(`/me`)
      const userData = response.data
      set({ user: userData })
      set({ roles: userData.roles })
      set({ isAuth: true })
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error)
    }
  },
  updateUserData: async (updatedFields) => {
    try {
      const response = await api.put(
        `/users/${updatedFields.ID}`,
        updatedFields
      )
      set({ user: response.data })
    } catch (error) {
      console.error("Ошибка при обновлении данных пользователя:", error)
    }
  },
}))

export default useUserStore
