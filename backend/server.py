import os
from dotenv import load_dotenv
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

data_store = []

# Load Gemini API Key from environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not set in environment variables")

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.json
        data_store.append(data)
        return jsonify({'message': 'Data received successfully', 'data': data}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/data', methods=['GET'])
def get_all_data():
    return jsonify(data_store)

@app.route('/api/data/<int:index>', methods=['GET'])
def get_data_by_index(index):
    if 0 <= index < len(data_store):
        return jsonify(data_store[index])
    return jsonify({'error': 'Index out of range'}), 404

@app.route('/api/gemini', methods=['POST'])
def gemini_proxy():
    user_message = request.json.get('message')
    try:
        response = requests.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
            params={"key": GEMINI_API_KEY},
            json={"contents": [{"parts": [{"text": user_message}]}]}
        )
        gemini_data = response.json()
        gemini_reply = gemini_data['candidates'][0]['content']['parts'][0]['text']
    except Exception as e:
        gemini_reply = f"Sorry, I couldn't get a response from Gemini. ({str(e)})"
    return jsonify({"reply": gemini_reply})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
