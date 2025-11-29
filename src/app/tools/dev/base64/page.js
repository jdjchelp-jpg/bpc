'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Binary, ArrowRightLeft, Copy, Check } from 'lucide-react';

export default function Base64Tool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
    const [copied, setCopied] = useState(false);

    const process = (text, currentMode) => {
        try {
            if (!text) {
                setOutput('');
                return;
            }
            if (currentMode === 'encode') {
                setOutput(btoa(text));
            } else {
                setOutput(atob(text));
            }
        } catch (e) {
            setOutput('Invalid input for decoding');
        }
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInput(val);
        process(val, mode);
    };

    const toggleMode = () => {
        const newMode = mode === 'encode' ? 'decode' : 'encode';
        setMode(newMode);
        // Swap input/output logic if user wants to reverse operation on current data
        // But usually simpler to just clear or re-process current input with new mode
        process(input, newMode);
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
                    <div className="p-8 border-b border-gray-100 bg-blue-50">
                        <h1 className="text-3xl font-bold text-blue-900 mb-2">Base64 Converter</h1>
                        <p className="text-blue-700">Encode and decode data instantly.</p>
                    </div>

                    <div className="p-8">
                        <div className="flex justify-center mb-8">
                            <div className="bg-gray-100 p-1 rounded-xl flex">
                                <button
                                    onClick={() => { setMode('encode'); process(input, 'encode'); }}
                                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'encode' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Encode
                                </button>
                                <button
                                    onClick={() => { setMode('decode'); process(input, 'decode'); }}
                                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'decode' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Decode
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {mode === 'encode' ? 'Text Input' : 'Base64 Input'}
                                </label>
                                <textarea
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder={mode === 'encode' ? 'Type text to encode...' : 'Paste Base64 to decode...'}
                                    className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {mode === 'encode' ? 'Base64 Output' : 'Text Output'}
                                    </label>
                                    <button
                                        onClick={copyToClipboard}
                                        className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center"
                                    >
                                        {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                                        Copy
                                    </button>
                                </div>
                                <textarea
                                    readOnly
                                    value={output}
                                    placeholder="Result will appear here..."
                                    className="w-full h-64 p-4 bg-blue-50 border border-blue-100 rounded-xl focus:outline-none font-mono text-sm text-blue-900"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
