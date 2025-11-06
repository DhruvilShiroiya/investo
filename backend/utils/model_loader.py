# backend/utils/model_loader.py
import os
import joblib
import pandas as pd
import logging

logger = logging.getLogger("backend")

DEFAULT_MODEL_DIR = os.environ.get("MODEL_DIR", os.path.join(os.path.dirname(os.path.dirname(__file__)), "models"))

def _load_joblib(path):
    try:
        return joblib.load(path)
    except Exception as e:
        logger.error(f"Failed to load {path}: {e}")
        return None

def load_models(model_dir: str = DEFAULT_MODEL_DIR):
    models = {}
    logger.info(f"Loading models from {model_dir}")
    # scaler
    scaler_path = os.path.join(model_dir, "scaler.pkl")
    models["scaler"] = _load_joblib(scaler_path)

    # individual asset models (file names expected as given)
    models["gold"] = _load_joblib(os.path.join(model_dir, "gold_price_model.pkl")) or _load_joblib(os.path.join(model_dir, "gold_price_model.pkl".replace("_price_model", ""))) or _load_joblib(os.path.join(model_dir, "gold_price_model.pkl".replace("gold_price_model", "gold")))
    models["silver"] = _load_joblib(os.path.join(model_dir, "silver_price_model.pkl"))
    models["nifty"] = _load_joblib(os.path.join(model_dir, "nifty_price_model.pkl"))
    models["sensex"] = _load_joblib(os.path.join(model_dir, "sensex_price_model.pkl"))

    # correlation CSV
    corr_path = os.path.join(model_dir, "correlation_matrix.csv")
    if os.path.exists(corr_path):
        try:
            models["correlation"] = pd.read_csv(corr_path)
        except Exception as e:
            logger.error(f"Failed to read correlation CSV: {e}")
            models["correlation"] = None
    else:
        models["correlation"] = None

    logger.info(f"Loaded models: {[k for k,v in models.items() if v is not None]}")
    return models