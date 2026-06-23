from abc import ABC, abstractmethod
from typing import Any, List, Optional
from uuid import UUID

class BaseRepository(ABC):
    @abstractmethod
    async def get_by_id(self, id: UUID) -> Optional[Any]:
        pass

    @abstractmethod
    async def get_all(self, skip: int = 0, limit: int = 100) -> List[Any]:
        pass

    @abstractmethod
    async def create(self, data: Any) -> Any:
        pass

    @abstractmethod
    async def update(self, id: UUID, data: Any) -> Optional[Any]:
        pass

    @abstractmethod
    async def delete(self, id: UUID) -> bool:
        pass