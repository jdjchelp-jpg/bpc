'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, ArrowRightLeft, Copy, Check } from 'lucide-react';

export default function HtmlEscape() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('escape'); // 'escape' or 'unescape'
    const [copied, setCopied] = useState(false);

    const process = (text, currentMode) => {
        if (!text) {
            setOutput('');
            return;
        }

        if (currentMode === 'escape') {
            setOutput(text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;"));
        } else {
            setOutput(text
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, "\"")
                .replace(/&#039;/g, "'"));
        }
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInput(val);
        process(val, mode);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/tools/dev" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dev Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-green-50">
                        <h1 className="text-3xl font-bold text-green-900 mb-2">HTML Escape / Unescape</h1>
                        <p className="text-green-700">Convert special characters to HTML entities and back.</p>
                    </div>

                    <div className="p-8">
                        <div className="flex justify-center mb-8">
                            <div className="bg-gray-100 p-1 rounded-xl flex">
                                <button
                                    onClick={() => { setMode('escape'); process(input, 'escape'); }}
                                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'escape' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Escape
                                </button>
                                <button
                                    onClick={() => { setMode('unescape'); process(input, 'unescape'); }}
                                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'unescape' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Unescape
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Input
                                </label>
                                <textarea
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder={mode === 'escape' ? '<div>Hello</div>' : '&lt;div&gt;Hello&lt;/div&gt;'}
                                    className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none font-mono text-sm"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Output
                                    </label>
                                    <button
                                        onClick={copyToClipboard}
                                        className="text-green-600 hover:text-green-800 text-xs font-medium flex items-center"
                                    >
                                        {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                                        Copy
                                    </button>
                                </div>
                                <textarea
                                    readOnly
                                    value={output}
                                    placeholder="Result will appear here..."
                                    className="w-full h-64 p-4 bg-green-50 border border-green-100 rounded-xl focus:outline-none font-mono text-sm text-green-900"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
