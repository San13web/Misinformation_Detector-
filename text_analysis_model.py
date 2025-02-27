import requests
from bs4 import BeautifulSoup
from transformers import pipeline

# Load a pre-trained NLP model (you can replace it with your own)
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

def extract_text_from_url(url):
    """ Fetches and extracts text content from a webpage. """
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()  # Raise error for failed requests

        soup = BeautifulSoup(response.text, "html.parser")
        paragraphs = soup.find_all("p")  # Extract all paragraph text
        text_content = " ".join([para.get_text() for para in paragraphs])

        if not text_content:
            return None  # No readable text found

        return text_content

    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching URL: {e}")
        return None

def analyze_text(text):
    """ Analyzes the text and returns a credibility score and a clear category. """
    if not text:
        return 0, "No text found"

    labels = ["true information", "misleading", "false information"]
    result = classifier(text, labels)

    # Convert confidence score into percentage
    credibility_score = result["scores"][0] * 100  

    # Define score thresholds for better classification
    if credibility_score >= 70:
        misinformation_text = "✅ True Information"
    elif 40 <= credibility_score < 70:
        misinformation_text = "⚠️ Uncertain / Needs Fact-Checking"
    else:
        misinformation_text = "❌ Misinformation Detected"

    return credibility_score, misinformation_text
  