package user

import (
	"gorm.io/gorm"
)

// Role представляет роль пользователя (студент, преподаватель, администратор)
type Role struct {
	gorm.Model
	Name        string `json:"name" gorm:"unique;not null"`        // Название роли
	Description string `json:"description"`                        // Описание роли
	Users       []User `json:"users" gorm:"many2many:user_roles;"` // Связь с пользователями
}

// User представляет структуру пользователя (студента)
type User struct {
	gorm.Model
	FirstName string `json:"first_name" gorm:"not null"`                  // Имя пользователя
	LastName  string `json:"last_name" gorm:"not null"`                   // Фамилия пользователя
	Email     string `json:"email" gorm:"unique;not null"`                // Электронная почта пользователя
	Password  string `json:"password" gorm:"not null"`                    // Пароль пользователя
	RoleID    uint   `json:"role_id"`                                     // Связь с ролью
	Roles     []Role `json:"roles" gorm:"many2many:user_roles; not null"` // Связь с ролями
	Bio       string `json:"bio" `
	Phone     string `json:"phone"`
	Locate    string `json:"locate"`
	BirthDate string `json:"birth_date"`
	Gender    bool   `json:"gender"`
	Website   string `json:"website"`
}

// TableName возвращает название таблицы для модели User
func (User) TableName() string {
	return "users"
}

// TableName возвращает название таблицы для модели Role
func (Role) TableName() string {
	return "roles"
}
