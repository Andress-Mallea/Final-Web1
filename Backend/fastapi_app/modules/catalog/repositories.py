from sqlalchemy import Column, String, Integer, DateTime, Table, ForeignKey, select
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import relationship
from sqlalchemy import text
from datetime import datetime, timezone
from sqlalchemy.orm import joinedload
import uuid

from modules.identity.repositories import Base

artwork_tags = Table(
    "catalog_artwork_tags", 
    Base.metadata,
    Column("artwork_id", PG_UUID(as_uuid=True), ForeignKey("catalog_artwork.id")),
    Column("tag_id", PG_UUID(as_uuid=True), ForeignKey("catalog_tag.id"))
)
class CategoryORM(Base):
    __tablename__ = "catalog_category" 
    id = Column(PG_UUID(as_uuid=True), primary_key=True) 
    name = Column(String)
class TagORM(Base): 
    __tablename__ = "catalog_tag" 
    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True)

class ArtworkORM(Base):
    __tablename__ = "catalog_artwork"
    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(200))
    description = Column(String)
    image_url = Column(String)
    views_count = Column(Integer, default=0)
    artist = relationship(
        "UserORM", 
        primaryjoin="ArtworkORM.artist_id == UserORM.id"
    )
   
    created_at = Column(DateTime, default=func.now()) 
    
    artist_id = Column(ForeignKey("identity_user.id"))
    category_id = Column(PG_UUID(as_uuid=True)) 

    tags = relationship("TagORM", secondary="catalog_artwork_tags", lazy="selectin")
class TagRepository:
    def __init__(self, db):
        self.db = db
        
    async def get_all_tags(self):
        result = await self.db.execute(select(TagORM))
        return result.scalars().all()

class ArtworkRepository:
    def __init__(self, db): 
        self.db = db

    async def get_all_artworks(self):
        query = select(ArtworkORM).options(joinedload(ArtworkORM.artist))
        result = await self.db.execute(query)
        return result.scalars().all()

    async def create_artwork(self, title: str, description: str, image_url: str, tag_ids: list, artist_id: int):
        category_result = await self.db.execute(select(CategoryORM).where(CategoryORM.name == "Arte Digital"))
        digital_art_category = category_result.scalars().first()
        category_id = digital_art_category.id if digital_art_category else None
        tags_result = await self.db.execute(select(TagORM).where(TagORM.id.in_(tag_ids)))
        selected_tags = tags_result.scalars().all()
        new_artwork = ArtworkORM(
            id=uuid.uuid4(),
            title=title,
            description=description,
            image_url=image_url,
            artist_id=artist_id, 
            category_id=category_id, 
            tags=selected_tags
        )
        self.db.add(new_artwork)
        await self.db.commit()
        await self.db.refresh(new_artwork)
        return new_artwork