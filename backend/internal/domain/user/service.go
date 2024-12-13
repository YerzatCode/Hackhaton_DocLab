package user

import (
	"errors"
	"fmt"
	"log"

	"github.com/YerzatCode/QizPU/internal/utils"
	"gorm.io/gorm"
)

// Service интерфейс для работы с пользователями в бизнес-логике
type Service interface {
	Register(user *User) error
	GetUserByID(id uint) (*User, error)
	GetUserByEmail(email string) (*User, error)
	UpdateUser(user *User) error
	DeleteUser(id uint) error
	GetAll() ([]User, error)
	AddRoleToUser(db *gorm.DB, userID uint, roleName string) error
}

// service структура для работы с бизнес-логикой пользователей
type service struct {
	repo Repository
}

// NewService создает новый сервис для работы с пользователями
func NewService(repo Repository) Service {
	return &service{
		repo: repo,
	}
}

func (s *service) GetAll() ([]User, error) {
	return s.repo.GetAll()
}

// Register регистрирует нового пользователя
func (s *service) Register(user *User) error {
	// Проверка на уникальность email
	existingUser, err := s.repo.GetByEmail(user.Email)
	if err == nil && existingUser != nil {
		return errors.New("пользователь с таким email уже существует")
	}

	// Хеширование пароля
	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		return err
	}
	user.Password = hashedPassword

	// Сохраняем пользователя
	return s.repo.Create(user)
}

// GetUserByID возвращает пользователя по ID
func (s *service) GetUserByID(id uint) (*User, error) {
	return s.repo.GetByID(id)
}

// GetUserByEmail возвращает пользователя по email
func (s *service) GetUserByEmail(email string) (*User, error) {
	return s.repo.GetByEmail(email)
}

// UpdateUser обновляет данные пользователя
func (s *service) UpdateUser(user *User) error {
	return s.repo.Update(user)
}

// DeleteUser удаляет пользователя по ID
func (s *service) DeleteUser(id uint) error {
	return s.repo.Delete(id)
}

func (s *service) AddRoleToUser(db *gorm.DB, userID uint, roleName string) error {
	// Находим пользователя по ID
	var user User
	if err := db.First(&user, userID).Error; err != nil {
		return fmt.Errorf("user not found: %v", err)
	}

	// Находим роль по имени
	var role Role
	if err := db.First(&role, "name = ?", roleName).Error; err != nil {
		return fmt.Errorf("role not found: %v", err)
	}

	// Проверяем, есть ли уже эта роль у пользователя
	for _, r := range user.Roles {
		if r.ID == role.ID {
			return fmt.Errorf("user already has this role")
		}
	}

	// Добавляем роль пользователю
	user.Roles = append(user.Roles, role)

	// Сохраняем обновленного пользователя
	if err := db.Save(&user).Error; err != nil {
		return fmt.Errorf("failed to update user roles: %v", err)
	}

	log.Printf("Role '%s' added to user %s %s", roleName, user.FirstName, user.LastName)
	return nil
}
