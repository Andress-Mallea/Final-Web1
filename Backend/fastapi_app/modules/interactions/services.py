import uuid
from .repositories import InteractionRepository

class InteractionService:
    def __init__(self, repo: InteractionRepository): 
        self.repo = repo

    async def toggle_favorite(self, user_id: str, artwork_id: str):
        # Convertimos estrictamente a UUID para que PostgreSQL no falle
        user_uuid = uuid.UUID(str(user_id))
        artwork_uuid = uuid.UUID(str(artwork_id))

        existing_fav = await self.repo.get_favorite(user_uuid, artwork_uuid)
        
        if existing_fav:
            await self.repo.remove_favorite(existing_fav.id)
            return {"status": "unliked", "artwork_id": str(artwork_uuid)}
        else:
            await self.repo.add_favorite(user_uuid, artwork_uuid)
            return {"status": "liked", "artwork_id": str(artwork_uuid)}