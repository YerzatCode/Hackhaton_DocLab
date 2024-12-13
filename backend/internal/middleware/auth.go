package middleware

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/YerzatCode/QizPU/internal/domain/user"
	"github.com/YerzatCode/QizPU/internal/storage/db"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

// JWTSecret ключ для подписи и валидации JWT токенов
var JWTSecret = []byte("yerzat") // Замените на более безопасный ключ

// AuthMiddleware проверяет наличие и валидность JWT токена из cookies
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Получаем токен из cookies
		tokenCookie, err := c.Cookie("Authorization")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization cookie missing"})
			c.Abort()
			return
		}

		// Удаляем префикс "Bearer " если он есть
		tokenString := strings.TrimPrefix(tokenCookie, "Bearer ")

		// Проверяем JWT токен
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Проверка алгоритма подписи (желательно проверять это для безопасности)
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return JWTSecret, nil
		})

		if err != nil || !token.Valid {
			log.Printf("Invalid token: %v", err)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// Извлекаем информацию из токена (например, ID пользователя)
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
			c.Abort()
			return
		}

		// Получаем ID пользователя из токена
		userID := uint(claims["user_id"].(float64))

		// Ищем пользователя в базе данных
		var user user.User
		if err := db.DB.Preload("Roles").First(&user, userID).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
			c.Abort()
			return
		}

		// Добавляем пользователя в контекст
		c.Set("user", user)
		c.Next()
	}
}
