import { Container } from "@mui/material"
import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"
import Logo from "../assets/logo cut.jpg"
import useUserStore from "../store/user_story"
const Navbar = () => {
  const { user } = useUserStore((state) => state)
  console.log(user)
  return (
    <nav className="bg-primary text-white flex border-b-2 border-secondary">
      <Container className="flex items-center justify-between ">
        <Link to={"/"}>
          <img src={Logo} alt="Logo" className="w-[80px] h-[80px]" />
        </Link>
        <div className="flex space-x-4 items-center gap-2">
          {user?.ID && (
            <>
              <Link to="/" className="hover:underline">
                Главная
              </Link>
              <Link to="http://localhost:5174/" className="hover:underline">
                Чат бот
              </Link>
              <Link to="http://localhost:5175/" className="hover:underline">
                РУП
              </Link>
              <Link to="/thesis" className="hover:underline">
                Дипломная
              </Link>
              <Link to="/users" className="hover:underline">
                Пользователи
              </Link>
              <Link to="/upload" className="hover:underline">
                Загрузить
              </Link>
              <Link to="/dashboard" className="hover:underline">
                Кабинет
              </Link>
              <button
                onClick={() => {
                  axios.post(
                    "http://localhost:8080/logout",
                    {},
                    { withCredentials: true }
                  )
                }}
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Logout
              </button>
            </>
          )}
          {!user?.ID && (
            <>
              <Link to="/login" className="hover:underline">
                Войти
              </Link>
            </>
          )}
        </div>
      </Container>
    </nav>
  )
}

export default Navbar
