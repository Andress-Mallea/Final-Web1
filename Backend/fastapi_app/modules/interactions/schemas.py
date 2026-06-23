from pydantic import BaseModel
from uuid import UUID

class FavoriteCreate(BaseModel):
    artwork_id: UUID