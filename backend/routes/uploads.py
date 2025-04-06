from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from uuid import uuid4
import os
import shutil
from models.User import User as UserModel
from utils.dependencies import get_current_user


router = APIRouter(
    prefix="/uploads",
    tags=["Uploads"],
)

@router.post("/upload-image/")
async def upload_image(
    file: UploadFile = File(...),
    user: UserModel = Depends(get_current_user),
    ):
    # Optional: validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")

    # Get file extension and create unique filename
    ext = os.path.splitext(file.filename)[1]
    unique_name = f"{uuid4()}{ext}"
    file_path = os.path.join("static", "images", unique_name)

    #Ensure file size is less than 5MB
    contents = await file.read()
    if len(contents) > 5 * 1024 * 1024:  # 5MB
        raise HTTPException(status_code=413, detail="File too large")
    # reset stream before saving
    file.file.seek(0)


    # Save the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Return public URL
    return {"img_url": f"/static/images/{unique_name}"}