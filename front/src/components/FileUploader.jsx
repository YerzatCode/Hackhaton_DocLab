import axios from "axios"
import React, { useEffect, useState } from "react"
import useFilePathStore from "../store/file_story"

const FileUploader = ({ onThesisUpdate }) => {
  const [file, setFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState("")
  const [imagePreview, setImagePreview] = useState(null)

  // Получаем функцию для установки пути из Zustand
  const { setFilePathImg, filePathImg } = useFilePathStore((state) => state)

  // Automatically upload the file when selected
  useEffect(() => {
    if (file) {
      handleUpload(file)
    }
  }, [file])

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
      // Check if the selected file is an image
      const validImageTypes = [
        "image/png",
        "image/jpeg",
        "image/svg+xml",
        "image/webp",
        "image/gif",
      ]
      if (validImageTypes.includes(selectedFile.type)) {
        setFile(selectedFile)
        setImagePreview(URL.createObjectURL(selectedFile)) // Set image preview
      } else {
        setUploadStatus(
          "Only image files (PNG, JPG, SVG, WEBP, GIF) are allowed."
        )
      }
    }
  }

  const handleUpload = async (file) => {
    if (!file) {
      setUploadStatus("Please select a file first.")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await axios.post(
        "http://localhost:8080/files", // Replace with your server endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      const filePath = response.data.file_name // Assuming the backend returns the file path
      setUploadStatus(`Upload successful: ${filePath}`)

      // Set the uploaded file path in Zustand state
      setFilePathImg(filePath)

      // Pass the file path to the parent component (e.g., thesis)
      onThesisUpdate(filePath)

      // Clear file and preview
      setFile(null)
      setImagePreview(null)
    } catch (error) {
      setUploadStatus(
        `Upload failed: ${
          error.response?.data?.error || "An unknown error occurred."
        }`
      )
    }
  }

  return (
    <div className="w-[500px] h-[500px]">
      {/* If an image is selected, show the image preview */}
      {imagePreview ? (
        <div className="flex flex-col items-center justify-center  w-full  h-full">
          <img
            src={"http://localhost:8080/static/" + filePathImg}
            className="h-full max-w-full object-cover"
            alt="..."
          />
          <button
            onClick={() => {
              setFile(null)
              setImagePreview(null) // Clear preview if image is removed
            }}
            className="mt-2 bg-red-500 text-white p-2 rounded">
            Remove Image
          </button>
        </div>
      ) : (
        <label
          htmlFor="uploadFile1"
          className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-11 mb-2 fill-gray-500"
            viewBox="0 0 32 32">
            <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
            <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
          </svg>
          Upload file
          <input
            type="file"
            id="uploadFile1"
            className="hidden"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/svg+xml, image/webp, image/gif" // Restrict to images only
          />
          <p className="text-xs font-medium text-gray-400 mt-2">
            PNG, JPG, SVG, WEBP, and GIF are allowed.
          </p>
        </label>
      )}

      {/* {uploadStatus && <p>{uploadStatus}</p>} */}
    </div>
  )
}

export default FileUploader
