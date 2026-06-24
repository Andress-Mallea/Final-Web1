from core.cache import get_cache, set_cache
from .repositories import ArtworkRepository
from sqlalchemy import select, func
from modules.interactions.repositories import FavoriteORM
class CatalogService:
    def __init__(self, repo: ArtworkRepository):
        self.repo = repo

    async def fetch_feed(self, current_user_id: str = None):
        artworks = await self.repo.get_all_artworks()
        artworks_dict = []
        
        for a in artworks:
          
            likes_query = select(func.count(FavoriteORM.id)).where(FavoriteORM.artwork_id == a.id)
            likes_result = await self.repo.db.execute(likes_query)
            likes_count = likes_result.scalar() or 0

            is_liked = False
            if current_user_id:
                user_like_query = select(FavoriteORM).where(
                    FavoriteORM.artwork_id == a.id, 
                    FavoriteORM.user_id == current_user_id
                )
                user_like_result = await self.repo.db.execute(user_like_query)
                if user_like_result.scalars().first():
                    is_liked = True
            
            artworks_dict.append({
                "id": str(a.id),
                "title": a.title,
                "description": a.description, 
                "image_url": a.image_url,
                "views_count": a.views_count, 
                "artist": a.artist.username if a.artist else "Desconocido",
                "likes": likes_count,
                "isLiked": is_liked  
            })
            
        return artworks_dict
    async def create_artwork(self, title: str, description: str, image_url: str, tag_ids: list, artist_id: int):
        new_artwork = await self.repo.create_artwork(title, description, image_url, tag_ids, artist_id)
        
        return new_artwork
    async def get_my_profile(self, user_id: str):
        user = await self.repo.get_user_with_artworks(user_id) # Debes crear este método
        return {
            "username": user.username,
            "email": user.email,
            "artworks": [
                {"id": a.id, "title": a.title, "image_url": a.image_url} 
                for a in user.artworks
            ]
        }