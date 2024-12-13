import { Container } from "@mui/material"
import React from "react"
import Banner from "../components/Banner"
import ThesisComponent from "../components/ThesisComponent"
import UserList from "./UserList"

function Home({ user }) {
  return (
    <div>
      <Container className="flex flex-col gap-10 mt-5">
        <Banner />
        <h1 className="text-center text-4xl font-bold text-white drop-shadow-2xl shadow-blue-600/50">
          With knowledge comes strength and opportunity
        </h1>
        <ThesisComponent />
        {user && <UserList />}
      </Container>
    </div>
  )
}

export default Home
