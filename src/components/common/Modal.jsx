// src/components/common/Modal.jsx

import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        // Backdrop
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 sm:p-6 lg:p-8"
        >
            {/* Modal Content */}
            <div
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col p-4 border border-slate-700"
            >
                <div className="flex justify-end mb-2">
                    <button 
                        onClick={onClose} 
                        className="text-slate-500 hover:text-white transition-colors text-2xl font-bold leading-none"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>
                <div className="flex-1 overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
