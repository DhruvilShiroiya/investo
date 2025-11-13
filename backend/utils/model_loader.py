import os
import joblib
import pandas as pd
import logging

logger = logging.getLogger("backend")

# Default model directory (backend/models)
DEFAULT_MODEL_DIR = os.environ.get(
    "MODEL_DIR",
    os.path.join(os.path.dirname(os.path.dirname(__file__)), "models")
)


def _load_joblib(path):
    """Safely load a joblib model file."""
    try:
        if os.path.exists(path):
            model = joblib.load(path)
            logger.info(f"✅ Loaded: {os.path.basename(path)}")
            return model
        else:
            logger.warning(f"⚠️ Model file not found: {path}")
            return None
    except Exception as e:
        logger.error(f"❌ Failed to load {path}: {e}")
        return None


def load_models(model_dir: str = DEFAULT_MODEL_DIR):
    """Loads all models and the correlation matrix from model_dir."""
    models = {}
    logger.info(f"📦 Loading models from: {model_dir}")

    # Load scaler
    models["scaler"] = _load_joblib(os.path.join(model_dir, "scaler.pkl"))

    # Load model files for each asset
    models["gold"] = _load_joblib(os.path.join(model_dir, "gold_price_model.pkl"))
    models["silver"] = _load_joblib(os.path.join(model_dir, "silver_price_model.pkl"))
    models["nifty"] = _load_joblib(os.path.join(model_dir, "nifty_price_model.pkl"))
    models["sensex"] = _load_joblib(os.path.join(model_dir, "sensex_price_model.pkl"))

    # Load correlation CSV
    corr_path = os.path.join(model_dir, "correlation_matrix.csv")
    if os.path.exists(corr_path):
        try:
            models["correlation"] = pd.read_csv(corr_path)
            logger.info("✅ Correlation matrix loaded.")
        except Exception as e:
            logger.error(f"❌ Failed to read correlation CSV: {e}")
            models["correlation"] = None
    else:
        logger.warning("⚠️ No correlation matrix found.")
        models["correlation"] = None

    # Summary log
    loaded = [k for k, v in models.items() if v is not None]
    logger.info(f"✅ Models successfully loaded: {loaded}")

    return models