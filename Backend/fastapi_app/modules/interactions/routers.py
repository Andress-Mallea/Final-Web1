from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db
from core.security import get_current_user
from .schemas import FavoriteCreate
from .repositories import InteractionRepository
from .services import InteractionService

router = APIRouter(prefix="/interactions", tags=["Interactions"])

@router.post("/like")
async def toggle_like(
    data: FavoriteCreate, 
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user) 
):
    repo = InteractionRepository(db)
    service = InteractionService(repo)
    
    try:
        result = await service.toggle_favorite(current_user.id, data.artwork_id)
        return result
    except Exception as e:
        # Imprimimos el error real en consola por si algo más falla
        print("ERROR CRÍTICO AL DAR LIKE:", str(e))
        raise HTTPException(status_code=500, detail=str(e))