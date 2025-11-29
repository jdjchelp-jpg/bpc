'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileJson, Copy, Check, Trash2, Minimize } from 'lucide-react';

export default function JsonFormatter() {
    const [input, setInput] = useState('');
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const formatJson = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed, null, 2));
            setError(null);
        } catch (e) {
            setError(e.message);
        }
    };

    const minifyJson = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed));
            setError(null);
        } catch (e) {
            setError(e.message);
        }
    };

    const clear = () => {
        setInput('');
        setError(null);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <Link href="/tools/dev" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dev Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[80vh]">
                    <div className="p-4 border-b border-gray-100 bg-yellow-50 flex justify-between items-center">
                        <div className="flex items-center">
                            <FileJson className="w-6 h-6 text-yellow-600 mr-2" />
                            <h1 className="text-xl font-bold text-yellow-900">JSON Formatter</h1>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={formatJson} className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 font-medium text-sm transition-colors">
                                Prettify
                            </button>
                            <button onClick={minifyJson} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm transition-colors flex items-center">
                                <Minimize className="w-3 h-3 mr-1" /> Minify
                            </button>
                            <button onClick={copyToClipboard} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium text-sm transition-colors flex items-center">
                                {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />} Copy
                            </button>
                            <button onClick={clear} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium text-sm transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <textarea
                            value={input}
                            onChange={(e) => { setInput(e.target.value); setError(null); }}
                            placeholder="Paste your JSON here..."
                            className={`w-full h-full p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 ${error ? 'bg-red-50' : 'bg-white'}`}
                            spellCheck="false"
                        />
                        {error && (
                            <div className="absolute bottom-0 left-0 right-0 bg-red-100 text-red-700 p-3 text-sm font-mono border-t border-red-200">
                                Error: {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
