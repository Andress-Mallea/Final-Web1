from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from core.auth import get_current_user
from core.database import get_db
from modules.identity.repositories import UserORM
from .repositories import MessageRepository
from .schemas import ConversationCreate, ConversationResponse, MessageCreate, MessageResponse

router = APIRouter(prefix="/messages", tags=["Messages"])

def avatar_for(username: str) -> str:
    return f"https://api.dicebear.com/7.x/avataaars/svg?seed={username}"

async def serialize_conversation(repo: MessageRepository, conversation, current_user: UserORM):
    participant_id = (
        conversation.participant_two_id
        if conversation.participant_one_id == current_user.id
        else conversation.participant_one_id
    )
    participant = await repo.db.get(UserORM, participant_id)
    last_message = await repo.get_last_message(conversation.id)

    return ConversationResponse(
        id=conversation.id,
        participant_username=participant.username if participant else "Usuario",
        participant_avatar=avatar_for(participant.username if participant else "Usuario"),
        last_message=last_message.body if last_message else None,
        updated_at=conversation.updated_at,
    )

@router.get("/conversations", response_model=list[ConversationResponse])
async def list_conversations(
    db: AsyncSession = Depends(get_db),
    current_user: UserORM = Depends(get_current_user),
):
    repo = MessageRepository(db)
    conversations = await repo.get_user_conversations(current_user.id)
    return [await serialize_conversation(repo, conversation, current_user) for conversation in conversations]

@router.post("/conversations", response_model=ConversationResponse)
async def create_conversation(
    data: ConversationCreate,
    db: AsyncSession = Depends(get_db),
    current_user: UserORM = Depends(get_current_user),
):
    repo = MessageRepository(db)
    participant = await repo.get_user_by_username(data.participant_username.strip())

    if not participant:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if participant.id == current_user.id:
        raise HTTPException(status_code=400, detail="No puedes iniciar una conversacion contigo mismo")

    conversation = await repo.get_conversation_between(current_user.id, participant.id)

    if not conversation:
        conversation = await repo.create_conversation(current_user.id, participant.id)

    return await serialize_conversation(repo, conversation, current_user)

@router.get("/conversations/{conversation_id}/messages", response_model=list[MessageResponse])
async def list_messages(
    conversation_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: UserORM = Depends(get_current_user),
):
    repo = MessageRepository(db)
    conversation = await repo.get_conversation_for_user(conversation_id, current_user.id)

    if not conversation:
        raise HTTPException(status_code=404, detail="Conversacion no encontrada")

    rows = await repo.get_messages(conversation_id)

    return [
        MessageResponse(
            id=message.id,
            conversation_id=message.conversation_id,
            sender_id=message.sender_id,
            sender_username=username,
            sender="me" if message.sender_id == current_user.id else "them",
            body=message.body,
            created_at=message.created_at,
        )
        for message, username in rows
    ]

@router.post("/conversations/{conversation_id}/messages", response_model=MessageResponse)
async def send_message(
    conversation_id: UUID,
    data: MessageCreate,
    db: AsyncSession = Depends(get_db),
    current_user: UserORM = Depends(get_current_user),
):
    repo = MessageRepository(db)
    conversation = await repo.get_conversation_for_user(conversation_id, current_user.id)

    if not conversation:
        raise HTTPException(status_code=404, detail="Conversacion no encontrada")

    message = await repo.create_message(conversation_id, current_user.id, data.body.strip())

    return MessageResponse(
        id=message.id,
        conversation_id=message.conversation_id,
        sender_id=message.sender_id,
        sender_username=current_user.username,
        sender="me",
        body=message.body,
        created_at=message.created_at,
    )