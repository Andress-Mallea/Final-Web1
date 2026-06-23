from fastapi import APIRouter, Depends
from core.database import get_db
from .schemas import CommissionRequestCreate, CommissionResponse
from .repositories import CommissionRepository
from .services import BusinessService

router = APIRouter(prefix="/commissions", tags=["Business"])

@router.post("/", response_model=CommissionResponse)
async def create_commission(data: CommissionRequestCreate, db = Depends(get_db)):
    client_id = "00000000-0000-0000-0000-000000000000" 
    repo = CommissionRepository(db)
    service = BusinessService(repo)
    return await service.request_commission(client_id, data.tier_id, data.instructions)