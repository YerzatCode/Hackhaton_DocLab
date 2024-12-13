package main

import (
	"log"

	"github.com/YerzatCode/QizPU/internal/api"
	"github.com/YerzatCode/QizPU/internal/config"
	"github.com/YerzatCode/QizPU/internal/middleware"
	"github.com/YerzatCode/QizPU/internal/storage"
	"github.com/YerzatCode/QizPU/internal/storage/db"
	"github.com/YerzatCode/QizPU/internal/utils"
	"github.com/gin-gonic/gin"
)

func init() {
	utils.InitLogger()
}
func main() {
	r := gin.Default()
	cfg := config.ConfigInit()
	db := db.InitDB(cfg.Path)
	storage.CreateRoles(db)
	r.Use(middleware.LoggingMiddleware()) // Логирование для всех запросов
	r.Use(middleware.CORSMiddleware())
	router := api.SetupRouter(db, cfg.JwtSecret, r)
	r.Static("/static", "./upload")

	if err := router.Run(cfg.Port); err != nil {
		log.Fatalf("Ошибка запуска сервера: %v", err)
	}
}
