# backend/utils/finbert.py
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import logging

logger = logging.getLogger("backend")

# Load model & tokenizer globally (lazy load)
_MODEL = None
_TOKENIZER = None
_MODEL_NAME = "yiyanghkust/finbert-tone"

def _ensure_model():
    global _MODEL, _TOKENIZER
    if _MODEL is None or _TOKENIZER is None:
        logger.info(f"Loading FinBERT model {_MODEL_NAME} (this may take a while)...")
        _TOKENIZER = AutoTokenizer.from_pretrained(_MODEL_NAME)
        _MODEL = AutoModelForSequenceClassification.from_pretrained(_MODEL_NAME)
        _MODEL.eval()
        # put to cpu (we won't assume GPU on deployment)
        _MODEL.to("cpu")
        logger.info("FinBERT loaded.")

def compute_finbert_impact(text: str) -> float:
    """
    Returns impact score in [-1,1] rounded to 2 decimals.
    Uses (pos_prob - neg_prob) as signed score.
    """
    if not isinstance(text, str) or text.strip() == "":
        return 0.0
    _ensure_model()
    inputs = _TOKENIZER(text, return_tensors="pt", truncation=True, padding=True, max_length=256)
    with torch.no_grad():
        outputs = _MODEL(**inputs)
        logits = outputs.logits
        probs = torch.softmax(logits, dim=-1).squeeze().cpu().numpy()
        # model label order: [negative, neutral, positive] typically
        neg = float(probs[0])
        pos = float(probs[2])
        score = pos - neg
        # clamp and round
        score = max(-1.0, min(1.0, score))
        score = float(np.round(score, 2))
    return score