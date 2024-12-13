package config

import "github.com/ilyakaznacheev/cleanenv"

type Config struct {
	Host      string `yaml:"host" env-required:"true"`
	Port      string `yaml:"port" default:":8080"`
	Path      string `yaml:"path" env-required:"true"`
	JwtSecret string `yaml:"jwt_secret" env-required:"true"`
}

func ConfigInit() *Config {
	var cfg Config

	if err := cleanenv.ReadConfig("config/config.yaml", &cfg); err != nil {
		panic(err)
	}

	return &cfg
}
