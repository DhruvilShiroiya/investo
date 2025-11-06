# backend/routers/correlations.py
from fastapi import APIRouter, HTTPException
from utils.model_loader import load_models
import logging

logger = logging.getLogger("backend")
router = APIRouter(prefix="/correlations", tags=["correlations"])

# load on import
MODELS = load_models()

@router.get("/", summary="Get correlation matrix")
def get_correlations():
    corr = MODELS.get("correlation")
    if corr is None:
        raise HTTPException(status_code=500, detail="Correlation data not available")
    # return as records (list of rows) for easy consumption in frontend
    return {"correlation_matrix": corr.to_dict(orient="records")}