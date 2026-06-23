from fastapi import APIRouter, Depends
from core.database import get_db
from .repositories import ArtworkRepository
from .services import CatalogService

router = APIRouter(prefix="/artworks", tags=["Catalog"])

@router.get("/")
async def get_artworks_feed(db = Depends(get_db)):
    repo = ArtworkRepository(db)
    service = CatalogService(repo)
    return await service.fetch_feed()