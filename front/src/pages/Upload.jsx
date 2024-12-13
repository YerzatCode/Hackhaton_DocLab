import { Container } from "@mui/material"
import React from "react"
import CreateThesis from "../components/CreateThesis"
import FileUploader from "../components/FileUploader"

function Upload() {
  return (
    <div>
      <Container>
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
          New Post
        </div>
        <div className="flex justify-between">
          <FileUploader />
          <CreateThesis />
        </div>
      </Container>
    </div>
  )
}

export default Upload
