from pydantic import BaseModel, EmailStr
from uuid import UUID
from typing import List, Optional

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class ProfileArtworkResponse(BaseModel):
    id: UUID
    title: str
    image_url: str
    artist: str
    likes: int = 0
    isLiked: bool = False

    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    id: UUID
    username: str
    email: EmailStr
    role: str
    artworks: Optional[List[ProfileArtworkResponse]] = []

    class Config: 
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str