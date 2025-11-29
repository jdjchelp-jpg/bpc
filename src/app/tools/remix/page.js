'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, RefreshCw, Copy, Check } from 'lucide-react';
import PremiumGuard from '@/components/PremiumGuard';

export default function TextRemix() {
    const [inputText, setInputText] = useState('');
    const [style, setStyle] = useState('professional');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const styles = [
        { id: 'professional', name: 'Professional', desc: 'Formal and polished' },
        { id: 'casual', name: 'Casual', desc: 'Friendly and relaxed' },
        { id: 'funny', name: 'Funny', desc: 'Humorous and witty' },
        { id: 'poetic', name: 'Poetic', desc: 'Artistic and flowery' },
        { id: 'pirate', name: 'Pirate', desc: 'Yarrr matey!' },
        { id: 'shakespeare', name: 'Shakespearean', desc: 'Old English style' },
        { id: 'genz', name: 'Gen Z', desc: 'Modern slang and vibes' },
    ];

    const handleRemix = async () => {
        if (!inputText.trim()) return;
        setLoading(true);
        setResult('');

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'system',
                            content: `You are a text remixing expert. Rewrite the user's text in the '${style}' style. Return ONLY the rewritten text. Do not include quotes or explanations.`
                        },
                        { role: 'user', content: inputText }
                    ]
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);
            setResult(data.message);
        } catch (error) {
            console.error('Error:', error);
            setResult('Failed to remix text. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </Link>

                <PremiumGuard>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                        {/* Input Section */}
                        <div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50">
                            <div className="flex items-center mb-6">
                                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                                    <Zap className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Text Remix</h1>
                                    <p className="text-sm text-gray-500">Rewrite anything, any way.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Text</label>
                                    <textarea
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        className="w-full p-4 border border-gray-300 rounded-xl h-40 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Enter text to rewrite..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Choose Style</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {styles.map((s) => (
                                            <button
                                                key={s.id}
                                                onClick={() => setStyle(s.id)}
                                                className={`p-3 text-left rounded-lg border transition-all ${style === s.id
                                                        ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500'
                                                        : 'bg-white border-gray-200 hover:border-indigo-300'
                                                    }`}
                                            >
                                                <div className="font-medium text-gray-900">{s.name}</div>
                                                <div className="text-xs text-gray-500">{s.desc}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleRemix}
                                    disabled={loading || !inputText.trim()}
                                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                                >
                                    {loading ? (
                                        <>
                                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                            Remixing...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-5 h-5 mr-2" />
                                            Remix Text
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Output Section */}
                        <div className="w-full md:w-1/2 p-8 bg-white flex flex-col">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Result</h2>

                            <div className="flex-1 bg-gray-50 rounded-xl p-6 border border-gray-100 relative group">
                                {result ? (
                                    <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">{result}</p>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                        <Zap className="w-12 h-12 mb-4 opacity-20" />
                                        <p>Your remixed text will appear here</p>
                                    </div>
                                )}

                                {result && (
                                    <button
                                        onClick={copyToClipboard}
                                        className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-500 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </PremiumGuard>
            </div>
        </div>
    );
}
