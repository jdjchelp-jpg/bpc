'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Copy, Check } from 'lucide-react';

export default function HashGenerator() {
    const [input, setInput] = useState('');
    const [hashes, setHashes] = useState({
        'SHA-1': '',
        'SHA-256': '',
        'SHA-384': '',
        'SHA-512': ''
    });
    const [copied, setCopied] = useState(null);

    useEffect(() => {
        generateHashes(input);
    }, [input]);

    const generateHashes = async (text) => {
        if (!text) {
            setHashes({ 'SHA-1': '', 'SHA-256': '', 'SHA-384': '', 'SHA-512': '' });
            return;
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(text);

        const algos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
        const newHashes = {};

        for (const algo of algos) {
            try {
                const hashBuffer = await crypto.subtle.digest(algo, data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                newHashes[algo] = hashHex;
            } catch (e) {
                newHashes[algo] = 'Error';
            }
        }

        setHashes(newHashes);
    };

    const copyToClipboard = (text, algo) => {
        navigator.clipboard.writeText(text);
        setCopied(algo);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/tools/dev" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dev Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-red-50">
                        <h1 className="text-3xl font-bold text-red-900 mb-2">Hash Generator</h1>
                        <p className="text-red-700">Calculate SHA-1, SHA-256, and other secure hashes.</p>
                    </div>

                    <div className="p-8">
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Input Text</label>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type something to hash..."
                                className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                            />
                        </div>

                        <div className="space-y-6">
                            {Object.entries(hashes).map(([algo, hash]) => (
                                <div key={algo}>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-sm font-medium text-gray-700">{algo}</label>
                                        {hash && (
                                            <button
                                                onClick={() => copyToClipboard(hash, algo)}
                                                className="text-red-600 hover:text-red-800 text-xs font-medium flex items-center"
                                            >
                                                {copied === algo ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                                                Copy
                                            </button>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <input
                                            readOnly
                                            value={hash}
                                            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-600 focus:outline-none"
                                            placeholder="..."
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
