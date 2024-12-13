package auth

import (
	"log"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// JWTSecret ключ для подписи и валидации JWT токенов
var JWTSecret = []byte("yerzat") // Замените на более безопасный ключ

// Claims структура для хранения пользовательских данных в токене
type Claims struct {
	UserID uint `json:"user_id"`
	jwt.StandardClaims
}

// GenerateToken генерирует JWT токен для пользователя
func GenerateToken(userID uint) (string, error) {
	// Создаем Claims с данными пользователя
	claims := Claims{
		UserID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), // Токен будет действителен 24 часа
			Issuer:    "QizPU",                               // Издатель токена
		},
	}

	// Создаем новый токен
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Подписываем токен с использованием секретного ключа
	tokenString, err := token.SignedString(JWTSecret)
	if err != nil {
		log.Printf("Ошибка при создании токена: %v", err)
		return "", err
	}

	return tokenString, nil
}

// ValidateToken проверяет JWT токен на валидность
func ValidateToken(tokenString string) (*Claims, error) {
	// Парсим токен и проверяем его
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		// Проверка алгоритма подписи
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return JWTSecret, nil
	})

	if err != nil {
		log.Printf("Ошибка при валидации токена: %v", err)
		return nil, err
	}

	// Проверяем, если токен действителен, то извлекаем информацию о пользователе
	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}

	return nil, err
}

// ExtractUserID извлекает ID пользователя из JWT токена
func ExtractUserID(tokenString string) (uint, error) {
	claims, err := ValidateToken(tokenString)
	if err != nil {
		return 0, err
	}

	return claims.UserID, nil
}
