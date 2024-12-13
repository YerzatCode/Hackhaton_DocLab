package rating

import (
	"gorm.io/gorm"
)

// Rating модель для оценки дипломной работы
type Rating struct {
	gorm.Model
	UserID   uint   `json:"user_id"`   // ID пользователя (кто оценил)
	ThesisID uint   `json:"thesis_id"` // ID дипломной работы
	Score    int    `json:"score"`     // Оценка
	Comment  string `json:"comment"`   // Комментарий к оценке
}
