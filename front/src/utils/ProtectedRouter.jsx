import React from "react"
import { Navigate } from "react-router-dom"
import useUserStore from "../store/user_story"

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useUserStore((state) => state.isAuth)

  if (!isAuthenticated) {
    // Перенаправление на страницу входа
    return <Navigate to="/" />
  }

  // Если авторизован, отображаем компонент
  return children
}

export default ProtectedRoute
