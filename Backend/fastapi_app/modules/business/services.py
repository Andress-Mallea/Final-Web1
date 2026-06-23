from .repositories import CommissionRepository, CommissionORM
from uuid import UUID

class BusinessService:
    def __init__(self, repo: CommissionRepository):
        self.repo = repo

    async def request_commission(self, client_id: UUID, tier_id: UUID, instructions: str):
        new_commission = CommissionORM(
            client_id=client_id,
            tier_id=tier_id,
            instructions=instructions,
            status="pending"
        )
        return await self.repo.create_request(new_commission)