from core.cache import get_cache, set_cache
from .repositories import ArtworkRepository

class CatalogService:
    def __init__(self, repo: ArtworkRepository):
        self.repo = repo

    async def fetch_feed(self):
        cached_feed = await get_cache("artworks_feed")
        if cached_feed:
            return cached_feed
        artworks = await self.repo.get_all_artworks()
        artworks_dict = [{"id": str(a.id), "title": a.title, "image_url": a.image_url} for a in artworks]
        await set_cache("artworks_feed", artworks_dict, expire_seconds=300)
        return artworks_dict