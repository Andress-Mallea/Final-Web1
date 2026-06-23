from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "DeviantArt Clone API"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@db:5432/deviantart_db"
    REDIS_HOST: str = "redis"
    REDIS_PORT: int = 6379
    SECRET_KEY: str = "super-secret-key-para-fastapi-jwt"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    model_config = SettingsConfigDict(env_file="../.env", extra="ignore")

settings = Settings()