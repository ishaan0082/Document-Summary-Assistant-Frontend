// src/components/features/Extraction/ExtractedTextView.jsx

import React from 'react';
import LoadingIndicator from '../../common/LoadingIndicator';

const ExtractedTextView = ({ text, isLoading }) => (
    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col h-full">
        <h2 className="text-xl font-bold text-slate-100 mb-4 text-center">Extracted Text</h2>
        <div className="flex-1 bg-slate-900/50 rounded-lg p-4 overflow-y-auto max-h-[calc(100vh-300px)]">
            {isLoading ? (
                <LoadingIndicator text="Extracting text..." />
            ) : (
                <p className="text-slate-300 text-sm whitespace-pre-wrap font-mono">
                    {text || "No text extracted yet."}
                </p>
            )}
        </div>
    </div>
);

export default ExtractedTextView;
