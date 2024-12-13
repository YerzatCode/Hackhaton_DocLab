import { Container } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FileUpload from "../components/FileUpload"
import RatingForm from "../components/RatingForm"
import RatingList from "../components/RatingList"

function DiplomaDetails({ user }) {
  const [thesisData, setThesisData] = useState(null) // Состояние для данных
  const [loading, setLoading] = useState(true) // Состояние загрузки
  const [error, setError] = useState(null) // Состояние ошибок

  const params = useParams()
  useEffect(() => {
    // Запрос к API
    axios
      .get("http://localhost:8080/theses/" + params.id, {
        withCredentials: true,
      })
      .then((response) => {
        setThesisData(response.data) // Установка данных
        setLoading(false) // Установка завершения загрузки
        console.log(response.data)
      })
      .catch((err) => {
        console.error("Error fetching data:", err)
        setError("Ошибка при загрузке данных.") // Установка ошибки
        setLoading(false)
      })
  }, []) // Выполняется только при первом рендере

  if (loading) return <div className="text-center">Загрузка...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <Container>
      <main className="container mx-auto mt-8">
        <div className="flex flex-wrap justify-between">
          {/* Основной контент */}
          <div className="w-full md:w-8/12 px-4 mb-8">
            <img
              src={
                "http://localhost:8080/static/" + thesisData.img_path ||
                "https://via.placeholder.com/1200x600"
              }
              alt="Research Illustration"
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-4xl font-bold mt-4 mb-2">
              {thesisData?.title}
            </h2>

            <section id={thesisData?.ID} className="mb-4" key={thesisData?.ID}>
              <p className="text-gray-700">{thesisData?.description}</p>
            </section>
          </div>

          {/* Боковая панель */}
          <div className="w-full md:w-4/12 px-4 mb-8">
            <div className="bg-gray-100 px-4 py-6 rounded">
              <h3 className="text-lg font-bold mb-2">Файлы</h3>
              <ul className="list-disc list-inside gap-2 flex flex-col">
                {thesisData?.files.map((section) => (
                  <li key={section.ID}>
                    <a
                      href={"http://localhost:8080/static/" + section.name}
                      className="text-gray-700 hover:text-gray-900">
                      {section.name}
                    </a>
                  </li>
                ))}
                {user.id === thesisData?.user_id_id && (
                  <>
                    <FileUpload thesisID={thesisData?.ID} />
                  </>
                )}{" "}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <RatingForm thesisID={thesisData?.ID} />
      <RatingList thesisID={thesisData?.ID} />
    </Container>
  )
}

export default DiplomaDetails
