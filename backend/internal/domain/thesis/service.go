package thesis

import (
	"errors"
)

// Service интерфейс для работы с дипломными работами в бизнес-логике
type Service interface {
	CreateThesis(thesis *Thesis) error
	GetThesisByID(id uint) (*Thesis, error)
	GetThesisByTitle(title string) (*Thesis, error)
	GetAllTheses() ([]Thesis, error)
	UpdateThesis(thesis *Thesis) error
	DeleteThesis(id uint) error
	AttachFilesToThesis(thesisID uint, fileIDs []uint) error
}

// service структура для работы с бизнес-логикой дипломных работ
type service struct {
	repo Repository
}

// NewService создает новый сервис для работы с дипломными работами
func NewService(repo Repository) Service {
	return &service{
		repo: repo,
	}
}

// CreateThesis создает новую дипломную работу
func (s *service) CreateThesis(thesis *Thesis) error {
	// Проверка на существование диплома с таким же названием
	existingThesis, err := s.repo.GetByTitle(thesis.Title)
	if err == nil && existingThesis != nil {
		return errors.New("дипломная работа с таким названием уже существует")
	}

	// Сохраняем дипломную работу
	return s.repo.Create(thesis)
}

// GetThesisByID возвращает дипломную работу по ID
func (s *service) GetThesisByID(id uint) (*Thesis, error) {
	return s.repo.GetByID(id)
}

// GetThesisByTitle возвращает дипломную работу по названию
func (s *service) GetThesisByTitle(title string) (*Thesis, error) {
	return s.repo.GetByTitle(title)
}

// GetAllTheses возвращает все дипломные работы
func (s *service) GetAllTheses() ([]Thesis, error) {
	return s.repo.GetAll()
}

// UpdateThesis обновляет данные дипломной работы
func (s *service) UpdateThesis(thesis *Thesis) error {
	return s.repo.Update(thesis)
}

// DeleteThesis удаляет дипломную работу по ID
func (s *service) DeleteThesis(id uint) error {
	return s.repo.Delete(id)
}

func (s *service) AttachFilesToThesis(thesisID uint, fileIDs []uint) error {
	return s.repo.AttachFilesToThesis(thesisID, fileIDs)
}
