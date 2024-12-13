const IntroSection = () => {
  return (
    <section className="intro">
      <div className="intro__container container mx-auto px-4">
        <div className="intro__title text-4xl font-bold text-center mb-6">
          Be smarter with every search
        </div>
        <div className="intro__form">
          <form action="get" className="flex justify-center">
            <input
              type="text"
              placeholder="Search for a keyword, title, author"
              className="px-4 py-2 border border-gray-300 rounded-l-lg w-2/3"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
export default IntroSection
