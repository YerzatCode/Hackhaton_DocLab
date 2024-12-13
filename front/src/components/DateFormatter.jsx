import React from "react"

function DateFormatter({ dateString }) {
  // Преобразуем строку в объект Date
  const date = new Date(dateString)

  // Форматируем дату в нужный формат
  const formattedDate = date.toISOString().slice(0, 19).replace("T", " ")

  return <div>{formattedDate}</div>
}

export default DateFormatter
