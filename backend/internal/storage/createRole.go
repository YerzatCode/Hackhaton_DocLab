package storage

import (
	"log"

	"github.com/YerzatCode/QizPU/internal/domain/user"
	"gorm.io/gorm"
)

// Создание начальных ролей
func CreateRoles(db *gorm.DB) {
	roles := []user.Role{
		{Name: "student", Description: "Role for students"},
		{Name: "teacher", Description: "Role for teachers"},
		{Name: "admin", Description: "Role for administrators"},
	}

	// Проверяем, существуют ли уже эти роли в базе данных
	for _, role := range roles {
		var count int64
		if err := db.Model(&user.Role{}).Where("name = ?", role.Name).Count(&count).Error; err != nil {
			log.Printf("Error checking role existence: %v", err)
			return
		}

		// Если роль не существует, добавляем ее
		if count == 0 {
			if err := db.Create(&role).Error; err != nil {
				log.Printf("Error creating role %s: %v", role.Name, err)
				return
			}
		}
	}
}
