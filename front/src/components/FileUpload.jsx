import axios from "axios"
import React, { useState } from "react"

const FileUpload = ({ thesisId }) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  // Обработчик изменения файлов
  const handleFileChange = (event) => {
    const files = event.target.files
    setSelectedFiles(files)
  }

  // Функция загрузки файлов
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setMessage("Пожалуйста, выберите файлы для загрузки")
      return
    }

    const formData = new FormData()
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i])
    }

    try {
      setUploading(true)
      setMessage("")

      // Замените URL на ваш серверный эндпоинт
      const response = await axios.post(
        `http://localhost:8080/theses/${thesisId}/attach_files`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      setUploading(false)
      setMessage("Файлы успешно загружены!")
    } catch (error) {
      setUploading(false)
      setMessage("Ошибка при загрузке файлов")
      console.error(error)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Загрузить файлы</h2>
      <label
        htmlFor="file_input"
        className="block mb-2 text-sm font-medium text-gray-700">
        Выберите файлы
      </label>
      <input
        id="file_input"
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`mt-4 w-full px-4 py-2 text-white font-semibold rounded-lg ${
          uploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-secondary hover:text-primary"
        }`}>
        {uploading ? "Загружается..." : "Загрузить"}
      </button>
      {message && (
        <p
          className={`mt-4 text-sm font-medium ${
            message.includes("Ошибка") ? "text-red-600" : "text-green-600"
          }`}>
          {message}
        </p>
      )}
      {selectedFiles.length > 0 && (
        <ul className="mt-4 list-disc list-inside text-sm text-gray-700">
          {Array.from(selectedFiles).map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FileUpload
