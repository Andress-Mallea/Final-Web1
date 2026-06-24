from sqlalchemy import select, func
from modules.interactions.repositories import FavoriteORM
from core.security import verify_password, create_access_token, get_password_hash
from .repositories import UserRepository
from .schemas import UserCreate

class IdentityService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    async def authenticate_user(self, username: str, password: str):
        user = await self.repo.get_by_username(username)
        if not user or not verify_password(password, user.password):
            return None
        token = create_access_token(data={"sub": str(user.id), "role": user.role})
        return token

    async def create_user(self, user_data: UserCreate):
        existing_user = await self.repo.get_by_username(user_data.username)
        if existing_user:
            raise ValueError("El nombre de usuario ya está en uso")
        
        hashed_password = get_password_hash(user_data.password)
        
        new_user_dict = {
            "username": user_data.username,
            "email": user_data.email,
            "password": hashed_password,
            "role": "artist",
            "first_name": "",
            "last_name": "",
            "is_superuser": False,
            "is_staff": False,
            "is_active": True
        }
        
        return await self.repo.create(new_user_dict)

    async def get_my_profile(self, user_id: str):
        user = await self.repo.get_user_with_artworks(user_id)
        if not user:
            return None
        
        artworks_dict = []
        for a in user.artworks:
            # 1. Contamos los likes de cada obra
            likes_query = select(func.count(FavoriteORM.id)).where(FavoriteORM.artwork_id == a.id)
            likes_result = await self.repo.db.execute(likes_query)
            likes_count = likes_result.scalar() or 0

            # 2. Verificamos si el dueño del perfil le dio like a esta obra
            user_like_query = select(FavoriteORM).where(
                FavoriteORM.artwork_id == a.id, 
                FavoriteORM.user_id == user.id
            )
            user_like_result = await self.repo.db.execute(user_like_query)
            is_liked = bool(user_like_result.scalars().first())

            artworks_dict.append({
                "id": str(a.id),
                "title": a.title,
                "image_url": a.image_url,
                "artist": user.username,
                "likes": likes_count,  # <-- Inyectamos el total
                "isLiked": is_liked    # <-- Inyectamos el estado
            })
            
        return {
            "id": str(user.id),
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "artworks": artworks_dict
        }