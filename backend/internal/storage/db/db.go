package db

import (
	"fmt"
	"log"

	"github.com/YerzatCode/QizPU/internal/domain/files"
	"github.com/YerzatCode/QizPU/internal/domain/rating"
	"github.com/YerzatCode/QizPU/internal/domain/thesis"
	"github.com/YerzatCode/QizPU/internal/domain/user"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// DB структура для хранения соединения с базой данных
var DB *gorm.DB

// InitDB инициализирует подключение к базе данных и выполняет миграции
func InitDB(dsn string) *gorm.DB {
	var err error

	// Создаем подключение к базе данных SQLite
	DB, err = gorm.Open(sqlite.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Ошибка подключения к базе данных: %v", err)
	}

	// Выполняем миграции для всех моделей
	err = DB.AutoMigrate(
		&user.User{},
		&user.Role{},
		&thesis.Thesis{},
		&rating.Rating{},
		&files.File{},
	)
	if err != nil {
		log.Fatalf("Ошибка миграции: %v", err)
	}

	fmt.Println("Успешно подключено к базе данных SQLite и выполнены миграции.")
	return DB
}
