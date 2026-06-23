import json
from redis.asyncio import Redis
from core.config import settings
from typing import Any, Optional

redis_client: Optional[Redis] = None

async def get_redis() -> Redis:
    if redis_client is None:
        raise ConnectionError("Redis no está inicializado")
    return redis_client
async def set_cache(key: str, value: Any, expire_seconds: int = 3600):
    client = await get_redis()
    await client.set(key, json.dumps(value), ex=expire_seconds)

async def get_cache(key: str) -> Optional[Any]:
    client = await get_redis()
    data = await client.get(key)
    if data:
        return json.loads(data)
    return None