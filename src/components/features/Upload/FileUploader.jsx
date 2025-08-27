// src/components/features/Upload/FileUploader.jsx

import React, { useState, useCallback } from 'react';
import { SUPPORTED_FILE_TYPES } from '../../../utils/constants';

const UploadIcon = () => <svg className="w-16 h-16 text-slate-600 group-hover:text-violet-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>;

const FileUploader = ({ onFileSelect }) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) onFileSelect(selectedFile);
    };

    const handleDragEnter = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); }, []);
    const handleDragLeave = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(false); }, []);
    const handleDragOver = useCallback((e) => { e.preventDefault(); e.stopPropagation(); }, []);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            onFileSelect(droppedFiles[0]);
        }
    }, [onFileSelect]);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div 
                className={`group relative p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-300 ${isDragOver ? 'border-violet-500 bg-slate-800' : 'border-slate-700 hover:border-violet-600 hover:bg-slate-800/60'}`}
                onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
            >
                <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept={SUPPORTED_FILE_TYPES.join(',')} />
                <div className="flex flex-col items-center justify-center space-y-4">
                    <UploadIcon />
                    <p className="text-slate-400"><span className="font-semibold text-violet-400">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-slate-500">PDF, PNG, JPG, or WEBP</p>
                </div>
            </div>
        </div>
    );
};

export default FileUploader;
