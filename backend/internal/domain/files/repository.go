package files

import (
	"gorm.io/gorm"
)

// Repository интерфейс для работы с файлами
type Repository interface {
	Create(file *File) error
	GetByID(id uint) (*File, error)
	GetAll() ([]File, error)
	Update(file *File) error
	Delete(id uint) error
}

// repository структура для работы с базой данных
type repository struct {
	db *gorm.DB
}

// NewRepository создает новый репозиторий для работы с файлами
func NewRepository(db *gorm.DB) Repository {
	return &repository{
		db: db,
	}
}

// Create создает новый файл в базе данных
func (r *repository) Create(file *File) error {
	return r.db.Create(file).Error
}

// GetByID находит файл по ID
func (r *repository) GetByID(id uint) (*File, error) {
	var file File
	if err := r.db.First(&file, id).Error; err != nil {
		return nil, err
	}
	return &file, nil
}

// GetAll возвращает все файлы
func (r *repository) GetAll() ([]File, error) {
	var files []File
	if err := r.db.Find(&files).Error; err != nil {
		return nil, err
	}
	return files, nil
}

// Update обновляет информацию о файле
func (r *repository) Update(file *File) error {
	if err := r.db.Save(file).Error; err != nil {
		return err
	}
	return nil
}

// Delete удаляет файл по ID
func (r *repository) Delete(id uint) error {
	if err := r.db.Delete(&File{}, id).Error; err != nil {
		return err
	}
	return nil
}
