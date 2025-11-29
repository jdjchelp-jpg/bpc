'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Type, Download, Loader2 } from 'lucide-react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export default function TextToPDF() {
    const [text, setText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);

    const generatePDF = async () => {
        if (!text.trim()) return;

        setIsProcessing(true);
        try {
            const pdfDoc = await PDFDocument.create();
            const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

            const page = pdfDoc.addPage();
            const { width, height } = page.getSize();
            const fontSize = 12;
            const margin = 50;
            const lineHeight = fontSize * 1.2;
            const maxWidth = width - (margin * 2);

            // Simple text wrapping logic
            const words = text.split(' ');
            let line = '';
            let y = height - margin;

            let currentPage = page;

            for (const word of words) {
                const testLine = line + word + ' ';
                const textWidth = timesRomanFont.widthOfTextAtSize(testLine, fontSize);

                if (textWidth > maxWidth) {
                    currentPage.drawText(line, {
                        x: margin,
                        y: y,
                        size: fontSize,
                        font: timesRomanFont,
                        color: rgb(0, 0, 0),
                    });
                    line = word + ' ';
                    y -= lineHeight;

                    if (y < margin) {
                        currentPage = pdfDoc.addPage();
                        y = height - margin;
                    }
                } else {
                    line = testLine;
                }
            }

            // Draw last line
            currentPage.drawText(line, {
                x: margin,
                y: y,
                size: fontSize,
                font: timesRomanFont,
                color: rgb(0, 0, 0),
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/tools/pdf" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to PDF Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row h-[800px] md:h-[600px]">
                    {/* Input Side */}
                    <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                <Type className="w-5 h-5 mr-2 text-purple-500" />
                                Input Text
                            </h2>
                            <span className="text-xs text-gray-400">{text.length} chars</span>
                        </div>
                        <textarea
                            value={text}
                            onChange={(e) => { setText(e.target.value); setPdfUrl(null); }}
                            placeholder="Type or paste your text here..."
                            className="flex-1 w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all"
                        />
                    </div>

                    {/* Preview/Action Side */}
                    <div className="w-full md:w-1/2 p-6 bg-gray-50 flex flex-col items-center justify-center">
                        {pdfUrl ? (
                            <div className="text-center w-full h-full flex flex-col">
                                <div className="flex-1 bg-white shadow-lg rounded-lg mb-6 w-full border border-gray-200 flex items-center justify-center relative overflow-hidden group">
                                    <iframe src={pdfUrl} className="w-full h-full" title="PDF Preview" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                        <p className="text-white font-medium">Preview Ready</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setPdfUrl(null)}
                                        className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all"
                                    >
                                        Edit Text
                                    </button>
                                    <a
                                        href={pdfUrl}
                                        download="generated-document.pdf"
                                        className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-500/30 flex items-center justify-center transition-all"
                                    >
                                        <Download className="w-5 h-5 mr-2" />
                                        Download
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center max-w-xs">
                                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileText className="w-10 h-10 text-purple-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Convert</h3>
                                <p className="text-gray-600 mb-8">Enter your text on the left to generate a clean, formatted PDF document.</p>
                                <button
                                    onClick={generatePDF}
                                    disabled={!text.trim() || isProcessing}
                                    className={`w-full px-8 py-4 rounded-xl font-bold text-white flex items-center justify-center transition-all ${!text.trim()
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-500/30'
                                        }`}
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        'Generate PDF'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
