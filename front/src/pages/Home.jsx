import { Container } from "@mui/material"
import React from "react"
import AchievementsSection from "../components/AchievementsSection"
import Background from "../components/Background"
import Banner from "../components/Banner"
import ThesisComponent from "../components/ThesisComponent"
import UserList from "./UserList"

function Home() {
  return (
    <div>
      <Container className="flex flex-col gap-10 mt-5">
        {/* <ShaderAnimation /> */}
        <Background />
        <Banner />
        <h1 className="text-center text-4xl font-bold">
          Be smarter with every search
        </h1>
        <ThesisComponent />
        <AchievementsSection />
        <UserList />
      </Container>
    </div>
  )
}

export default Home
