from core.cache import get_cache, set_cache
from .repositories import ArtworkRepository

class CatalogService:
    def __init__(self, repo: ArtworkRepository):
        self.repo = repo

    async def fetch_feed(self):
        artworks = await self.repo.get_all_artworks()
        artworks_dict = []
        for a in artworks:
            artworks_dict.append({
                "id": str(a.id), 
                "title": a.title, 
                "image_url": a.image_url 
            })
        return artworks_dict
    async def create_artwork(self, title: str, description: str, image_url: str, tag_ids: list, artist_id: int):
        new_artwork = await self.repo.create_artwork(title, description, image_url, tag_ids, artist_id)
        
        return new_artwork