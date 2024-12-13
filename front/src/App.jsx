import React, { useEffect, useState } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar" // Навигационная панель (если нужна)
import CreateUser from "./pages/CreateUser"
import Dashboard from "./pages/Dashboard"
import DiplomaDetails from "./pages/DiplomaDetails"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Thesis from "./pages/Thesis"
import Upload from "./pages/Upload"
import UserList from "./pages/UserList"
import UserPage from "./pages/UserPage"
import useThesisStore from "./store/theses_story"
import useUserStore from "./store/user_story"
import useUsersStore from "./store/users_story"
import ProtectedRoute from "./utils/ProtectedRouter"

const App = () => {
  const { fetchUserData, user, isAuth } = useUserStore()
  const { fetchThesesData } = useThesisStore()
  const { fetchUsers } = useUsersStore()
  // const route = useNavigate()

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
      {/* <RevealEffect /> */}
      <Router>
        <div className="flex flex-col w-full h-full justify-between">
          <Navbar /> {/* Общая навигационная панель */}
          <div className="h-full w-full">
            <Routes>
              <Route
                path="/thesis"
                element={
                  <ProtectedRoute>
                    <Thesis />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/thesis/:id"
                element={
                  <ProtectedRoute>
                    <DiplomaDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <UserList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users/:id"
                element={
                  <ProtectedRoute>
                    <UserPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-user"
                element={
                  <ProtectedRoute>
                    <CreateUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectedRoute>
                    <Register />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Home user={isAuth} />} />

              {!isAuth && (
                <>
                  <Route path="/login" element={<Login />} />
                </>
              )}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
