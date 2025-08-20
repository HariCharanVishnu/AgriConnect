from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

# Mock crop database with realistic data
CROP_DATABASE = {
    "wheat": {
        "optimal_temp": (15, 25),
        "optimal_rainfall": (400, 800),
        "growth_period": 120,
        "yield_per_acre": (2.5, 4.0),
        "diseases": ["rust", "smut", "powdery_mildew"],
        "pests": ["aphids", "armyworm", "cutworm"]
    },
    "rice": {
        "optimal_temp": (20, 35),
        "optimal_rainfall": (1000, 2000),
        "growth_period": 150,
        "yield_per_acre": (3.0, 5.5),
        "diseases": ["blast", "bacterial_blight", "tungro"],
        "pests": ["stem_borer", "leaf_folder", "planthopper"]
    },
    "corn": {
        "optimal_temp": (18, 32),
        "optimal_rainfall": (500, 1000),
        "growth_period": 100,
        "yield_per_acre": (4.0, 7.0),
        "diseases": ["northern_leaf_blight", "southern_leaf_blight", "rust"],
        "pests": ["corn_borer", "armyworm", "earworm"]
    },
    "cotton": {
        "optimal_temp": (20, 30),
        "optimal_rainfall": (600, 1200),
        "growth_period": 180,
        "yield_per_acre": (1.5, 3.0),
        "diseases": ["bacterial_blight", "verticillium_wilt", "fusarium_wilt"],
        "pests": ["bollworm", "aphids", "whitefly"]
    },
    "sugarcane": {
        "optimal_temp": (25, 35),
        "optimal_rainfall": (1500, 2500),
        "growth_period": 365,
        "yield_per_acre": (60, 100),
        "diseases": ["red_rot", "smut", "wilt"],
        "pests": ["borer", "scale", "mealybug"]
    }
}

def calculate_yield_prediction(crop_name, temperature, rainfall, soil_quality, region):
    """Calculate yield prediction based on environmental factors"""
    if crop_name.lower() not in CROP_DATABASE:
        return None
    
    crop_data = CROP_DATABASE[crop_name.lower()]
    
    # Base yield from database
    base_yield = sum(crop_data["yield_per_acre"]) / 2
    
    # Temperature factor (0.5 to 1.5)
    temp_factor = 1.0
    if temperature < crop_data["optimal_temp"][0]:
        temp_factor = 0.5 + (temperature / crop_data["optimal_temp"][0]) * 0.3
    elif temperature > crop_data["optimal_temp"][1]:
        temp_factor = 1.0 - ((temperature - crop_data["optimal_temp"][1]) / 10) * 0.3
    else:
        temp_factor = 1.0
    
    # Rainfall factor (0.6 to 1.4)
    rain_factor = 1.0
    if rainfall < crop_data["optimal_rainfall"][0]:
        rain_factor = 0.6 + (rainfall / crop_data["optimal_rainfall"][0]) * 0.4
    elif rainfall > crop_data["optimal_rainfall"][1]:
        rain_factor = 1.0 - ((rainfall - crop_data["optimal_rainfall"][1]) / 500) * 0.2
    else:
        rain_factor = 1.0
    
    # Soil quality factor (0.8 to 1.2)
    soil_factor = 0.8 + (soil_quality / 100) * 0.4
    
    # Regional adjustment (0.9 to 1.1)
    region_factor = 1.0
    if region.lower() in ["andhra pradesh", "telangana", "karnataka"]:
        region_factor = 1.05  # Good for most crops
    elif region.lower() in ["punjab", "haryana", "uttar pradesh"]:
        region_factor = 1.1   # Excellent for wheat/rice
    elif region.lower() in ["gujarat", "maharashtra"]:
        region_factor = 0.95  # Good for cotton/sugarcane
    
    # Calculate final yield
    predicted_yield = base_yield * temp_factor * rain_factor * soil_factor * region_factor
    
    # Add some realistic variation (±10%)
    variation = random.uniform(-0.1, 0.1)
    predicted_yield *= (1 + variation)
    
    return round(predicted_yield, 2)

def assess_risk_factors(crop_name, temperature, rainfall, soil_quality):
    """Assess risk factors for crop cultivation"""
    if crop_name.lower() not in CROP_DATABASE:
        return []
    
    crop_data = CROP_DATABASE[crop_name.lower()]
    risks = []
    
    # Temperature risks
    if temperature < crop_data["optimal_temp"][0]:
        risks.append(f"Low temperature risk: {temperature}°C is below optimal range {crop_data['optimal_temp'][0]}-{crop_data['optimal_temp'][1]}°C")
    elif temperature > crop_data["optimal_temp"][1]:
        risks.append(f"High temperature risk: {temperature}°C is above optimal range {crop_data['optimal_temp'][0]}-{crop_data['optimal_temp'][1]}°C")
    
    # Rainfall risks
    if rainfall < crop_data["optimal_rainfall"][0]:
        risks.append(f"Drought risk: {rainfall}mm rainfall is below optimal range {crop_data['optimal_rainfall'][0]}-{crop_data['optimal_rainfall'][1]}mm")
    elif rainfall > crop_data["optimal_rainfall"][1]:
        risks.append(f"Flooding risk: {rainfall}mm rainfall is above optimal range {crop_data['optimal_rainfall'][0]}-{crop_data['optimal_rainfall'][1]}mm")
    
    # Soil quality risks
    if soil_quality < 60:
        risks.append(f"Poor soil quality: {soil_quality}/100 - consider soil improvement")
    
    return risks

@app.route('/predict', methods=['POST'])
def predict():
    """Main crop prediction endpoint"""
    try:
        data = request.json
        
        # Extract parameters
        crop_name = data.get('cropName', 'wheat')
        temperature = data.get('temperature', 25)
        rainfall = data.get('rainfall', 600)
        soil_quality = data.get('soilQuality', 80)
        region = data.get('region', 'Andhra Pradesh')
        
        # Validate inputs
        if not isinstance(temperature, (int, float)) or not isinstance(rainfall, (int, float)):
            return jsonify({'error': 'Temperature and rainfall must be numbers'}), 400
        
        if soil_quality < 0 or soil_quality > 100:
            return jsonify({'error': 'Soil quality must be between 0 and 100'}), 400
        
        # Calculate prediction
        predicted_yield = calculate_yield_prediction(crop_name, temperature, rainfall, soil_quality, region)
        
        if predicted_yield is None:
            return jsonify({'error': f'Crop "{crop_name}" not supported'}), 400
        
        # Assess risks
        risks = assess_risk_factors(crop_name, temperature, rainfall, soil_quality)
        
        # Calculate confidence based on data quality
        confidence = 0.85
        if 0 < len(risks) <= 2:
            confidence = 0.75
        elif len(risks) > 2:
            confidence = 0.60
        
        # Get crop information
        crop_info = CROP_DATABASE.get(crop_name.lower(), {})
        
        response = {
            'prediction': f"Predicted yield for {crop_name}: {predicted_yield} tons/acre",
            'yield_value': predicted_yield,
            'unit': 'tons/acre',
            'confidence': round(confidence, 2),
            'crop_name': crop_name,
            'region': region,
            'environmental_factors': {
                'temperature': f"{temperature}°C",
                'rainfall': f"{rainfall}mm",
                'soil_quality': f"{soil_quality}/100"
            },
            'risks': risks,
            'recommendations': generate_recommendations(crop_name, risks, temperature, rainfall),
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

def generate_recommendations(crop_name, risks, temperature, rainfall):
    """Generate farming recommendations based on conditions"""
    recommendations = []
    
    if not risks:
        recommendations.append("Optimal conditions detected. Maintain current farming practices.")
    
    # Temperature-based recommendations
    if temperature < 15:
        recommendations.append("Consider using cold-resistant crop varieties or delaying planting.")
    elif temperature > 35:
        recommendations.append("Implement shade structures and increase irrigation frequency.")
    
    # Rainfall-based recommendations
    if rainfall < 400:
        recommendations.append("Implement drought-resistant farming techniques and irrigation systems.")
    elif rainfall > 2000:
        recommendations.append("Ensure proper drainage systems and consider raised bed farming.")
    
    # Crop-specific recommendations
    if crop_name.lower() == "wheat":
        if temperature > 30:
            recommendations.append("Wheat prefers cooler temperatures. Consider early planting or late varieties.")
    elif crop_name.lower() == "rice":
        if rainfall < 1000:
            recommendations.append("Rice requires high water. Ensure adequate irrigation or consider alternative crops.")
    
    return recommendations

@app.route('/crops', methods=['GET'])
def get_available_crops():
    """Get list of supported crops with basic information"""
    crops_info = []
    for crop_name, data in CROP_DATABASE.items():
        crops_info.append({
            'name': crop_name.title(),
            'optimal_temperature': f"{data['optimal_temp'][0]}-{data['optimal_temp'][1]}°C",
            'optimal_rainfall': f"{data['optimal_rainfall'][0]}-{data['optimal_rainfall'][1]}mm",
            'growth_period': f"{data['growth_period']} days",
            'expected_yield': f"{data['yield_per_acre'][0]}-{data['yield_per_acre'][1]} tons/acre"
        })
    
    return jsonify({
        'crops': crops_info,
        'total_crops': len(crops_info)
    })

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'SAP Crop Prediction AI',
        'timestamp': datetime.now().isoformat(),
        'version': '1.1.0'
    })

@app.route('/', methods=['GET'])
def root():
    """Root endpoint with service information"""
    return jsonify({
        'service': 'SAP Crop Prediction AI Service',
        'endpoints': {
            'POST /predict': 'Get crop yield prediction',
            'GET /crops': 'Get available crops information',
            'GET /health': 'Health check'
        },
        'usage': 'Send POST request to /predict with cropName, temperature, rainfall, soilQuality, and region'
    })

if __name__ == '__main__':
    print("🌾 Starting SAP Crop Prediction AI Service...")
    print("📊 Supported crops:", ", ".join(CROP_DATABASE.keys()))
    print("🔗 Service will be available at: http://localhost:5001")
    print("📋 API Documentation:")
    print("   - POST /predict - Get crop predictions")
    print("   - GET /crops - List available crops")
    print("   - GET /health - Service health check")
    
    app.run(host='0.0.0.0', port=5001, debug=True)