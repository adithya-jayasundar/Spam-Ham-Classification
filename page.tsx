'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, MailCheck } from 'lucide-react';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [probabilities, setProbabilities] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [model, setModel] = useState('naive_bayes');

  const handleSubmit = async () => {
    if (!text.trim()) {
      setResult('Please enter a message.');
      return;
    }

    setLoading(true);
    setResult('');
    setProbabilities(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, model }),
      });

      if (!response.ok) throw new Error('Failed to fetch prediction');

      const data = await response.json();
      setResult(data.prediction);
      setProbabilities(data.probabilities);
    } catch (error) {
      console.error(error);
      setResult('Error: backend issue.');
    } finally {
      setLoading(false);
    }
  };

  const getRingColor = () => {
    if (result === 'Spam') return '#f87171';
    if (result === 'Ham') return '#34d399';
    return '#facc15';
  };

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-8 transition-all duration-300 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
          : 'bg-gradient-to-br from-blue-100 via-white to-blue-200 text-black'
      }`}
    >
      <div className={`w-full max-w-3xl p-6 rounded-2xl shadow-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white/90 backdrop-blur'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-2">
            <MailCheck className="w-8 h-8 text-blue-500" />
            Spam Classifier
          </h1>
          <button
            className="p-2 rounded-full hover:bg-gray-700 transition"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>

        <textarea
          className={`w-full p-4 text-base border rounded-lg resize-none focus:outline-none focus:ring-2 
          ${darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-white text-black border-gray-300 focus:ring-blue-600'}`}
          rows={6}
          placeholder="Paste your email or message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select
          className="w-full p-4 mt-4 text-base border rounded-lg bg-white text-black border-gray-300 focus:ring-blue-600"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="naive_bayes">Naive Bayes</option>
          <option value="decision_tree">Decision Tree</option>
          <option value="svm">SVM</option>
        </select>

        <button
          className="mt-4 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check Message'}
        </button>

        {result && (
          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl font-bold">
              Result:{' '}
              <span className={result === 'Spam' ? 'text-red-400' : 'text-green-400'}>
                {result}
              </span>
            </p>

            {probabilities && (
              <div className="w-full px-8 text-sm text-center">
                <div className="mb-2">Ham Probability: <strong>{(probabilities.Ham * 100).toFixed(2)}%</strong></div>
                <div className="w-full bg-gray-300 rounded h-3 mb-4">
                  <div
                    className="bg-green-500 h-3 rounded"
                    style={{ width: `${probabilities.Ham * 100}%` }}
                  />
                </div>

                <div className="mb-2">Spam Probability: <strong>{(probabilities.Spam * 100).toFixed(2)}%</strong></div>
                <div className="w-full bg-gray-300 rounded h-3">
                  <div
                    className="bg-red-500 h-3 rounded"
                    style={{ width: `${probabilities.Spam * 100}%` }}
                  />
                </div>
              </div>
            )}

            <div className="relative w-40 h-40">
              <svg className="transform -rotate-90" width="160" height="160">
                <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="15" fill="none" />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke={getRingColor()}
                  strokeWidth="15"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={0}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
