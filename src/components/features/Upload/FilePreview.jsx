// src/components/features/Upload/FilePreview.jsx

import React from 'react';

// --- SVG Icons ---
const PdfIcon = () => <svg className="w-12 h-12 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const ImageIcon = () => <svg className="w-12 h-12 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>;
const ResetIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const PreviewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>;

const FilePreview = ({ file, previewUrl, onReset, onPreview }) => (
    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col h-full">
        <h2 className="text-xl font-bold text-slate-100 mb-4 text-center">Document</h2>
        <div className="flex-1 flex flex-col items-center justify-center text-center bg-slate-900/50 rounded-lg p-4 min-h-[200px]">
            {previewUrl && file?.type.startsWith('image/') ? (
                <img src={previewUrl} alt="File preview" className="max-h-[calc(100vh-400px)] w-auto object-contain rounded-lg shadow-2xl shadow-black/50" />
            ) : (
                <div className="space-y-4">
                    {file?.type === 'application/pdf' ? <PdfIcon /> : <ImageIcon />}
                    <h3 className="text-lg font-semibold text-slate-300">Document Loaded</h3>
                    <p className="text-sm text-slate-500">Click the eye icon to preview.</p>
                </div>
            )}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400 truncate pr-4">{file.name}</span>
            <div className="flex items-center gap-3">
                 <button
                    onClick={onPreview}
                    className="text-slate-400 hover:text-violet-400 transition-colors flex-shrink-0"
                    title="Preview file"
                >
                    <PreviewIcon />
                </button>
                <button 
                    onClick={onReset} 
                    className="text-slate-500 hover:text-red-400 transition-colors flex-shrink-0"
                    title="Remove file"
                >
                    <ResetIcon />
                </button>
            </div>
        </div>
    </div>
);

export default FilePreview;
