from flask import Flask, request, jsonify
from flask_cors import CORS
from text_analysis_model import analyze_text, extract_text_from_url  # Import function

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    url = data.get("url", "")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    # Extract text from URL
    text_content = extract_text_from_url(url)

    if not text_content:
        return jsonify({"error": "Failed to extract content from URL"}), 500

    # Call text analysis model
    credibility_score, misinformation_text = analyze_text(text_content)

    return jsonify({"score": credibility_score, "misinformation": misinformation_text})

if __name__ == "__main__":
    app.run(debug=True)
