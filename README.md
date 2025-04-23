# Email Spam Classifier Web App

This is a **web application** that classifies email messages as **Spam** or **Ham** (non-spam) using machine learning models. The backend is powered by **Flask**, and the frontend is built using **React** (Next.js). The app allows users to paste email content and receive predictions along with probability scores for each class.

## Features

- **Text Input**: Paste the email or message you want to classify.
- **Model Selection**: Choose between **Naive Bayes**, **Decision Tree**, or **SVM** models for classification.
- **Theme Toggle**: Switch between **light** and **dark** modes.
- **Probability Display**: See the probabilities for **Ham** and **Spam**.
- **Visual Feedback**: A ring chart to show the classification result (Spam or Ham).

## Tech Stack

### Frontend:
- **React** (Next.js)
- **Framer Motion** for animations
- **Lucide-React** icons
- **Tailwind CSS** for styling

### Backend:
- **Flask** for the REST API
- **Scikit-learn** for machine learning models (Naive Bayes, Decision Tree, SVM)
- **TensorFlow** for model predictions
- **Flask-CORS** to handle Cross-Origin Resource Sharing (CORS)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/email-spam-classifier.git
cd email-spam-classifier
