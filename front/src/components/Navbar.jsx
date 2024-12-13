import { Container } from "@mui/material"
import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"
import Logo from "../assets/logo cut.svg"
import useUserStore from "../store/user_story"
import RolesCheck from "../utils/RolesCheck"
const Navbar = () => {
  const { user, isAuth } = useUserStore((state) => state)
  console.log(user)
  return (
    <nav className="bg-primary text-white flex border-b-2 border-secondary">
      <Container className="flex items-center justify-between ">
        <Link to={"/"}>
          <img src={Logo} alt="Logo" className="w-[80px] h-[80px]" />
        </Link>
        <div className="flex space-x-4 items-center`">
          {isAuth && (
            <>
              <Link to="/" className="hover:underline">
                Главная
              </Link>

              <Link to="/thesis" className="hover:underline">
                Дипломная
              </Link>

              <RolesCheck roles={user?.roles} check_role="admin">
                <Link to="/users" className="hover:underline">
                  Пользователи
                </Link>
              </RolesCheck>

              <Link to="/upload" className="hover:underline">
                Загрузить
              </Link>
              <Link to="/dashboard" className="hover:underline">
                Кабинет
              </Link>
              <button
                onClick={() => {
                  axios
                    .post(
                      "http://localhost:8080/logout",
                      {},
                      { withCredentials: true }
                    )
                    .then((res) => {
                      if (res.status === 200) {
                        window.location.href = "http://localhost:5173/login"
                      }
                    })
                }}
                type="button"
                class="text-primary bg-secondary  hover:bg-primary hover:border-secondary hover:border hover:text-secondary duration-300 focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
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
