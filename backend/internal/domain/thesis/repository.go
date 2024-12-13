package thesis

import (
	"github.com/YerzatCode/QizPU/internal/domain/files"
	"gorm.io/gorm"
)

// Repository интерфейс для работы с дипломными работами
type Repository interface {
	Create(thesis *Thesis) error
	GetByID(id uint) (*Thesis, error)
	GetByTitle(title string) (*Thesis, error)
	GetAll() ([]Thesis, error)
	Update(thesis *Thesis) error
	Delete(id uint) error
	AttachFilesToThesis(thesisID uint, fileIDs []uint) error
}

// repository структура для работы с базой данных
type repository struct {
	db *gorm.DB
}

// NewRepository создает новый репозиторий для работы с дипломными работами
func NewRepository(db *gorm.DB) Repository {
	return &repository{
		db: db,
	}
}

// Create создает новую дипломную работу в базе данных
func (r *repository) Create(thesis *Thesis) error {
	return r.db.Create(thesis).Error
}

// GetByID находит дипломную работу по ID
func (r *repository) GetByID(id uint) (*Thesis, error) {
	var thesis Thesis
	if err := r.db.Preload("Files").Preload("User").Preload("Ratings").First(&thesis, id).Error; err != nil {
		return nil, err
	}
	return &thesis, nil
}

// GetByTitle находит дипломную работу по названию
func (r *repository) GetByTitle(title string) (*Thesis, error) {
	var thesis Thesis
	if err := r.db.Preload("Files").Preload("User").Preload("Ratings").Where("title = ?", title).First(&thesis).Error; err != nil {
		return nil, err
	}
	return &thesis, nil
}

// GetAll возвращает все дипломные работы
func (r *repository) GetAll() ([]Thesis, error) {
	var theses []Thesis
	if err := r.db.Preload("Files").Preload("User").Preload("Ratings").Find(&theses).Error; err != nil {
		return nil, err
	}
	return theses, nil
}

// Update обновляет информацию о дипломной работе
func (r *repository) Update(thesis *Thesis) error {
	if err := r.db.Save(thesis).Error; err != nil {
		return err
	}
	return nil
}

// Delete удаляет дипломную работу по ID
func (r *repository) Delete(id uint) error {
	if err := r.db.Delete(&Thesis{}, id).Error; err != nil {
		return err
	}
	return nil
}
func (r *repository) AttachFilesToThesis(thesisID uint, fileIDs []uint) error {
	var thesis Thesis
	// Получаем дипломную работу по ID
	if err := r.db.First(&thesis, thesisID).Error; err != nil {
		return err
	}

	// Получаем файлы по их ID
	var files []files.File
	if err := r.db.Where("id IN ?", fileIDs).Find(&files).Error; err != nil {
		return err
	}

	// Привязываем файлы к дипломной работе через связь многие ко многим
	if err := r.db.Model(&thesis).Association("Files").Append(files); err != nil {
		return err
	}

	return nil
}
