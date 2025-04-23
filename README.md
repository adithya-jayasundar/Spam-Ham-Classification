# Email Spam Classifier - Local Deployment

This project is a **local web application** that classifies email messages as **Spam** or **Ham** (non-spam) using machine learning models. The backend is powered by **Flask** (Python), and the frontend is built using **React**. The app allows users to paste email content and get predictions for whether the message is spam or not, along with the corresponding probability.

## Features

- **Text Input**: Users can paste an email message or content for classification.
- **Model Selection**: Users can choose between **Naive Bayes**, **Decision Tree**, or **SVM** models for classification.
- **Theme Toggle**: Toggle between **light** and **dark** modes for the UI.
- **Probability Display**: Shows the probability of the message being **Ham** or **Spam**.
- **Ring Visualization**: A visual representation of the classification result using a circular progress bar.

## Tech Stack

### Frontend:
- **React** for the UI
- **Framer Motion** for animations
- **Lucide-React** icons
- **Tailwind CSS** for styling

### Backend:
- **Flask** for creating the REST API
- **Scikit-learn** for machine learning models (Naive Bayes, Decision Tree, SVM)
- **TensorFlow** for any model-based predictions (if required)
- **Flask-CORS** to manage cross-origin resource sharing between frontend and backend

## Requirements

- **Python 3.x**
- **Node.js** and **npm**

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/email-spam-classifier.git
cd email-spam-classifier
