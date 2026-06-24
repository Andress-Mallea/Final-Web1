import uuid
from sqlalchemy import Column, DateTime, ForeignKey, Text, or_, select, update
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from modules.identity.repositories import Base, UserORM

class ConversationORM(Base):
    __tablename__ = "interactions_conversation"

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    participant_one_id = Column(PG_UUID(as_uuid=True), ForeignKey("identity_user.id"))
    participant_two_id = Column(PG_UUID(as_uuid=True), ForeignKey("identity_user.id"))
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())

class MessageORM(Base):
    __tablename__ = "interactions_message"

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id = Column(PG_UUID(as_uuid=True), ForeignKey("interactions_conversation.id"))
    sender_id = Column(PG_UUID(as_uuid=True), ForeignKey("identity_user.id"))
    body = Column(Text)
    created_at = Column(DateTime(timezone=True), default=func.now())
    read_at = Column(DateTime(timezone=True), nullable=True)

class MessageRepository:
    def __init__(self, db):
        self.db = db

    async def get_user_by_username(self, username: str):
        result = await self.db.execute(select(UserORM).where(UserORM.username == username))
        return result.scalars().first()

    async def get_conversation_between(self, user_id, participant_id):
        result = await self.db.execute(
            select(ConversationORM).where(
                or_(
                    (ConversationORM.participant_one_id == user_id) & (ConversationORM.participant_two_id == participant_id),
                    (ConversationORM.participant_one_id == participant_id) & (ConversationORM.participant_two_id == user_id),
                )
            )
        )
        return result.scalars().first()

    async def create_conversation(self, user_id, participant_id):
        conversation = ConversationORM(
            id=uuid.uuid4(),
            participant_one_id=user_id,
            participant_two_id=participant_id,
        )
        self.db.add(conversation)
        await self.db.commit()
        await self.db.refresh(conversation)
        return conversation

    async def get_user_conversations(self, user_id):
        result = await self.db.execute(
            select(ConversationORM).where(
                or_(
                    ConversationORM.participant_one_id == user_id,
                    ConversationORM.participant_two_id == user_id,
                )
            ).order_by(ConversationORM.updated_at.desc())
        )
        return result.scalars().all()

    async def get_conversation_for_user(self, conversation_id, user_id):
        result = await self.db.execute(
            select(ConversationORM).where(
                ConversationORM.id == conversation_id,
                or_(
                    ConversationORM.participant_one_id == user_id,
                    ConversationORM.participant_two_id == user_id,
                )
            )
        )
        return result.scalars().first()

    async def get_messages(self, conversation_id):
        result = await self.db.execute(
            select(MessageORM, UserORM.username)
            .join(UserORM, MessageORM.sender_id == UserORM.id)
            .where(MessageORM.conversation_id == conversation_id)
            .order_by(MessageORM.created_at.asc())
        )
        return result.all()

    async def get_last_message(self, conversation_id):
        result = await self.db.execute(
            select(MessageORM)
            .where(MessageORM.conversation_id == conversation_id)
            .order_by(MessageORM.created_at.desc())
            .limit(1)
        )
        return result.scalars().first()

    async def create_message(self, conversation_id, sender_id, body: str):
        message = MessageORM(
            id=uuid.uuid4(),
            conversation_id=conversation_id,
            sender_id=sender_id,
            body=body,
        )
        self.db.add(message)
        await self.db.execute(
            update(ConversationORM)
            .where(ConversationORM.id == conversation_id)
            .values(updated_at=func.now())
        )
        await self.db.commit()
        await self.db.refresh(message)
        return message