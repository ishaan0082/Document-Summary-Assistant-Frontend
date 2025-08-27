// src/api/geminiApi.js

// The backend server will run on port 3001
// const BACKEND_URL = 'http://localhost:3001';
const BACKEND_URL = 'https://document-summary-assistant-backend.onrender.com';

/**
 * Calls our secure backend to generate a summary.
 * @param {string} text - The text to be summarized.
 * @param {string} length - The desired summary length ('short', 'medium', 'long').
 * @returns {Promise<string>} The generated summary text.
 */
export const generateSummary = async (text, length) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/summarize`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, length }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Backend request failed');
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Summarization API Error:", error);
        throw error;
    }
};

/**
 * Calls our secure backend to extract key points.
 * @param {string} text - The text to extract key points from.
 * @returns {Promise<string>} A string containing bulleted key points.
 */
export const generateKeyPoints = async (text) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/key-points`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Backend request failed');
        }
        
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Key Points API Error:", error);
        throw error;
    }
};
