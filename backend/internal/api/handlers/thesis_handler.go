package handlers

import (
	"net/http"
	"strconv"

	"github.com/YerzatCode/QizPU/internal/domain/thesis"
	"github.com/gin-gonic/gin"
)

// ThesisHandler обрабатывает запросы, связанные с дипломными работами
type ThesisHandler struct {
	ThesisService thesis.Service
}

// NewThesisHandler создает новый ThesisHandler
func NewThesisHandler(thesisService thesis.Service) *ThesisHandler {
	return &ThesisHandler{
		ThesisService: thesisService,
	}
}

// CreateThesis создает новую дипломную работу
func (h *ThesisHandler) CreateThesis(c *gin.Context) {
	var thesisRequest struct {
		Title       string `json:"title"`
		Description string `json:"description"`
		UserID      uint   `json:"user_id"`
		FilePath    string `json:"file_path"`
	}

	// Прочитать данные из запроса
	if err := c.ShouldBindJSON(&thesisRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Создаем новый объект Thesis
	thesis := thesis.Thesis{
		Title:       thesisRequest.Title,
		Description: thesisRequest.Description,
		UserID:      thesisRequest.UserID,
		ImgPath:     thesisRequest.FilePath,
	}

	// Создаем дипломную работу через сервис
	if err := h.ThesisService.CreateThesis(&thesis); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create thesis"})
		return
	}

	// Возвращаем успешный ответ
	c.JSON(http.StatusOK, gin.H{
		"message": "Thesis created successfully",
		"thesis":  thesis,
	})
}

// GetAllTheses возвращает все дипломные работы
func (h *ThesisHandler) GetAllTheses(c *gin.Context) {
	theses, err := h.ThesisService.GetAllTheses()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not retrieve theses"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"theses": theses,
	})
}

// GetThesisByID возвращает дипломную работу по ID
func (h *ThesisHandler) GetThesisByID(c *gin.Context) {
	// Извлекаем id из параметров запроса
	idStr := c.Param("id")

	// Преобразуем id из строки в uint
	id, err := strconv.ParseUint(idStr, 10, 32) // Преобразуем в uint
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	// Получаем дипломную работу через сервис
	thesis, err := h.ThesisService.GetThesisByID(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not retrieve thesis"})
		return
	}

	// Возвращаем дипломную работу
	c.JSON(http.StatusOK, thesis)
}

// UpdateThesis обновляет дипломную работу по ID
func (h *ThesisHandler) UpdateThesis(c *gin.Context) {
	var thesis thesis.Thesis
	if err := c.ShouldBindJSON(&thesis); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	thesis.ID = uint(id)

	if err := h.ThesisService.UpdateThesis(&thesis); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Thesis updated successfully"})
}

// DeleteThesis удаляет дипломную работу по ID
func (h *ThesisHandler) DeleteThesis(c *gin.Context) {
	// Извлекаем id из параметров запроса
	idStr := c.Param("id")

	// Преобразуем id из строки в uint
	id, err := strconv.ParseUint(idStr, 10, 32) // Преобразуем в uint
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	// Вызываем сервис для удаления дипломной работы
	if err := h.ThesisService.DeleteThesis(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not delete thesis"})
		return
	}

	// Возвращаем успешный ответ
	c.JSON(http.StatusOK, gin.H{
		"message": "Thesis deleted successfully",
	})
}
