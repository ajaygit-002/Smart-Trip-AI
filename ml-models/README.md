# Real-Time Tourist Crowd Predictor ML Models

This folder contains machine learning models for crowd prediction.

## Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Train the model
python train_model.py

# Run the API
python app.py
```

## API Endpoints

- `POST /predict` - Get crowd prediction for a place
- `GET /health` - Health check

## Model Details

- **Algorithm**: XGBoost
- **Features**: hour, weekday, weekend, holiday, season, weather
- **Output**: crowd_score (0-100), crowd_level (Low/Medium/High/Very High)
