# backend/utils/preprocessing.py
import pandas as pd
import numpy as np
import logging

logger = logging.getLogger("backend")

# default feature names used at training (update if your training used different order)
DEFAULT_FEATURE_ORDER = [
    "Gold Price (INR / 10gms)",
    "Silver Price (INR / 1kg)",
    "Price_Nifty",
    "Price_Sensex",
    "Impact"
]

def _get_expected_features(MODELS):
    scaler = MODELS.get("scaler")
    if scaler is None:
        logger.warning("No scaler available; using default feature order")
        return DEFAULT_FEATURE_ORDER
    # try to get feature names from scaler if available
    if hasattr(scaler, "feature_names_in_"):
        try:
            return list(scaler.feature_names_in_)
        except Exception:
            pass
    # fallback
    return DEFAULT_FEATURE_ORDER

def build_input_dataframe(gold: float, silver: float, nifty: float, sensex: float, impact: float, MODELS):
    """
    Returns a single-row pandas DataFrame with columns ordered as expected by scaler.
    """
    features = _get_expected_features(MODELS)
    # mapping from known training column names to provided values
    mapping = {
        "Gold Price (INR / 10gms)": gold,
        "Gold": gold,
        "Silver Price (INR / 1kg)": silver,
        "Silver": silver,
        "Price_Nifty": nifty,
        "Price_Nifty": nifty,
        "Nifty": nifty,
        "Price_Sensex": sensex,
        "Sensex": sensex,
        "Impact": impact
    }

    row = {}
    for f in features:
        # try exact key then some normalized variants
        if f in mapping:
            row[f] = mapping[f]
        else:
            # try normalized match ignoring case & spaces
            found = None
            fnorm = f.replace(" ", "").replace("_", "").lower()
            for key in mapping:
                knorm = key.replace(" ", "").replace("_", "").lower()
                if fnorm == knorm:
                    found = mapping[key]
                    break
            if found is not None:
                row[f] = found
            else:
                # if still missing, default to 0.0
                logger.warning(f"Feature {f} not found in mapping; defaulting to 0.0")
                row[f] = 0.0

    df = pd.DataFrame([row], columns=features)
    return df

def scale_features(df_input: pd.DataFrame, MODELS):
    scaler = MODELS.get("scaler")
    if scaler is None:
        raise RuntimeError("Scaler not loaded")
    X_scaled = scaler.transform(df_input)
    return X_scaled