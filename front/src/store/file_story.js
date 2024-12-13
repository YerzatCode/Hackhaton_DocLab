import { create } from "zustand"

const useFilePathStore = create((set) => ({
  filePathImg: "", // Изначально пустой путь к изображению
  setFilePathImg: (path) => set({ filePathImg: path }), // Функция для установки пути
  clearFilePathImg: () => set({ filePathImg: "" }), // Функция для очистки пути
}))

export default useFilePathStore
