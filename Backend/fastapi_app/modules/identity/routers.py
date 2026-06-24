from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db
from .schemas import UserCreate, Token, UserLogin, UserResponse
from .repositories import UserRepository
from .services import IdentityService
from core.security import get_current_user

router = APIRouter(prefix="/auth", tags=["Identity"])

@router.post("/login", response_model=Token)
async def login(data: UserLogin, db: AsyncSession = Depends(get_db)):
    repo = UserRepository(db)
    service = IdentityService(repo)
    
    token = await service.authenticate_user(data.username, data.password)
    if not token:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    return {"access_token": token, "token_type": "bearer"}
@router.get("/me")
async def get_me(current_user = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    # Inicializamos el repositorio y servicio igual que lo hiciste en el login
    repo = UserRepository(db)
    service = IdentityService(repo)
    
    # Obtenemos el perfil usando el ID que sacamos del token
    profile = await service.get_my_profile(current_user.id)
    return profile
@router.post("/register", response_model=UserResponse)
async def register(data: UserCreate, db: AsyncSession = Depends(get_db)):
    repo = UserRepository(db)
    service = IdentityService(repo)
    
    try:
        new_user = await service.create_user(data)
        return new_user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))