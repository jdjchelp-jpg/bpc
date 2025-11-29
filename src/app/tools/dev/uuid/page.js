'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Fingerprint, Copy, Check, RefreshCw } from 'lucide-react';

export default function UuidGenerator() {
    const [uuids, setUuids] = useState([]);
    const [count, setCount] = useState(1);
    const [copied, setCopied] = useState(null);

    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const generate = () => {
        const newUuids = [];
        for (let i = 0; i < count; i++) {
            newUuids.push(generateUUID());
        }
        setUuids(newUuids);
        setCopied(null);
    };

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopied(index);
        setTimeout(() => setCopied(null), 2000);
    };

    const copyAll = () => {
        navigator.clipboard.writeText(uuids.join('\n'));
        setCopied('all');
        setTimeout(() => setCopied(null), 2000);
    };

    // Generate one on load
    React.useEffect(() => {
        generate();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/tools/dev" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dev Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-purple-50">
                        <h1 className="text-3xl font-bold text-purple-900 mb-2">UUID Generator</h1>
                        <p className="text-purple-700">Generate random version 4 UUIDs.</p>
                    </div>

                    <div className="p-8">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={count}
                                    onChange={(e) => setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                                    className="block w-full px-4 py-3 border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <button
                                onClick={generate}
                                className="mt-7 px-8 py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-500/30 flex items-center transition-all"
                            >
                                <RefreshCw className="w-5 h-5 mr-2" />
                                Generate
                            </button>
                        </div>

                        {uuids.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-500">Results</span>
                                    {uuids.length > 1 && (
                                        <button
                                            onClick={copyAll}
                                            className="text-purple-600 hover:text-purple-800 text-xs font-medium flex items-center"
                                        >
                                            {copied === 'all' ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                                            Copy All
                                        </button>
                                    )}
                                </div>
                                {uuids.map((uuid, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200 group hover:border-purple-300 transition-all">
                                        <span className="font-mono text-gray-800">{uuid}</span>
                                        <button
                                            onClick={() => copyToClipboard(uuid, index)}
                                            className="text-gray-400 hover:text-purple-600 transition-colors p-2"
                                            title="Copy"
                                        >
                                            {copied === index ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
