// src/components/features/Summary/SummarySection.jsx

import React, { useState } from 'react';
import LoadingIndicator from '../../common/LoadingIndicator';

const SummarySection = ({
    summary,
    keyPoints,
    summaryLength,
    setSummaryLength,
    onSummarize,
    onGenerateKeyPoints,
    loading,
    hasExtractedText
}) => {
    const [activeTab, setActiveTab] = useState('summary');

    const renderContent = () => {
        if (activeTab === 'summary') {
            if (loading.summarizing) return <LoadingIndicator text="Generating summary..." />;
            if (summary) return <div className="prose prose-invert prose-sm max-w-none text-slate-300">{summary}</div>;
            return <p className="text-slate-500 text-center text-sm pt-8">{hasExtractedText ? "Select a length and click 'Generate Summary'." : "Waiting for document text..."}</p>;
        }
        if (activeTab === 'keyPoints') {
            if (loading.generatingKeyPoints) return <LoadingIndicator text="Extracting key points..." />;
            if (keyPoints) return <div className="prose prose-invert prose-sm max-w-none text-slate-300 whitespace-pre-wrap">{keyPoints}</div>;
            return <p className="text-slate-500 text-center text-sm pt-8">{hasExtractedText ? "Click 'Extract Key Points'." : "Waiting for document text..."}</p>;
        }
    };

    return (
        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col h-full">
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-700 mb-4">
                <button
                    onClick={() => setActiveTab('summary')}
                    className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'summary' ? 'text-violet-400 border-b-2 border-violet-400' : 'text-slate-400 hover:text-white'}`}
                >
                    AI Summary
                </button>
                <button
                    onClick={() => setActiveTab('keyPoints')}
                    className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'keyPoints' ? 'text-violet-400 border-b-2 border-violet-400' : 'text-slate-400 hover:text-white'}`}
                >
                    Key Points
                </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                {activeTab === 'summary' && (
                    <div className="w-full sm:w-auto">
                        <label htmlFor="summary-length" className="block text-xs font-medium text-slate-400 mb-1">Length</label>
                        <select
                            id="summary-length"
                            value={summaryLength}
                            onChange={(e) => setSummaryLength(e.target.value)}
                            className="w-full bg-slate-900 border-slate-600 text-slate-300 rounded-md focus:ring-violet-500 focus:border-violet-500 transition text-sm p-2"
                            disabled={!hasExtractedText}
                        >
                            <option value="short">Short</option>
                            <option value="medium">Medium</option>
                            <option value="long">Long</option>
                        </select>
                    </div>
                )}
                <button
                    onClick={activeTab === 'summary' ? onSummarize : onGenerateKeyPoints}
                    disabled={loading.summarizing || loading.generatingKeyPoints || !hasExtractedText}
                    className="w-full sm:w-auto px-5 py-2 font-semibold rounded-md text-white bg-violet-600 hover:bg-violet-700 disabled:bg-violet-900/50 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-violet-600/20 hover:shadow-xl hover:shadow-violet-600/30"
                >
                    {activeTab === 'summary'
                        ? (loading.summarizing ? 'Generating...' : 'Generate Summary')
                        : (loading.generatingKeyPoints ? 'Extracting...' : 'Extract Key Points')}
                </button>
            </div>

            {/* Result Area */}
            <div className="flex-1 bg-slate-900/50 rounded-lg p-4 overflow-y-auto min-h-[200px]">
                {renderContent()}
            </div>
        </div>
    );
};

export default SummarySection;
