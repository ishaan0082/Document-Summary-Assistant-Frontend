// src/App.jsx

import React from 'react';
import { useFileProcessor } from './hooks/useFileProcessor';

// Import Components
import FileUploader from './components/features/Upload/FileUploader';
import FilePreview from './components/features/Upload/FilePreview';
import ExtractedTextView from './components/features/Extraction/ExtractedTextView';
import SummarySection from './components/features/Summary/SummarySection';
import ErrorDisplay from './components/common/ErrorDisplay';

function App() {
    const {
        file, previewUrl, extractedText, summaryLength, summary, keyPoints, loading, error,
        processFile, handleSummarize, handleGenerateKeyPoints, handleReset, setSummaryLength
    } = useFileProcessor();

    return (
        <>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap'); body { font-family: 'Sora', sans-serif; }`}</style>
            
            <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6 lg:p-8">
                <div className="container mx-auto">
                    <header className="text-center mb-8">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 text-transparent bg-clip-text">
                            DocuSynth AI
                        </h1>
                        <p className="mt-2 max-w-2xl mx-auto text-lg text-slate-400">
                            Your intelligent document summary assistant.
                        </p>
                    </header>
                    
                    <main>
                        <ErrorDisplay message={error} />

                        {!file ? (
                            <FileUploader onFileSelect={processFile} />
                        ) : (
                            <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                                <FilePreview 
                                    file={file} 
                                    previewUrl={previewUrl} 
                                    onReset={handleReset} 
                                />
                                <ExtractedTextView 
                                    text={extractedText} 
                                    isLoading={loading.extracting} 
                                />
                                <SummarySection
                                    summary={summary}
                                    keyPoints={keyPoints}
                                    summaryLength={summaryLength}
                                    setSummaryLength={setSummaryLength}
                                    onSummarize={handleSummarize}
                                    onGenerateKeyPoints={handleGenerateKeyPoints}
                                    loading={loading}
                                    hasExtractedText={!!extractedText && !loading.extracting}
                                />
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}

export default App;
