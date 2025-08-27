// src/hooks/useFileProcessor.js

import { useState, useCallback, useEffect } from 'react';
import { SUPPORTED_FILE_TYPES } from '../utils/constants';
import { generateSummary, generateKeyPoints } from '../api/geminiApi';

// Import the new libraries
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import Tesseract from 'tesseract.js';

// **FIX:** Point to the local worker file in the `public` directory
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

export const useFileProcessor = () => {
    // --- STATE MANAGEMENT ---
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [summaryLength, setSummaryLength] = useState('medium');
    const [summary, setSummary] = useState('');
    const [keyPoints, setKeyPoints] = useState('');
    const [loading, setLoading] = useState({ extracting: false, summarizing: false, generatingKeyPoints: false });
    const [error, setError] = useState('');
    const [extractionProgress, setExtractionProgress] = useState(0);

    // --- SIDE EFFECTS ---
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // --- CORE LOGIC ---
    const handleTextExtraction = useCallback(async (fileToProcess) => {
        setLoading(prev => ({ ...prev, extracting: true }));
        setError('');
        setExtractionProgress(0);
        setExtractedText('');

        try {
            if (fileToProcess.type === 'application/pdf') {
                const arrayBuffer = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.onerror = (err) => reject(err);
                    reader.readAsArrayBuffer(fileToProcess);
                });

                const pdf = await pdfjsLib.getDocument(new Uint8Array(arrayBuffer)).promise;
                let fullText = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    fullText += textContent.items.map(item => item.str).join(' ') + '\n';
                    setExtractionProgress(Math.round((i / pdf.numPages) * 100));
                }
                setExtractedText(fullText);

            } else if (fileToProcess.type.startsWith('image/')) {
                const result = await Tesseract.recognize(
                    fileToProcess, 'eng',
                    { logger: m => { if (m.status === 'recognizing text') setExtractionProgress(Math.round(m.progress * 100)); } }
                );
                setExtractedText(result.data.text);
            } else {
                throw new Error("Unsupported file type for extraction.");
            }
        } catch (err) {
            console.error("Extraction Error:", err);
            let errorMessage = `Failed to extract text. ${err.message}`;
            if (err.name === 'InvalidPDFException' || err.message.includes('PDF')) {
                errorMessage = `Failed to process PDF. The file might be corrupted, password-protected, or an image-based PDF.`;
            }
            setError(errorMessage);
        } finally {
            setLoading(prev => ({ ...prev, extracting: false }));
        }
    }, []);

    const handleReset = useCallback(() => {
        setFile(null);
        setExtractedText('');
        setSummaryLength('medium');
        setSummary('');
        setKeyPoints('');
        setError('');
        setLoading({ extracting: false, summarizing: false, generatingKeyPoints: false });
        setExtractionProgress(0);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        const fileInput = document.getElementById('file-upload');
        if (fileInput) fileInput.value = '';
    }, [previewUrl]);

    const processFile = useCallback((selectedFile) => {
        handleReset();
        if (!SUPPORTED_FILE_TYPES.includes(selectedFile.type)) {
            setError(`Unsupported file type. Please upload a PDF, JPG, PNG, or WEBP file.`);
            return;
        }
        setFile(selectedFile);
        if (selectedFile.type.startsWith('image/')) {
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
        handleTextExtraction(selectedFile);
    }, [handleReset, handleTextExtraction]);

    const handleSummarize = useCallback(async () => {
        if (!extractedText) { setError('No text to summarize.'); return; }
        setLoading(prev => ({ ...prev, summarizing: true }));
        setError('');
        setSummary('');
        try {
            const result = await generateSummary(extractedText, summaryLength);
            setSummary(result);
        } catch (err) {
            setError(`Failed to generate summary. ${err.message}`);
        } finally {
            setLoading(prev => ({ ...prev, summarizing: false }));
        }
    }, [extractedText, summaryLength]);

    const handleGenerateKeyPoints = useCallback(async () => {
        if (!extractedText) { setError('No text to process.'); return; }
        setLoading(prev => ({ ...prev, generatingKeyPoints: true }));
        setError('');
        setKeyPoints('');
        try {
            const result = await generateKeyPoints(extractedText);
            setKeyPoints(result);
        } catch (err) {
            setError(`Failed to generate key points. ${err.message}`);
        } finally {
            setLoading(prev => ({ ...prev, generatingKeyPoints: false }));
        }
    }, [extractedText]);

    return {
        file, previewUrl, extractedText, summaryLength, summary, keyPoints, loading, error, extractionProgress,
        processFile, handleSummarize, handleGenerateKeyPoints, handleReset, setSummaryLength, setError
    };
};
