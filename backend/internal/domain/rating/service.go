package rating

// Service интерфейс для работы с оценками в бизнес-логике
type Service interface {
	CreateRating(rating *Rating) error
	GetRatingByID(id uint) (*Rating, error)
	GetAllRatings() ([]Rating, error)
	UpdateRating(rating *Rating) error
	DeleteRating(id uint) error
	GetByThesisID(thesisID uint) ([]Rating, error)
}

// service структура для работы с бизнес-логикой оценок
type service struct {
	repo Repository
}

// NewService создает новый сервис для работы с оценками
func NewService(repo Repository) Service {
	return &service{
		repo: repo,
	}
}

func (s *service) GetByThesisID(thesisID uint) ([]Rating, error) {
	return s.repo.GetByThesisID(thesisID)
}

// CreateRating создает новую оценку
func (s *service) CreateRating(rating *Rating) error {
	// Можно добавить дополнительную проверку или логику перед сохранением
	// Например, проверка, существует ли уже оценка для этого диплома и пользователя

	// Сохраняем оценку
	return s.repo.Create(rating)
}

// GetRatingByID возвращает оценку по ID
func (s *service) GetRatingByID(id uint) (*Rating, error) {
	return s.repo.GetByID(id)
}

// GetAllRatings возвращает все оценки
func (s *service) GetAllRatings() ([]Rating, error) {
	return s.repo.GetAll()
}

// UpdateRating обновляет информацию об оценке
func (s *service) UpdateRating(rating *Rating) error {
	return s.repo.Update(rating)
}

// DeleteRating удаляет оценку по ID
func (s *service) DeleteRating(id uint) error {
	return s.repo.Delete(id)
}
