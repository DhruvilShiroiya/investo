# backend/routers/health.py
from fastapi import APIRouter
from utils.model_loader import load_models
import logging

router = APIRouter(prefix="/health", tags=["health"])
logger = logging.getLogger("backend")

@router.get("/")
def health_check():
    models = load_models()
    loaded = [k for k,v in models.items() if v is not None]
    return {"status": "ok", "models_loaded": loaded}