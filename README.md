# Email Spam Classifier - Local Deployment

This project is a **local web application** that classifies email messages as **Spam** or **Ham** (non-spam) using machine learning models. The backend is powered by **Flask** (Python), and the frontend is built using **Next.js** with React. The app allows users to paste email content and get predictions for whether the message is spam or not, along with the corresponding probability.

## Features

- **Text Input**: Users can paste an email message or content for classification.
- **Model Selection**: Users can choose between **Naive Bayes**, **Decision Tree**, or **SVM** models for classification.
- **Theme Toggle**: Toggle between **light** and **dark** modes for the UI.
- **Probability Display**: Shows the probability of the message being **Ham** or **Spam**.
- **Ring Visualization**: A visual representation of the classification result using a circular progress bar.

## Tech Stack

### Frontend:
- **Next.js** for React-based framework
- **React** for UI components and state management
- **Framer Motion** for animations and smooth transitions
- **Lucide-React** icons for easy-to-use, customizable icons
- **Tailwind CSS** for utility-first CSS styling
- **JavaScript (ES6+)** for interactive features and logic

### Backend:
- **Flask** for creating the REST API to handle requests between frontend and machine learning models
- **Scikit-learn** for machine learning models (Naive Bayes, Decision Tree, SVM)
- **Flask-CORS** for enabling cross-origin resource sharing between frontend (Next.js) and backend (Flask)

### Model:
- **Naive Bayes**, **Decision Tree**, and **SVM** classifiers are used to predict whether an email is **Spam** or **Ham**. The models are trained on labeled datasets (e.g., SpamAssassin or custom datasets) to classify the input text.
- The models return probabilities that show the likelihood of the email being spam or not.

## Requirements

- **Python 3.x**
- **Node.js** and **npm**

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/email-spam-classifier.git
cd email-spam-classifier
