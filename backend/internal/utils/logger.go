package utils

import (
	"log"
	"os"
)

// Logger - это глобальный объект для логирования.
var Logger *log.Logger

// InitLogger инициализирует логгер, настроив его на вывод в файл и в консоль.
func InitLogger() {
	file, err := os.OpenFile("app.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("Ошибка при открытии лог-файла: %v", err)
	}

	Logger = log.New(file, "INFO: ", log.Ldate|log.Ltime|log.Lshortfile)
}

// Info - логирование информационных сообщений.
func Info(msg string) {
	Logger.Println("INFO: " + msg)
}

// Error - логирование ошибок.
func Error(msg string, err error) {
	Logger.Println("ERROR: "+msg, err)
}

// Fatal - логирование фатальных ошибок и завершение программы.
func Fatal(msg string, err error) {
	Logger.Fatal("FATAL: "+msg, err)
}
