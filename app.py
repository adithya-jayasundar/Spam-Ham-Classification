from flask import Flask, request, jsonify
import pandas as pd
import torch
from transformers import BertTokenizer, BertModel
from flask_cors import CORS
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load BERT model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
bert_model = BertModel.from_pretrained('bert-base-uncased')
bert_model.eval()

# Load training data
df = pd.read_csv("/home/user/Documents/MSc/SEM2/Predictive Analytics/Email spam classification/backend/bert_embeddings.csv")
X = df.drop(columns=['label'])
y = df['label']

# Train classifiers
nb_clf = GaussianNB()
nb_clf.fit(X, y)

dt_clf = DecisionTreeClassifier(random_state=42)
dt_clf.fit(X, y)

svm_clf = SVC(probability=True)  # Enable probability output
svm_clf.fit(X, y)

# Function to get BERT embedding
def get_bert_embedding(text):
    with torch.no_grad():
        inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=512)
        outputs = bert_model(**inputs)
        cls_embedding = outputs.last_hidden_state[:, 0, :].squeeze().cpu().numpy()
    return pd.DataFrame([cls_embedding])

# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict_spam_or_ham():
    data = request.get_json()
    text = data['text']
    model_choice = data.get('model', 'naive_bayes')

    embedding_df = get_bert_embedding(text)

    if model_choice == 'naive_bayes':
        model = nb_clf
    elif model_choice == 'decision_tree':
        model = dt_clf
    elif model_choice == 'svm':
        model = svm_clf
    else:
        return jsonify({'error': 'Invalid model choice'}), 400

    prediction = model.predict(embedding_df)[0]
    
    # Get predicted probabilities if available
    if hasattr(model, 'predict_proba'):
        probs = model.predict_proba(embedding_df)[0]
        prob_dict = { 'Ham': float(probs[0]), 'Spam': float(probs[1]) }
    else:
        prob_dict = {'Ham': 0.0, 'Spam': 0.0}  # Fallback if model doesn’t support predict_proba

    label_map = {0: "Ham", 1: "Spam"}
    result = label_map[prediction]

    return jsonify({
        'prediction': result,
        'probabilities': prob_dict
    })


if __name__ == '__main__':
    app.run(debug=True)
