from transformers import pipeline

def download_model():
    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
    print("Model downloaded successfully!")

if __name__ == "__main__":
    download_model()
