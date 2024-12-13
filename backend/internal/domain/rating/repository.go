package rating

import (
	"gorm.io/gorm"
)

// Repository интерфейс для работы с оценками
type Repository interface {
	Create(rating *Rating) error
	GetByID(id uint) (*Rating, error)
	GetAll() ([]Rating, error)
	Update(rating *Rating) error
	Delete(id uint) error
	GetByThesisID(thesisID uint) ([]Rating, error)
}

// repository структура для работы с базой данных
type repository struct {
	db *gorm.DB
}

// NewRepository создает новый репозиторий для работы с оценками
func NewRepository(db *gorm.DB) Repository {
	return &repository{
		db: db,
	}
}

func (r *repository) GetByThesisID(thesisID uint) ([]Rating, error) {
	var ratings []Rating
	if err := r.db.Where("thesis_id = ?", thesisID).Find(&ratings).Error; err != nil {
		return nil, err
	}
	return ratings, nil
}

// Create создает новую оценку
func (r *repository) Create(rating *Rating) error {
	return r.db.Create(rating).Error
}

// GetByID находит оценку по ID
func (r *repository) GetByID(id uint) (*Rating, error) {
	var rating Rating
	if err := r.db.First(&rating, id).Error; err != nil {
		return nil, err
	}
	return &rating, nil
}

// GetAll возвращает все оценки
func (r *repository) GetAll() ([]Rating, error) {
	var ratings []Rating
	if err := r.db.Find(&ratings).Error; err != nil {
		return nil, err
	}
	return ratings, nil
}

// Update обновляет информацию об оценке
func (r *repository) Update(rating *Rating) error {
	if err := r.db.Save(rating).Error; err != nil {
		return err
	}
	return nil
}

// Delete удаляет оценку по ID
func (r *repository) Delete(id uint) error {
	if err := r.db.Delete(&Rating{}, id).Error; err != nil {
		return err
	}
	return nil
}
