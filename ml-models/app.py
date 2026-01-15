from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from typing import Optional

app = FastAPI(title="Tourist Crowd Prediction API")

# Load pre-trained model (will be created during training)
try:
    model = joblib.load('crowd_predictor_model.pkl')
except:
    model = None
    print("Model not found. Please train the model first.")

class PredictionRequest(BaseModel):
    hour: int
    weekday: int  # 0-6 (Monday-Sunday)
    weekend: bool
    holiday: bool
    season: Optional[str] = "regular"
    weather: Optional[str] = "clear"

class PredictionResponse(BaseModel):
    crowd_score: float
    crowd_level: str
    confidence: float

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """
    Predict crowd level for a tourist place
    """
    try:
        if model is None:
            # Return fallback prediction
            score = np.random.uniform(0, 100)
        else:
            # Prepare features
            features = np.array([[
                request.hour,
                request.weekday,
                int(request.weekend),
                int(request.holiday),
                hash(request.season) % 4,
                hash(request.weather) % 4
            ]])
            
            # Make prediction
            score = model.predict(features)[0]
            score = max(0, min(100, score))  # Clamp between 0-100
        
        # Determine crowd level
        if score <= 25:
            crowd_level = "Low"
        elif score <= 50:
            crowd_level = "Medium"
        elif score <= 75:
            crowd_level = "High"
        else:
            crowd_level = "Very High"
        
        return PredictionResponse(
            crowd_score=float(score),
            crowd_level=crowd_level,
            confidence=0.85
        )
    except Exception as e:
        return PredictionResponse(
            crowd_score=50,
            crowd_level="Medium",
            confidence=0
        )

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "ML API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
