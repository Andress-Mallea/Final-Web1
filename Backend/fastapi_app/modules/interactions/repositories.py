from sqlalchemy import Column
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from modules.identity.repositories import Base  

class FavoriteORM(Base):
    __tablename__ = "interactions_favorite"
    id = Column(PG_UUID(as_uuid=True), primary_key=True)
    user_id = Column(PG_UUID(as_uuid=True))
    artwork_id = Column(PG_UUID(as_uuid=True))

class InteractionRepository:
    def __init__(self, db): self.db = db
    