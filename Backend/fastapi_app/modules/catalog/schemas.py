from pydantic import BaseModel
from uuid import UUID
from typing import Optional
class ArtworkResponse(BaseModel):
    id: UUID
    title: str
    description: Optional[str] = None
    image_url: str
    views_count: Optional[int] = 0
    class Config: 
        from_attributes = True
class TagResponse(BaseModel):
    id: UUID
    name: str
    
    class Config:
        from_attributes = True