# backend/routers/predictions.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from utils.model_loader import load_models
from utils.preprocessing import build_input_dataframe, scale_features
from utils.finbert import compute_finbert_impact
import logging

logger = logging.getLogger("backend")
router = APIRouter(prefix="/predict", tags=["predictions"])

# load models once
MODELS = load_models()

class PredictRequest(BaseModel):
    date: str = Field(..., description="ISO date string, e.g. 2025-11-05")
    news: str = Field(..., description="News text; FinBERT will compute impact")
    gold_price: float = Field(..., description="Current gold price (INR / 10g)")
    silver_price: float = Field(..., description="Current silver price (INR / 1kg)")
    nifty_price: float = Field(..., description="Current Nifty price")
    sensex_price: float = Field(..., description="Current Sensex price")

class PredictResponse(BaseModel):
    date: str
    impact: float
    predictions: dict
    correlations: list

@router.post("/", response_model=PredictResponse)
def predict(req: PredictRequest):
    try:
        # 1) compute impact from news with FinBERT
        impact = compute_finbert_impact(req.news)
        logger.info(f"Computed impact={impact} for date={req.date}")

        # 2) build dataframe of features in same order as scaler expects
        df_input = build_input_dataframe(
            gold=req.gold_price,
            silver=req.silver_price,
            nifty=req.nifty_price,
            sensex=req.sensex_price,
            impact=impact,
            MODELS=MODELS
        )

        # 3) scale features
        X_scaled = scale_features(df_input, MODELS)

        # 4) predict each asset
        predictions = {}
        for asset in ["gold", "silver", "nifty", "sensex"]:
            model = MODELS.get(asset)
            if model is None:
                raise HTTPException(status_code=500, detail=f"Model for {asset} not loaded")
            pred = float(model.predict(X_scaled)[0])
            predictions[f"{asset}_predicted"] = round(pred, 4)

        correlations = MODELS.get("correlation").to_dict(orient="records") if MODELS.get("correlation") is not None else []

        return {
            "date": req.date,
            "impact": impact,
            "predictions": predictions,
            "correlations": correlations
        }
    except Exception as e:
        logger.exception("Prediction failed")
        raise HTTPException(status_code=500, detail=str(e))