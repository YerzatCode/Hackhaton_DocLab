package files

import (
	"gorm.io/gorm"
)

// File представляет структуру файла, прикрепленного к дипломной работе
type File struct {
	gorm.Model
	Name     string `json:"name" gorm:"not null"`      // Имя файла
	FilePath string `json:"file_path" gorm:"not null"` // Путь к файлу
}

// TableName возвращает название таблицы для модели File
func (File) TableName() string {
	return "files"
}
