#!/bin/bash
# Quick setup script for Google Maps integration

echo "🗺️ Google Maps Integration Setup"
echo "================================"
echo ""

# Check if .env exists
if [ ! -f "frontend/.env" ]; then
    echo "📝 Creating frontend/.env from template..."
    cp frontend/.env.example frontend/.env
    echo "✅ Created frontend/.env"
    echo ""
    echo "⚠️  IMPORTANT: Add your Google Maps API key to frontend/.env"
    echo "   Edit: REACT_APP_GOOGLE_MAPS_API_KEY=your_key_here"
else
    echo "✅ frontend/.env already exists"
fi

echo ""
echo "📦 Checking dependencies..."

# Check if Google Maps is mentioned in package.json
if grep -q "google" frontend/package.json 2>/dev/null; then
    echo "✅ Google Maps dependencies found"
else
    echo "ℹ️  Google Maps is loaded via CDN (no npm install needed)"
fi

echo ""
echo "🚀 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Get Google Maps API key from https://console.cloud.google.com"
echo "2. Edit frontend/.env and add: REACT_APP_GOOGLE_MAPS_API_KEY=your_key"
echo "3. Start frontend: cd frontend && npm start"
echo "4. Navigate to a city and click 'Map View' button"
echo ""
echo "For detailed setup: Read GOOGLE_MAPS_GUIDE.md"
