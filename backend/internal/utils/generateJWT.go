package utils

import (
	"time"

	"github.com/golang-jwt/jwt/v4"
)

var jwtSecretKey = []byte("yerzat") // Используйте более безопасный секретный ключ

// Claims структура для хранения данных, которые будут закодированы в JWT
type Claims struct {
	UserID uint   `json:"user_id"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

// generateJWT генерирует JWT для пользователя
func GenerateJWT(userID uint, role string) (string, error) {
	// Устанавливаем время истечения токена
	expirationTime := time.Now().Add(24 * time.Hour) // 1 день

	// Создаем новый токен с использованием HMAC SHA256 алгоритма
	claims := &Claims{
		UserID: userID,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime), // Устанавливаем время истечения
			Issuer:    "your-app-name",
		},
	}

	// Создаем токен
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Подписываем токен с использованием секретного ключа
	signedToken, err := token.SignedString(jwtSecretKey)
	if err != nil {
		return "", err // Ошибка при подписи токена
	}

	return signedToken, nil
}
