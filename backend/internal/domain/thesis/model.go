package thesis

import (
	"time"

	"github.com/YerzatCode/QizPU/internal/domain/files"
	"github.com/YerzatCode/QizPU/internal/domain/rating" // Импортируем модель Rating
	"github.com/YerzatCode/QizPU/internal/domain/user"
	"gorm.io/gorm"
)

// Thesis модель для дипломной работы
type Thesis struct {
	gorm.Model
	Title       string          `json:"title" gorm:"not null"`              // Название дипломной работы
	ImgPath     string          `json:"img_path"`                           // Путь к изображению
	Description string          `json:"description"`                        // Описание дипломной работы
	UserID      uint            `json:"user_id"`                            // ID пользователя
	User        user.User       `json:"user"`                               // Связь с пользователем
	Ratings     []rating.Rating `json:"ratings" gorm:"foreignKey:ThesisID"` // Оценки, связанные с дипломной работой
	Files       []files.File    `json:"files" gorm:"many2many:thesis_files;"`
	CreatedAt   time.Time       `json:"created_at"` // Дата создания
	UpdatedAt   time.Time       `json:"updated_at"` // Дата обновления
}

// GetAverageRating вычисляет среднюю оценку для дипломной работы
func (t *Thesis) GetAverageRating() float64 {
	var totalScore int
	var totalRatings int

	// Считаем все оценки для данной дипломной работы
	for _, rating := range t.Ratings {
		totalScore += rating.Score
		totalRatings++
	}

	// Если оценок нет, возвращаем 0
	if totalRatings == 0 {
		return 0
	}

	// Возвращаем среднее значение
	return float64(totalScore) / float64(totalRatings)
}
