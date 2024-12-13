package user

import (
	"gorm.io/gorm"
)

// Repository интерфейс для работы с пользователями
type Repository interface {
	Create(user *User) error
	GetByID(id uint) (*User, error)
	GetByEmail(email string) (*User, error)
	Update(user *User) error
	Delete(id uint) error
	GetAll() ([]User, error)
}

// repository структура для работы с базой данных
type repository struct {
	db *gorm.DB
}

// NewRepository создает новый репозиторий для работы с пользователями
func NewRepository(db *gorm.DB) Repository {
	return &repository{
		db: db,
	}
}

// Create создает нового пользователя в базе данных
func (r *repository) Create(user *User) error {
	return r.db.Create(user).Error
}
func (r *repository) GetAll() ([]User, error) {
	var users []User
	if err := r.db.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

// GetByID находит пользователя по его ID
func (r *repository) GetByID(id uint) (*User, error) {
	var user User
	if err := r.db.First(&user, id).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// GetByEmail находит пользователя по его email
func (r *repository) GetByEmail(email string) (*User, error) {
	var user User
	if err := r.db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// Update обновляет информацию о пользователе
func (r *repository) Update(user *User) error {
	if err := r.db.Save(user).Error; err != nil {
		return err
	}
	return nil
}

// Delete удаляет пользователя по ID
func (r *repository) Delete(id uint) error {
	if err := r.db.Delete(&User{}, id).Error; err != nil {
		return err
	}
	return nil
}
