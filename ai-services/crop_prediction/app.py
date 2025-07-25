from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    # Dummy prediction logic
    crop_name = data.get('cropName', 'Wheat')
    prediction = f"Predicted yield for {crop_name}: 2.5 tons/acre"
    return jsonify({'prediction': prediction, 'confidence': 0.92})

if __name__ == '__main__':
    app.run(port=5001)