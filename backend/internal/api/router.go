package api

import (
	"github.com/YerzatCode/QizPU/internal/api/handlers"
	"github.com/YerzatCode/QizPU/internal/domain/files"
	"github.com/YerzatCode/QizPU/internal/domain/rating"
	"github.com/YerzatCode/QizPU/internal/domain/thesis"
	"github.com/YerzatCode/QizPU/internal/domain/user"
	"github.com/YerzatCode/QizPU/internal/middleware"
	"github.com/YerzatCode/QizPU/internal/storage/local"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouter(db *gorm.DB, jwtSecret string, router *gin.Engine) *gin.Engine {
	// Инициализация Gin-роутера
	localStorage := local.NewLocalStorage("files")
	// Инициализация сервисов (эти репозитории должны быть уже настроены в другом месте)
	// Можно создать репозитории и сервисы для всех сущностей
	fileRepo := files.NewRepository(db)    // репозиторий для работы с файлами
	ratingRepo := rating.NewRepository(db) // репозиторий для работы с рейтингами
	thesisRepo := thesis.NewRepository(db) // репозиторий для работы с дипломами
	userRepo := user.NewRepository(db)     // репозиторий для работы с пользователями

	// Инициализация сервисов
	fileService := files.NewService(fileRepo)
	ratingService := rating.NewService(ratingRepo)
	thesisService := thesis.NewService(thesisRepo)
	userService := user.NewService(userRepo)

	// Инициализация обработчиков с передачей сервисов
	fileHandler := handlers.FilesHandler{FileService: fileService, ThesisService: thesisService, LocalStorage: localStorage}
	ratingHandler := handlers.RatingHandler{RatingService: ratingService}
	thesisHandler := handlers.ThesisHandler{ThesisService: thesisService}
	userHandler := handlers.UserHandler{UserService: userService, JwtSecret: jwtSecret, Database: db}

	// Роуты для работы с файлами
	fileRoutes := router.Group("/files", middleware.AuthMiddleware())
	{
		fileRoutes.POST("/", fileHandler.CreateFile)
		fileRoutes.GET("/", fileHandler.GetAllFiles)
		fileRoutes.GET("/:id", fileHandler.GetFileByID)
		fileRoutes.PUT("/:id", fileHandler.UpdateFile)
		fileRoutes.DELETE("/:id", fileHandler.DeleteFile)
	}
	router.POST("/files", fileHandler.CreateFile)
	// Роуты для работы с рейтингами
	ratingRoutes := router.Group("/ratings", middleware.AuthMiddleware())
	{
		ratingRoutes.POST("/", ratingHandler.CreateRating)
		ratingRoutes.GET("/:id", ratingHandler.GetRatingByID)
		ratingRoutes.PUT("/:id", ratingHandler.UpdateRating)
		ratingRoutes.DELETE("/:id", ratingHandler.DeleteRating)
		ratingRoutes.GET("/theses/:thesis_id", ratingHandler.GetByThesisID)
	}

	// Роуты для работы с дипломами
	thesisRoutes := router.Group("/theses", middleware.AuthMiddleware())
	{
		thesisRoutes.POST("/", thesisHandler.CreateThesis)
		thesisRoutes.GET("/", thesisHandler.GetAllTheses)
		thesisRoutes.GET("/:id", thesisHandler.GetThesisByID)
		thesisRoutes.PUT("/:id", thesisHandler.UpdateThesis)
		thesisRoutes.DELETE("/:id", thesisHandler.DeleteThesis)
	}
	router.GET("/me", middleware.AuthMiddleware(), userHandler.Me)
	router.POST("/logout", userHandler.Logout)
	router.POST("/add-role-to-user", userHandler.AddRoleToUserHandler)
	router.POST("/theses/:thesis_id/attach_files", fileHandler.CreateFiles)
	// Роуты для работы с пользователями
	userRoutes := router.Group("/users")
	{
		userRoutes.GET("/:id", userHandler.GetUserByID)
		userRoutes.GET("/", userHandler.GetAllUsers)
		userRoutes.POST("/login", userHandler.Login)
		userRoutes.POST("/", userHandler.Register)
		userRoutes.PUT("/:id", userHandler.UpdateUser)
		userRoutes.DELETE("/:id", userHandler.DeleteUser)
	}

	return router
}
