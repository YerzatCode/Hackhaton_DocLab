import { Container } from "@mui/material"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import useThesisStore from "../store/theses_story"
import useUserStore from "../store/user_story"
import DateFormatter from "./DateFormatter"
import "./main.css"
const ThesisComponent = ({ isUser }) => {
  const { theses } = useThesisStore((state) => state)
  const { user } = useUserStore()
  // Состояния для хранения поисковых запросов
  const [searchQuery, setSearchQuery] = useState("")

  // Фильтруем дипломные работы по названию, автору и дате
  const filteredTheses = theses?.filter((item) => {
    const titleMatch = item?.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())

    return titleMatch
  })

  return (
    <Container>
      <section className="flex flex-col gap-10 w-full justify-center mt-4">
        {!isUser && (
          <>
            {/* <div className="w-full text-center mb-4">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Обновляем поисковый запрос
                className="px-4 py-2 border rounded-lg"
              />
            </div> */}
            <form class="flex items-center w-[80%] mx-auto">
              <label for="simple-search" class="sr-only">
                Search
              </label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Обновляем поисковый запрос
                  required
                />
              </div>
              <button
                type="submit"
                class="p-2.5 ms-2 text-sm font-medium text-white bg-primary rounded-lg border border-secondary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20">
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </form>
          </>
        )}

        <section className="flex flex-wrap gap-10 w-full justify-center items-center">
          {!isUser && (
            <>
              {filteredTheses?.length === 0 ? (
                <p>Нет дипломных работ</p>
              ) : (
                filteredTheses?.map((item) => (
                  <Link key={item?.ID} to={`/thesis/${item?.ID}`}>
                    <div className="relative group w-80 max-h-[500px]">
                      <span className="flex flex-col justify-center items-center">
                        <img
                          src={
                            item?.img_path === ""
                              ? "https://www.vocaleurope.eu/wp-content/uploads/no-image.jpg"
                              : "http://localhost:8080/static/" + item?.img_path
                          }
                          alt={item?.title}
                          className="w-auto h-[500px] object-cover rounded-lg"
                        />
                        <h1 className="absolute bottom-0 text-xl font-bold text-white bg-black opacity-75 w-full py-5 text-center h-[30%] text-clip overflow-clip">
                          {item?.title}
                        </h1>
                      </span>
                      <div className="absolute inset-0 gap-2 bg-black bg-opacity-70 flex flex-col items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 font-sans">
                        <h2 className="text-xl font-sans font-bold text-gray-100">
                          {item?.title}
                        </h2>

                        <p className="text-gray-50 text-lg text-justify">
                          {item?.description}
                        </p>
                        <p className="text-gray-50 text-justify">
                          Автор:
                          {item?.user?.first_name + " " + item?.user?.last_name}
                        </p>
                        <div className="bottom-4 absolute">
                          <p className="text-gray-50 text-justify">
                            Дата: <DateFormatter dateString={item?.CreatedAt} />
                          </p>
                          <p className="text-gray-50 text-justify">
                            Последнее обновление:{" "}
                            <DateFormatter dateString={item?.UpdatedAt} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </>
          )}
          {isUser && (
            <div className="flex gap-4 overflow-x-scroll">
              {theses?.map((item) => {
                if (item?.user_id === user?.ID) {
                  return (
                    <Link key={item?.ID} to={`/thesis/${item?.ID}`}>
                      <div className="relative group w-80 max-h-[500px]">
                        <span className="flex flex-col justify-center items-center">
                          <img
                            src={
                              item?.img_path === ""
                                ? "https://www.vocaleurope.eu/wp-content/uploads/no-image.jpg"
                                : "http://localhost:8080/static/" +
                                  item?.img_path
                            }
                            alt={item?.title}
                            className="w-auto h-[500px] object-cover rounded-lg"
                          />
                          <h1 className="absolute bottom-0 text-xl font-bold text-white bg-black opacity-75 w-full py-5 text-center h-[30%] text-clip overflow-clip">
                            {item?.title}
                          </h1>
                        </span>
                        <div className="absolute inset-0 gap-2 bg-black bg-opacity-70 flex flex-col items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 font-sans">
                          <h2 className="text-xl font-sans font-bold text-gray-100">
                            {item?.title}
                          </h2>

                          <p className="text-gray-50 text-lg text-justify">
                            {item?.description}
                          </p>
                          <p className="text-gray-50 text-justify">
                            Автор:
                            {item?.user?.first_name +
                              " " +
                              item?.user?.last_name}
                          </p>
                          <p className="text-gray-50 text-justify">
                            Дата: <DateFormatter dateString={item?.CreatedAt} />
                          </p>
                          <p>
                            Дата изменения:{" "}
                            <DateFormatter dateString={item?.UpdatedAt} />
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                }
              })}
            </div>
          )}
        </section>
      </section>
    </Container>
  )
}

export default ThesisComponent
