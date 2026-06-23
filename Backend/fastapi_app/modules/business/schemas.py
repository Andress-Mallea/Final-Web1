from pydantic import BaseModel
from uuid import UUID

class CommissionRequestCreate(BaseModel):
    tier_id: UUID
    instructions: str

class CommissionResponse(BaseModel):
    id: UUID
    status: str
    instructions: str
    class Config: from_attributes = True