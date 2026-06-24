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

    async def create(self, user_data):
        new_user = UserORM(**user_data)
        self.db.add(new_user)
        await self.db.commit()
        return new_user

    async def get_by_id(self, user_id):
        result = await self.db.execute(select(UserORM).where(UserORM.id == user_id))
        return result.scalars().first()

    async def get_all(self):
        result = await self.db.execute(select(UserORM))
        return result.scalars().all()

    async def update(self, user_id, user_data):
        # Lógica para actualizar un usuario existente
        pass

    async def delete(self, user_id):
        # Lógica para borrar un usuario
        pass
    async def get_by_username(self, username: str):
        result = await self.db.execute(select(UserORM).where(UserORM.username == username))
        return result.scalars().first()
