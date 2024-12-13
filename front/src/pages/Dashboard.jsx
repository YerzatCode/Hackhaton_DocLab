import React from "react"
import ThesisComponent from "../components/ThesisComponent"
import useUserStore from "../store/user_story"

function Dashboard() {
  const { user } = useUserStore((state) => state)
  return (
    <div className="h-full">
      <section className="w-full overflow-hidden dark:bg-gray-900">
        <div className="flex flex-col">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
            alt="User Cover"
            className="w-full border-primary xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
          />

          <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
            <img
              src="https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"
              alt="User Profile"
              className="rounded-full lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] border-primary sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-primary relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
            />

            <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
              {user.first_name} {user.last_name}
            </h1>
          </div>

          <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
            <p className="w-fit text-gray-700 dark:text-gray-400 text-md">
              {user.bio}
            </p>

            <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
              <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                <div className="w-full">
                  <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-col pb-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        First Name
                      </dt>
                      <dd className="text-lg font-semibold">
                        {user.first_name}
                      </dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Last Name
                      </dt>
                      <dd className="text-lg font-semibold">
                        {user.last_name}
                      </dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Date Of Birth
                      </dt>
                      <dd className="text-lg font-semibold">21/02/1997</dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Gender
                      </dt>
                      <dd className="text-lg font-semibold">
                        {user.gender ? <>Ұл</> : <>Қыз</>}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="w-full">
                  <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-col pb-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Location
                      </dt>
                      <dd className="text-lg font-semibold">{user.locate}</dd>
                    </div>

                    <div className="flex flex-col pt-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Phone Number
                      </dt>
                      <dd className="text-lg font-semibold">{user.phone}</dd>
                    </div>
                    <div className="flex flex-col pt-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Email
                      </dt>
                      <dd className="text-lg font-semibold">{user.email}</dd>
                    </div>

                    <div className="flex flex-col pt-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Website
                      </dt>
                      <dd className="text-lg font-semibold hover:text-blue-500">
                        <a href={user.website}>{user.website}</a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div className="fixed right-2  flex flex-col rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-200/80 dark:text-gray-700 hover:text-gray-600 hover:dark:text-gray-400">
              <a href="https://www.linkedin.com/in/samuel-abera-6593a2209/">
                <div className="p-2 hover:text-primary hover:dark:text-primary">
                  <svg
                    className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.01 5.087a1.66 1.66 0 0 1 .349-.693c-.174-.2-.293-.441-.379-.705-.286-.844-.347-1.772-.162-2.658.225-.572.755-.746 1.292-.788-.211-.108-.418-.229-.621-.359-1.267-.648-2.696-.537-3.784.197-.262.156-.523.305-.8.458-1.295.52-2.544.158-3.547-.732-.502-.412-.939-.933-1.351-1.497a2.937 2.937 0 0 1-.581-1.495c-.02-.88.46-1.658 1.244-2.137.348-.208.748-.273 1.136-.197 1.412.236 2.588 1.13 3.322 2.351.762 1.423 1.495 3.147 1.4 4.962 0 1.248-.388 2.585-1.131 3.684-.551 1.012-1.485 1.57-2.623 1.573a3.025 3.025 0 0 1-1.73-.565c-.036-.03-.078-.056-.12-.089-.215-.101-.411-.213-.634-.313z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </a>

              <a href="https://twitter.com/AberaSamuel">
                <div className="p-2 hover:text-primary hover:dark:text-primary">
                  <svg
                    className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-sky-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </a>

              <a href="https://www.youtube.com/channel/UCOh5yq0Z_8hhtZ6Joa5t4gA">
                <div className="p-2 hover:text-primary hover:dark:text-primary">
                  <svg
                    className="lg:w-6 lg:h-6 xs:w-4 xs:h-4 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 17c0 1.1.89 1.99 1.99 1.99h14c1.1 0 1.99-.89 1.99-1.99V5c0-1.1-.89-2-1.99-2zm-.51 14.6c-.44 0-.82-.25-1.01-.63L16 12l2.48-3.6c.19-.38.57-.63 1.01-.63h1.01c.66 0 1.2.53 1.2 1.2s-.53 1.2-1.2 1.2h-.88l-1.04 1.49 1.04 1.5h.88c.66 0 1.2-.53 1.2-1.2s-.54-1.2-1.2-1.2h-1.01zm-10.6-9.2c-.66 0-1.2.53-1.2 1.2 0 .67.54 1.2 1.2 1.2h8c.66 0 1.2-.53 1.2-1.2 0-.67-.54-1.2-1.2-1.2H8.89z"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
        <ThesisComponent isUser={true} />
      </section>
    </div>
  )
}

export default Dashboard
