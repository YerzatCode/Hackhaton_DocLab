import axios from "axios"
import { create } from "zustand"

// Состояние для работы с дипломными работами
const useThesisStore = create((set) => ({
  theses: [], // Массив для хранения дипломных работ

  // Функция для обновления всех дипломных работ
  setThesesData: (newThesesData) => set({ theses: newThesesData }),

  // Функция для добавления новой дипломной работы в массив
  addThesis: (newThesis) =>
    set((state) => ({
      theses: [...state.theses, newThesis],
    })),

  // Функция для загрузки всех дипломных работ с сервера
  fetchThesesData: async () => {
    try {
      const response = await axios.get("http://localhost:8080/theses/", {
        withCredentials: true,
      })
      console.log(response.data)
      set({ theses: response.data.theses }) // Обновляем состояние массивом дипломных работ
    } catch (error) {
      console.error("Error fetching theses data:", error)
    }
  },

  // Функция для отправки новой дипломной работы на сервер
  uploadThesisData: async (newThesisData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/theses",
        newThesisData
      )
      set((state) => ({
        theses: [...state.theses, response.data], // Добавляем новую дипломную работу в массив
      }))
    } catch (error) {
      console.error("Error uploading thesis data:", error)
    }
  },
}))

export default useThesisStore
