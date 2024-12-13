package handlers

import (
	"net/http"
	"strconv"

	"github.com/YerzatCode/QizPU/internal/domain/rating"
	"github.com/gin-gonic/gin"
)

type RatingHandler struct {
	RatingService rating.Service
}

func (h *RatingHandler) GetByThesisID(c *gin.Context) {
	thesisIDStr := c.Param("thesis_id")
	thesisID, err := strconv.ParseUint(thesisIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid thesis ID"})
		return
	}

	ratings, err := h.RatingService.GetByThesisID(uint(thesisID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not get ratings"})
		return
	}

	c.JSON(http.StatusOK, ratings)
}

// CreateRating создает новую оценку
func (h *RatingHandler) CreateRating(c *gin.Context) {
	var ratingRequest struct {
		Score    int    `json:"score"`
		Comment  string `json:"comment"`
		ThesisID uint   `json:"thesis_id"`
		UserID   uint   `json:"user_id"`
	}

	// Прочитать данные из запроса
	if err := c.ShouldBindJSON(&ratingRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	rating := rating.Rating{
		Score:    ratingRequest.Score,
		Comment:  ratingRequest.Comment,
		ThesisID: ratingRequest.ThesisID,
		UserID:   ratingRequest.UserID,
	}

	// Создаем оценку через сервис
	if err := h.RatingService.CreateRating(&rating); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create rating"})
		return
	}

	// Возвращаем успешный ответ
	c.JSON(http.StatusOK, gin.H{
		"message": "Rating created successfully",
	})
}

// GetRatingByID возвращает оценку по ID
func (h *RatingHandler) GetRatingByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	rating, err := h.RatingService.GetRatingByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Rating not found"})
		return
	}

	c.JSON(http.StatusOK, rating)
}

// GetAllRatings возвращает все оценки
func (h *RatingHandler) GetAllRatings(c *gin.Context) {
	ratings, err := h.RatingService.GetAllRatings()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch ratings"})
		return
	}

	c.JSON(http.StatusOK, ratings)
}

func (h *RatingHandler) UpdateRating(c *gin.Context) {
	var rating rating.Rating
	if err := c.ShouldBindJSON(&rating); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Извлекаем ID из параметров URL и преобразуем в uint
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	// Присваиваем полученный ID структуре рейтинга
	rating.ID = uint(id)

	// Обновляем рейтинг через сервис
	if err := h.RatingService.UpdateRating(&rating); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Возвращаем успешный ответ
	c.JSON(http.StatusOK, gin.H{"message": "Rating updated successfully"})
}

// DeleteRating удаляет оценку по ID
func (h *RatingHandler) DeleteRating(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	if err := h.RatingService.DeleteRating(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not delete rating"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Rating deleted successfully",
	})
}
