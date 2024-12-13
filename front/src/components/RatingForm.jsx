import axios from "axios"
import React, { useState } from "react"
import useUserStore from "../store/user_story"

const RatingForm = ({ fetchRatings, thesisID }) => {
  const [score, setScore] = useState("")
  const [comment, setComment] = useState("")
  const { user } = useUserStore()
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newRating = {
      score: parseInt(score),
      comment: comment,
      thesis_id: thesisID,
      user_id: user.ID,
    }

    try {
      await axios.post("http://localhost:8080/ratings/", newRating, {
        withCredentials: true,
      })
      setMessage("Рейтинг успешно добавлен!")
      fetchRatings() // Обновление списка рейтингов
    } catch (err) {
      setMessage("Ошибка при добавлении рейтинга.")
    }
  }

  return (
    <div>
      <h2 className="font-bold text-xl mb-2">Добавить Рейтинг</h2>
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4">
        {/* Форма для комментариев */}
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="comment" className="sr-only">
            Ваш комментарий
          </label>
          <textarea
            id="comment"
            rows="6"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Напишите комментарий..."
            required></textarea>
        </div>
        <div className="flex gap-4">
          <label>Оценка:</label>
          <input
            className="w-[20%]  rounded  border-gray-400 focus:outline border-b-2"
            type="number"
            value={score}
            max={5}
            onChange={(e) => setScore(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-[20%] inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
          Отправить
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default RatingForm
