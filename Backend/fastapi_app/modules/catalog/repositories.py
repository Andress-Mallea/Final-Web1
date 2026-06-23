from sqlalchemy import Column, String, Integer, select
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from .schemas import ArtworkResponse
from modules.identity.repositories import Base  

class ArtworkORM(Base):
    __tablename__ = "catalog_artwork"
    id = Column(PG_UUID(as_uuid=True), primary_key=True)
    title = Column(String)
    description = Column(String)
    image_url = Column(String)
    views_count = Column(Integer)

class ArtworkRepository:
    def __init__(self, db): self.db = db

    async def get_all_artworks(self):
        result = await self.db.execute(select(ArtworkORM).limit(50))
        return result.scalars().all()