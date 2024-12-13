import axios from "axios"
import React, { useState } from "react"
import useFilePathStore from "../store/file_story"
import useUserStore from "../store/user_story"

const CreateThesis = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const userId = useUserStore((state) => state.user.ID) // Получаем userId из хранилища
  const filePath = useFilePathStore((state) => state.filePathImg)

  // Обработчик для изменения данных в полях формы
  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === "title") {
      setTitle(value)
    } else if (name === "description") {
      setDescription(value)
      setCharCount(value.length)
    }
  }

  // Обработчик для отправки данных на сервер
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    // Проверка на заполненность всех полей
    if (!title || !description || !userId) {
      setMessage("Пожалуйста, заполните все поля.")
      setIsLoading(false)
      return
    }

    // Данные дипломной работы
    const thesisData = {
      title,
      description,
      user_id: userId, // Используем userId из хранилища
      file_path: filePath,
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/theses/",
        thesisData,
        { withCredentials: true }
      )

      setMessage("Дипломная работа успешно создана!")
      setIsLoading(false)

      // Очистить поля формы после успешного создания
      setTitle("")
      setDescription("")
      setCharCount(0)
    } catch (error) {
      setMessage("Ошибка при создании дипломной работы")
      setIsLoading(false)
      console.error(error)
    }
  }

  return (
    <div className="container h-auto">
      <div className="editor mx-auto w-10/12 flex flex-col gap-2 text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl h-full">
        <h1 className="font-bold text-2xl">Title</h1>
        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Title"
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
        />
        <h1 className="font-bold text-2xl">Description</h1>

        <textarea
          className="description bg-gray-100 p-3 h-60 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Describe everything about this post here"
          name="description"
          value={description}
          onChange={handleInputChange}
        />

        <div className="icons flex text-gray-500 m-2">
          <div className="count ml-auto text-gray-400 text-xs font-semibold">
            {charCount}/300
          </div>
        </div>

        <div className="buttons flex mt-4">
          <button className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            Cancel
          </button>
          <button
            className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}>
            {isLoading ? "Creating..." : "Post"}
          </button>
        </div>
      </div>

      {message && <p className="mt-4 text-center text-gray-800">{message}</p>}
    </div>
  )
}

export default CreateThesis
