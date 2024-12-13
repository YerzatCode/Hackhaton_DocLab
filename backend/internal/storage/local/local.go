package local

import (
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"os"
	"path/filepath"

	"github.com/YerzatCode/QizPU/internal/domain/files"
)

type Storage interface {
	SaveFile(file *multipart.FileHeader) (string, error)
	GetFilePath(fileName string) string
	DeleteFile(fileName string) error
	ListFiles() ([]string, error)
	GetFileByID(fileID string) (*files.File, error)
}

// LocalStorage определяет структуру для работы с локальным хранилищем файлов
type LocalStorage struct {
	BasePath string // Базовый путь для сохранения файлов
}

// NewLocalStorage создает новый экземпляр LocalStorage
func NewLocalStorage(basePath string) *LocalStorage {
	return &LocalStorage{BasePath: basePath}
}

// SaveFile сохраняет файл в локальное хранилище
func (s *LocalStorage) SaveFile(file *multipart.FileHeader) (string, error) {
	// Открываем файл
	src, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("не удалось открыть файл: %v", err)
	}
	defer src.Close()

	// Формируем путь для сохранения файла
	destination := filepath.Join(s.BasePath, file.Filename)

	// Создаем файл
	dst, err := os.Create(destination)
	if err != nil {
		return "", fmt.Errorf("не удалось создать файл: %v", err)
	}
	defer dst.Close()

	// Копируем содержимое в новый файл
	_, err = io.Copy(dst, src) // Заменили ioutil.Copy на io.Copy
	if err != nil {
		return "", fmt.Errorf("не удалось сохранить файл: %v", err)
	}

	// Возвращаем путь к файлу
	return destination, nil
}

// GetFilePath возвращает полный путь к файлу по имени
func (s *LocalStorage) GetFilePath(fileName string) string {
	return filepath.Join(s.BasePath, fileName)
}

// DeleteFile удаляет файл из локального хранилища
func (s *LocalStorage) DeleteFile(fileName string) error {
	filePath := s.GetFilePath(fileName)
	// Проверяем существование файла
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return fmt.Errorf("файл не найден: %v", fileName)
	}

	// Удаляем файл
	err := os.Remove(filePath)
	if err != nil {
		return fmt.Errorf("не удалось удалить файл: %v", err)
	}

	return nil
}

// ListFiles возвращает список файлов в локальном хранилище
func (s *LocalStorage) ListFiles() ([]string, error) {
	files, err := ioutil.ReadDir(s.BasePath)
	if err != nil {
		return nil, fmt.Errorf("не удалось прочитать директорию: %v", err)
	}

	var fileNames []string
	for _, file := range files {
		// Добавляем только файлы
		if !file.IsDir() {
			fileNames = append(fileNames, file.Name())
		}
	}

	return fileNames, nil
}

// GetFileByID возвращает файл по ID (в данном случае по имени файла)
func (s *LocalStorage) GetFileByID(fileID string) (*files.File, error) {
	filePath := s.GetFilePath(fileID)

	// Проверяем существование файла
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return nil, errors.New("файл не найден")
	}

	// Возвращаем информацию о файле
	return &files.File{
		Name:     fileID,
		FilePath: filePath,
	}, nil
}
