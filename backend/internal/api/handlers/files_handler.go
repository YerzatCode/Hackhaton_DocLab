package handlers

import (
	"net/http"
	"path/filepath"
	"strconv"

	"github.com/YerzatCode/QizPU/internal/domain/files"
	"github.com/YerzatCode/QizPU/internal/domain/thesis"
	"github.com/YerzatCode/QizPU/internal/storage/local"
	"github.com/gin-gonic/gin"
)

// FilesHandler структура для обработки запросов, связанных с файлами
type FilesHandler struct {
	FileService   files.Service
	ThesisService thesis.Service
	LocalStorage  *local.LocalStorage
}

// NewFilesHandler создает новый экземпляр FilesHandler
func NewFilesHandler(fileService files.Service, thesisService thesis.Service, localStorage local.LocalStorage) *FilesHandler {
	return &FilesHandler{
		FileService:   fileService,
		ThesisService: thesisService,
		LocalStorage:  &localStorage,
	}
}

// CreateFile обрабатывает создание нового файла
func (h *FilesHandler) CreateFile(c *gin.Context) {
	// Получение файла из запроса
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File is required"})
		return
	}

	// Сохраняем файл через сервис локального хранилища
	filePath := filepath.Join("upload/", file.Filename)

	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}

	// Создаем запись о файле в базе данных
	fileDate := files.File{
		Name:     file.Filename,
		FilePath: filePath,
	}

	if err := h.FileService.CreateFile(&fileDate); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create file record", "details": err.Error()})
		return
	}

	// Возвращаем успешный ответ
	c.JSON(http.StatusOK, gin.H{
		"message":   "File uploaded successfully",
		"file_name": fileDate.Name,
		"file_path": fileDate.FilePath,
	})
}

// GetFileByID обрабатывает получение файла по ID
func (h *FilesHandler) GetFileByID(c *gin.Context) {
	// Получаем ID из параметра
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	// Получаем файл через сервис
	file, err := h.FileService.GetFileByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "File not found"})
		return
	}

	// Возвращаем файл
	c.JSON(http.StatusOK, gin.H{
		"id":        file.ID,
		"name":      file.Name,
		"file_path": file.FilePath,
	})
}

// GetAllFiles обрабатывает запрос для получения всех файлов
func (h *FilesHandler) GetAllFiles(c *gin.Context) {
	files, err := h.FileService.GetAllFiles()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve files"})
		return
	}

	// Возвращаем список всех файлов
	c.JSON(http.StatusOK, files)
}

// UpdateFile обрабатывает обновление файла
func (h *FilesHandler) UpdateFile(c *gin.Context) {
	var file files.File
	if err := c.ShouldBindJSON(&file); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Получаем ID из параметра URL
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	file.ID = uint(id)

	// Обновляем файл через сервис
	if err := h.FileService.UpdateFile(&file); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Ответ на успешное обновление
	c.JSON(http.StatusOK, gin.H{"message": "File updated successfully"})
}

// DeleteFile обрабатывает удаление файла
func (h *FilesHandler) DeleteFile(c *gin.Context) {
	// Получаем ID из параметра
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	// Удаляем файл через сервис
	if err := h.FileService.DeleteFile(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete file"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "File deleted successfully"})
}

// CreateFiles загружает несколько файлов и привязывает их к дипломной работе
func (h *FilesHandler) CreateFiles(c *gin.Context) {
	idStr := c.Param("thesis_id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}
	// Получаем файлы из запроса
	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to parse multipart form"})
		return
	}

	// Получаем список файлов
	filesList := form.File["files"]
	if len(filesList) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "At least one file is required"})
		return
	}

	// Получаем ID дипломной работы из параметров запроса
	// thesisIDStr := c.DefaultQuery("thesis_id", "")
	// if thesisIDStr == "" {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Thesis ID is required"})
	// 	return
	// }

	// Перебираем каждый файл и сохраняем его
	var filePaths []string
	var fileIDs []uint
	for _, file := range filesList {
		// Сохраняем файл на сервер
		filePath := filepath.Join("upload", file.Filename)

		// Сохраняем файл в папку "upload"
		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file", "details": err.Error()})
			return
		}

		// Добавляем путь файла в список
		filePaths = append(filePaths, filePath)

		// Создаем запись о файле в базе данных
		fileData := files.File{
			Name:     file.Filename,
			FilePath: filePath,
		}

		if err := h.FileService.CreateFile(&fileData); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create file record", "details": err.Error()})
			return
		}

		// Добавляем ID файла в список для привязки к дипломной работе
		fileIDs = append(fileIDs, fileData.ID)
	}

	// Привязываем файлы к дипломной работе
	if err := h.ThesisService.AttachFilesToThesis(uint(id), fileIDs); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to attach files to thesis", "details": err.Error()})
		return
	}

	// Возвращаем успешный ответ
	c.JSON(http.StatusOK, gin.H{
		"message": "Files uploaded and attached to thesis successfully",
		"files":   filePaths,
	})
}
