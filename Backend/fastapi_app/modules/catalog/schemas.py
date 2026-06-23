from pydantic import BaseModel
from uuid import UUID

class ArtworkResponse(BaseModel):
    id: UUID
    title: str
    description: str
    image_url: str
    views_count: int
    class Config: from_attributes = True