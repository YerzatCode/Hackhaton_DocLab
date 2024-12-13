import axios from "axios"
import React, { useEffect, useState } from "react"
import DateFormatter from "./DateFormatter"

const RatingList = ({ thesisID }) => {
  const [ratings, setRatings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Получение всех рейтингов
  const fetchRatings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/ratings/theses/" + thesisID,
        {
          withCredentials: true,
        }
      )
      setRatings(response.data)
      setLoading(false)
    } catch (err) {
      setError("Не удалось загрузить рейтинги.")
      setLoading(false)
    }
  }

  // Удаление рейтинга
  const deleteRating = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/ratings/${id}`)
      setRatings(ratings.filter((rating) => rating.id !== id))
    } catch (err) {
      alert("Ошибка при удалении рейтинга.")
    }
  }

  useEffect(() => {
    fetchRatings()
  }, [])

  if (loading) return <p>Загрузка...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2 className="text-2xl font-bold my-4">Список рейтингов</h2>
      <ul className="space-y-4">
        {ratings.map((rating) => (
          <li
            key={rating.ID}
            className="p-4 bg-white shadow rounded flex justify-between items-center">
            <div>
              <div className="flex items-start ">
                <svg
                  className="w-4 h-4 text-yellow-300 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                  {rating.score.toFixed(2)}
                </p>
                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                <span className="text-sm font-medium text-gray-900 dark:text-white flex flex-col align-top">
                  <p>Комментари: {rating.comment},</p>
                  <p>Пользователь: {rating.user_id}</p>
                  <p className="flex">
                    Дата:
                    <span>
                      <DateFormatter dateString={rating.CreatedAt} />
                    </span>
                  </p>
                </span>
              </div>
            </div>
            <button
              onClick={() => deleteRating(rating.ID)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RatingList
