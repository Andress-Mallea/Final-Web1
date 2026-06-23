from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db
from .schemas import UserCreate, Token
from .repositories import UserRepository
from .services import IdentityService

router = APIRouter(prefix="/auth", tags=["Identity"])

@router.post("/login", response_model=Token)
async def login(data: UserCreate, db: AsyncSession = Depends(get_db)):
    repo = UserRepository(db)
    service = IdentityService(repo)
    
    token = await service.authenticate_user(data.username, data.password)
    if not token:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    return {"access_token": token, "token_type": "bearer"}