from core.security import verify_password, create_access_token
from .repositories import UserRepository

class IdentityService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    async def authenticate_user(self, username: str, password: str):
        user = await self.repo.get_by_username(username)
        if not user or not verify_password(password, user.password):
            return None
        token = create_access_token(data={"sub": str(user.id), "role": user.role})
        return token