# backend/main.py
from fastapi import FastAPI
from routers import correlations, predictions, health
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("backend")

app = FastAPI(
    title="Financial Asset Predictor API",
    description="Predicts Gold, Silver, Nifty, and Sensex prices based on news (FinBERT impact) and current prices.",
    version="1.0.0"
)

app.include_router(health.router)
app.include_router(correlations.router)
app.include_router(predictions.router)

@app.get("/")
def root():
    return {"message": "Financial Asset Predictor API is running", "status": "ok"}