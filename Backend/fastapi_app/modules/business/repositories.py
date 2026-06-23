from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from identity.repositories import Base

class CommissionORM(Base):
    __tablename__ = "business_commissionrequest"
    id = Column(PG_UUID(as_uuid=True), primary_key=True)
    status = Column(String)
    instructions = Column(String)
    client_id = Column(PG_UUID(as_uuid=True))
    tier_id = Column(PG_UUID(as_uuid=True))

class CommissionRepository:
    def __init__(self, db): self.db = db
    
    async def create_request(self, commission: CommissionORM):
        self.db.add(commission)
        await self.db.commit()
        await self.db.refresh(commission)
        return commission