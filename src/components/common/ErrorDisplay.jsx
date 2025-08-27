// src/components/common/ErrorDisplay.jsx

import React from 'react';

const ErrorDisplay = ({ message }) => {
    if (!message) return null;

    return (
        <div className="w-full max-w-4xl mx-auto my-4 p-4 bg-red-900/50 border border-red-500/30 text-red-300 rounded-lg text-center">
            <p className="font-semibold">An Error Occurred</p>
            <p className="text-sm">{message}</p>
        </div>
    );
};

export default ErrorDisplay;
