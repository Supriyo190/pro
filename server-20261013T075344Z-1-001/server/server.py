from flask import Flask, request, jsonify, render_template
import pandas as pd
import joblib
import os

app = Flask(__name__,
            template_folder="../templates",
            static_folder="../static")

# Load model from server folder
model_path = os.path.join(os.path.dirname(__file__), "best_model.pkl")
model = joblib.load(model_path)

# Home page
@app.route('/')
def home():
    return render_template("index.html")

# Prediction API
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    input_data = pd.DataFrame([{
        "Age": int(data.get("age", 0)),
        "Duration_in_days": int(data["duration"]) if data.get("duration") else 0,
        "Gender": data.get("gender", "Male"),
        "Symptom": data.get("symptom", ""),
        "Disease": data.get("disease", ""),
        "Condition_Type": data.get("condition", "Acute"),
        "Severity_Level": data.get("severity") or "Mild",
        "Previous_Therapy": data.get("previous") or "None",
        "Response_to_Previous": data.get("response") or "None",
        "Lifestyle_Factor": data.get("lifestyle", "")
    }])

    prediction = model.predict(input_data)[0]
    confidence = max(model.predict_proba(input_data)[0])

    return jsonify({
        "therapy": prediction,
        "confidence": float(confidence)
    })

if __name__ == '__main__':
    app.run(debug=True)