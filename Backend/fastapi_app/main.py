from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis.asyncio import Redis
from fastapi.staticfiles import StaticFiles
from core.config import settings
import core.cache as cache
import os
from modules.identity.routers import router as identity_router
from modules.catalog.routers import router as catalog_router
from modules.business.routers import router as business_router
from modules.interactions.routers import router as interactions_router
from modules.messages.routers import router as messages_router


@asynccontextmanager
async def lifespan(app: FastAPI):
  
    print("Iniciando conexión a Redis...")
    cache.redis_client = Redis(
        host=settings.REDIS_HOST,
        port=settings.REDIS_PORT,
        decode_responses=True 
    )
    yield 
    print("Cerrando conexión a Redis...")
    if cache.redis_client:
        await cache.redis_client.aclose()

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
    lifespan=lifespan
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get(f"{settings.API_V1_STR}/healthz", tags=["Health"])
async def health_check():
    return {
        "status": "ok", 
        "project": settings.PROJECT_NAME,
        "message": "La API modular está funcionando y conectada."
    }
os.makedirs("uploads", exist_ok=True) 
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.include_router(identity_router, prefix=settings.API_V1_STR)
app.include_router(catalog_router, prefix=settings.API_V1_STR)
app.include_router(business_router, prefix=settings.API_V1_STR)
app.include_router(interactions_router, prefix=settings.API_V1_STR)
app.include_router(messages_router, prefix=settings.API_V1_STR)