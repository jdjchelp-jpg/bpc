'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, FileText, X, Download, Loader2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function MergePDF() {
    const [files, setFiles] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [mergedPdfUrl, setMergedPdfUrl] = useState(null);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        // Filter for PDF files only
        const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf');
        setFiles(prev => [...prev, ...pdfFiles]);
        setMergedPdfUrl(null); // Reset previous result
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setMergedPdfUrl(null);
    };

    const moveFile = (index, direction) => {
        if ((direction === -1 && index === 0) || (direction === 1 && index === files.length - 1)) return;

        const newFiles = [...files];
        const temp = newFiles[index];
        newFiles[index] = newFiles[index + direction];
        newFiles[index + direction] = temp;
        setFiles(newFiles);
        setMergedPdfUrl(null);
    };

    const mergePDFs = async () => {
        if (files.length < 2) return;

        setIsProcessing(true);
        try {
            const mergedPdf = await PDFDocument.create();

            for (const file of files) {
                const fileBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(fileBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setMergedPdfUrl(url);
        } catch (error) {
            console.error('Error merging PDFs:', error);
            alert('Failed to merge PDFs. Please try again with valid PDF files.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/tools/pdf" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to PDF Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Merge PDFs</h1>
                        <p className="text-gray-600">Combine multiple PDF files into one document. Drag and drop to reorder.</p>
                    </div>

                    <div className="p-8">
                        {/* Upload Area */}
                        <div className="mb-8">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-10 h-10 text-blue-500 mb-3" />
                                    <p className="text-sm text-blue-700 font-medium">Click to upload PDFs</p>
                                </div>
                                <input type="file" className="hidden" multiple accept=".pdf" onChange={handleFileChange} />
                            </label>
                        </div>

                        {/* File List */}
                        {files.length > 0 && (
                            <div className="space-y-3 mb-8">
                                {files.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 group">
                                        <div className="flex items-center overflow-hidden">
                                            <div className="bg-red-100 p-2 rounded-lg mr-3">
                                                <FileText className="w-5 h-5 text-red-500" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 truncate max-w-[200px] sm:max-w-xs">{file.name}</span>
                                            <span className="ml-2 text-xs text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => moveFile(index, -1)}
                                                disabled={index === 0}
                                                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                            >
                                                ↑
                                            </button>
                                            <button
                                                onClick={() => moveFile(index, 1)}
                                                disabled={index === files.length - 1}
                                                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                            >
                                                ↓
                                            </button>
                                            <button
                                                onClick={() => removeFile(index)}
                                                className="p-1 text-red-400 hover:text-red-600"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <button
                                onClick={mergePDFs}
                                disabled={files.length < 2 || isProcessing}
                                className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white flex items-center justify-center transition-all ${files.length < 2
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30'
                                    }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Merging...
                                    </>
                                ) : (
                                    'Merge PDFs'
                                )}
                            </button>

                            {mergedPdfUrl && (
                                <a
                                    href={mergedPdfUrl}
                                    download="merged-document.pdf"
                                    className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-green-700 bg-green-100 hover:bg-green-200 border border-green-200 flex items-center justify-center transition-all"
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    Download Merged PDF
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
