import uuid
from sqlalchemy import Column, DateTime, select, delete
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from modules.identity.repositories import Base

class FavoriteORM(Base):
    __tablename__ = "interactions_favorite"
    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), default=func.now())
    user_id = Column(PG_UUID(as_uuid=True))
    artwork_id = Column(PG_UUID(as_uuid=True))

class InteractionRepository:
    def __init__(self, db): 
        self.db = db
    
    async def get_favorite(self, user_id, artwork_id):
        query = select(FavoriteORM).where(
            FavoriteORM.user_id == user_id,
            FavoriteORM.artwork_id == artwork_id
        )
        result = await self.db.execute(query)
        return result.scalars().first()

    async def add_favorite(self, user_id, artwork_id):
        new_fav = FavoriteORM(id=uuid.uuid4(), user_id=user_id, artwork_id=artwork_id)
        self.db.add(new_fav)
        await self.db.commit()
        return new_fav

    async def remove_favorite(self, favorite_id):
        query = delete(FavoriteORM).where(FavoriteORM.id == favorite_id)
        await self.db.execute(query)
        await self.db.commit()
    