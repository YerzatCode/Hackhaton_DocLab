const AchievementsSection = () => {
  return (
    <section className="achievements bg-gray-100 py-12">
      <div className="achievements__container container mx-auto px-4">
        <div className="achievements__list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="achievements__list-card bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="achievements__card-icon text-4xl text-blue-500 mb-4">
              <i className="fa-regular fa-handshake"></i>
            </div>
            <div className="achievements__card-title font-semibold text-lg">
              Trusted by over 30.3K readers
            </div>
          </div>

          <div className="achievements__list-card bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="achievements__card-icon text-4xl text-blue-500 mb-4">
              <i className="fa-solid fa-book-open"></i>
            </div>
            <div className="achievements__card-title font-semibold text-lg">
              Access over 40.7M research publications
            </div>
          </div>

          <div className="achievements__list-card bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="achievements__card-icon text-4xl text-blue-500 mb-4">
              <i className="fa-solid fa-book"></i>
            </div>
            <div className="achievements__card-title font-semibold text-lg">
              Download over 1.1M e-Books
            </div>
          </div>

          <div className="achievements__list-card bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="achievements__card-icon text-4xl text-blue-500 mb-4">
              <i className="fa-regular fa-handshake"></i>
            </div>
            <div className="achievements__card-title font-semibold text-lg">
              Find research in 15+ languages
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default AchievementsSection
