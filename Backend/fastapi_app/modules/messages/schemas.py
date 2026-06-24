from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field

class ConversationCreate(BaseModel):
    participant_username: str = Field(..., min_length=1)

class MessageCreate(BaseModel):
    body: str = Field(..., min_length=1, max_length=5000)

class ConversationResponse(BaseModel):
    id: UUID
    participant_username: str
    participant_avatar: str
    last_message: str | None = None
    updated_at: datetime

class MessageResponse(BaseModel):
    id: UUID
    conversation_id: UUID
    sender_id: UUID
    sender_username: str
    sender: str
    body: str
    created_at: datetime