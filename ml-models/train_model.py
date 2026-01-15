import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib
from datetime import datetime, timedelta

# Generate synthetic training data
def generate_training_data(n_samples=5000):
    """
    Generate synthetic crowd data for training
    Features: hour, weekday, weekend, holiday, season, weather
    """
    data = []
    
    for _ in range(n_samples):
        hour = np.random.randint(0, 24)
        weekday = np.random.randint(0, 7)
        is_weekend = weekday >= 5
        is_holiday = np.random.choice([True, False], p=[0.1, 0.9])
        season = np.random.choice([0, 1, 2, 3])  # Spring, Summer, Fall, Winter
        weather = np.random.choice([0, 1, 2, 3])  # Clear, Rainy, Cloudy, Hot
        
        # Generate crowd score based on patterns
        base_crowd = 50
        
        # Peak hours: 10-12 AM, 2-5 PM, 6-8 PM
        if hour in [10, 11, 12, 14, 15, 16, 17, 18, 19]:
            base_crowd += 30
        elif hour in [20, 21, 22]:
            base_crowd += 15
        elif hour < 8 or hour > 23:
            base_crowd -= 40
        
        # Weekend effect
        if is_weekend:
            base_crowd += 20
        
        # Holiday effect
        if is_holiday:
            base_crowd += 30
        
        # Season effect (Summer > Spring > Fall > Winter)
        season_effect = [10, 25, 5, 0]
        base_crowd += season_effect[season]
        
        # Weather effect
        weather_effect = [0, -15, 5, 20]
        base_crowd += weather_effect[weather]
        
        # Add noise
        crowd_score = base_crowd + np.random.normal(0, 10)
        crowd_score = max(0, min(100, crowd_score))
        
        data.append([hour, weekday, int(is_weekend), int(is_holiday), season, weather, crowd_score])
    
    return np.array(data)

# Train model
def train_model():
    print("Generating training data...")
    data = generate_training_data(5000)
    
    X = data[:, :-1]  # Features
    y = data[:, -1]   # Target (crowd_score)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training XGBoost model...")
    model = XGBRegressor(
        n_estimators=100,
        max_depth=6,
        learning_rate=0.1,
        random_state=42,
        n_jobs=-1
    )
    
    model.fit(X_train, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"\nModel Performance:")
    print(f"MSE: {mse:.4f}")
    print(f"R² Score: {r2:.4f}")
    print(f"RMSE: {np.sqrt(mse):.4f}")
    
    # Save model
    joblib.dump(model, 'crowd_predictor_model.pkl')
    print("\nModel saved as 'crowd_predictor_model.pkl'")
    
    return model

if __name__ == "__main__":
    train_model()
