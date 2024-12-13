import React, { useEffect, useState } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar" // Навигационная панель (если нужна)
import RevealEffect from "./components/StartAnim"
import CreateUser from "./pages/CreateUser"
import Dashboard from "./pages/Dashboard"
import DiplomaDetails from "./pages/DiplomaDetails"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"
import Thesis from "./pages/Thesis"
import Upload from "./pages/Upload"
import UserList from "./pages/UserList"
import UserPage from "./pages/UserPage"
import useThesisStore from "./store/theses_story"
import useUserStore from "./store/user_story"
import useUsersStore from "./store/users_story"

const App = () => {
  const { fetchUserData } = useUserStore()
  const { fetchThesesData } = useThesisStore()
  const { fetchUsers } = useUsersStore()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadThesesData = async () => {
      await fetchUserData()
      await fetchThesesData() // Загружаем все дипломные работы
      await fetchUsers() // Fetch users when the component mounts

      setIsLoading(false)
    }

    loadThesesData()
  }, [fetchThesesData])
  return (
    <>
      <RevealEffect />
      <Router>
        <div className="flex flex-col w-full h-full justify-between">
          <Navbar /> {/* Общая навигационная панель */}
          <div className="h-full w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/thesis" element={<Thesis />} />
              <Route path="/thesis/:id" element={<DiplomaDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="*" element={<NotFound />} /> {/* 404 Страница */}
              <Route path="/users/:id" element={<UserPage />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/create" element={<CreateUser />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
