package files

import (
	"errors"
)

// Service интерфейс для работы с файлами в бизнес-логике
type Service interface {
	CreateFile(file *File) error
	GetFileByID(id uint) (*File, error)
	GetAllFiles() ([]File, error)
	UpdateFile(file *File) error
	DeleteFile(id uint) error
}

// service структура для работы с бизнес-логикой файлов
type service struct {
	repo Repository
}

// NewService создает новый сервис для работы с файлами
func NewService(repo Repository) Service {
	return &service{
		repo: repo,
	}
}

// CreateFile создает новый файл
func (s *service) CreateFile(file *File) error {
	// Проверка на существование файла с таким же именем (если нужно)
	existingFile, err := s.repo.GetByID(file.ID)
	if err == nil && existingFile != nil {
		return errors.New("файл с таким ID уже существует")
	}

	// Сохраняем файл
	return s.repo.Create(file)
}

// GetFileByID возвращает файл по ID
func (s *service) GetFileByID(id uint) (*File, error) {
	return s.repo.GetByID(id)
}

// GetAllFiles возвращает все файлы
func (s *service) GetAllFiles() ([]File, error) {
	return s.repo.GetAll()
}

// UpdateFile обновляет информацию о файле
func (s *service) UpdateFile(file *File) error {
	return s.repo.Update(file)
}

// DeleteFile удаляет файл по ID
func (s *service) DeleteFile(id uint) error {
	return s.repo.Delete(id)
}
