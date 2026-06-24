from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
import json
import uuid
import os
from core.database import get_db
from .repositories import ArtworkRepository, TagRepository
from .services import CatalogService
from .schemas import ArtworkResponse, TagResponse
router = APIRouter(tags=["Catalog"])
from sqlalchemy import text  
@router.get("/artworks", response_model=list[ArtworkResponse])
async def get_artworks_feed(db = Depends(get_db)):
    repo = ArtworkRepository(db)
    service = CatalogService(repo)
    return await service.fetch_feed()

@router.get("/tags", response_model=list[TagResponse]) #
async def get_tags(db = Depends(get_db)):
    repo = TagRepository(db)
    tags = await repo.get_all_tags()
    return tags
@router.post("/artworks") 
async def create_artwork(
    title: str = Form(...),
    description: str = Form(""),
    tags: str = Form("[]"),
    file: UploadFile = File(...),
    db = Depends(get_db)
    # current_user = Depends(get_current_user) # <- Cuando tengas auth, usarás esto
):
    try:
        tag_ids = json.loads(tags)
        os.makedirs("uploads", exist_ok=True) 
        file_extension = file.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = f"uploads/{unique_filename}"
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
        image_url = f"/{file_path}" 
        repo = ArtworkRepository(db)
        service = CatalogService(repo)
        repo = ArtworkRepository(db)
        service = CatalogService(repo)
        image_url = f"/{file_path}" 
        
        repo = ArtworkRepository(db)
        service = CatalogService(repo)
        user_result = await db.execute(text("SELECT id FROM identity_user LIMIT 1"))
        real_user_id = user_result.scalar()

        if not real_user_id:
            raise HTTPException(
                status_code=400, 
                detail="No hay usuarios en la base de datos. ¡Asegúrate de que Django haya creado al menos uno!"
            )
        
        new_artwork = await service.create_artwork(
            title=title,
            description=description,
            image_url=image_url,
            tag_ids=tag_ids,
            artist_id=real_user_id 
        )
        
        return {"message": "Obra publicada con éxito", "id": new_artwork.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))