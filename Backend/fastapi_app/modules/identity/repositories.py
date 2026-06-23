from sqlalchemy import Column, String, select
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import declarative_base
from sqlalchemy.ext.asyncio import AsyncSession
from core.interfaces import BaseRepository
import uuid

Base = declarative_base()

class UserORM(Base):
    __tablename__ = "identity_user"
    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(String)

class UserRepository(BaseRepository):
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_username(self, username: str):
        result = await self.db.execute(select(UserORM).where(UserORM.username == username))
        return result.scalars().first()
