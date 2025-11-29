'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, QrCode, Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

export default function QRCodeGenerator() {
    const [text, setText] = useState('https://example.com');
    const [size, setSize] = useState(256);
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');

    const downloadQR = () => {
        const canvas = document.getElementById('qr-canvas');
        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/tools/tiny" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Tiny Apps
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                    {/* Controls */}
                    <div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <QrCode className="w-6 h-6 mr-2 text-gray-700" />
                            QR Generator
                        </h1>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-xl h-32 resize-none"
                                    placeholder="Enter URL or text..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <span className="text-xs text-gray-500 mb-1 block">Foreground</span>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="color"
                                                value={fgColor}
                                                onChange={(e) => setFgColor(e.target.value)}
                                                className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-xs text-gray-500 mb-1 block">Background</span>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="color"
                                                value={bgColor}
                                                onChange={(e) => setBgColor(e.target.value)}
                                                className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-white">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
                            <QRCodeCanvas
                                id="qr-canvas"
                                value={text}
                                size={size}
                                bgColor={bgColor}
                                fgColor={fgColor}
                                level={"H"}
                                includeMargin={true}
                            />
                        </div>

                        <button
                            onClick={downloadQR}
                            className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center shadow-lg"
                        >
                            <Download className="w-5 h-5 mr-2" />
                            Download PNG
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
