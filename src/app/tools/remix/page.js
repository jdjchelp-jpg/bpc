'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, RefreshCw, Copy, Check, Crown, Sparkles } from 'lucide-react';
import PremiumGuard from '@/components/PremiumGuard';

export default function TextRemix() {
    const [inputText, setInputText] = useState('');
    const [style, setStyle] = useState('professional');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const styles = [
        { id: 'professional', name: 'Professional', desc: 'Formal and polished', icon: '👔' },
        { id: 'casual', name: 'Casual', desc: 'Friendly and relaxed', icon: '😎' },
        { id: 'funny', name: 'Funny', desc: 'Humorous and witty', icon: '😂' },
        { id: 'poetic', name: 'Poetic', desc: 'Artistic and flowery', icon: '🌹' },
        { id: 'pirate', name: 'Pirate', desc: 'Yarrr matey!', icon: '🏴‍☠️' },
        { id: 'shakespeare', name: 'Shakespearean', desc: 'Old English style', icon: '🎭' },
        { id: 'genz', name: 'Gen Z', desc: 'Modern slang and vibes', icon: '🧢' },
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
            <div className="max-w-5xl mx-auto">
                <Link href="/tools" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Tools
                </Link>

                <PremiumGuard>
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px] border border-gray-100">
                        {/* Input Section */}
                        <div className="w-full lg:w-5/12 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/50">
                            <div className="flex items-center mb-8">
                                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mr-4">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                                        Remix Station
                                        <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center shadow-sm">
                                            <Crown className="w-2 h-2 mr-1" /> PRO
                                        </span>
                                    </h1>
                                    <p className="text-sm text-gray-500 font-medium">Transform your text instantly.</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Original Text</label>
                                    <textarea
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        className="w-full p-4 border border-gray-200 rounded-2xl h-40 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm transition-all"
                                        placeholder="Paste your text here..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Select Style</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {styles.map((s) => (
                                            <button
                                                key={s.id}
                                                onClick={() => setStyle(s.id)}
                                                className={`p-3 text-left rounded-xl border transition-all duration-200 relative overflow-hidden group ${style === s.id
                                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md transform scale-[1.02]'
                                                    : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{s.icon}</span>
                                                    <div>
                                                        <div className={`font-bold text-sm ${style === s.id ? 'text-white' : 'text-gray-900'}`}>{s.name}</div>
                                                        <div className={`text-[10px] ${style === s.id ? 'text-indigo-200' : 'text-gray-400'}`}>{s.desc}</div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleRemix}
                                    disabled={loading || !inputText.trim()}
                                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform active:scale-[0.98]"
                                >
                                    {loading ? (
                                        <>
                                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                            Remixing Magic...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-5 h-5 mr-2 fill-current" />
                                            Remix Now
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Output Section */}
                        <div className="w-full lg:w-7/12 p-8 lg:p-10 bg-white flex flex-col relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-50 to-purple-50 rounded-bl-full -z-0 opacity-50" />

                            <div className="flex justify-between items-center mb-6 relative z-10">
                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Remixed Result</h2>
                                {result && (
                                    <button
                                        onClick={copyToClipboard}
                                        className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        {copied ? <Check className="w-4 h-4 mr-1.5" /> : <Copy className="w-4 h-4 mr-1.5" />}
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                )}
                            </div>

                            <div className="flex-1 bg-gray-50 rounded-3xl p-8 border border-gray-100 relative group transition-all duration-300 hover:shadow-inner">
                                {result ? (
                                    <div className="prose prose-lg max-w-none">
                                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">{result}</p>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
                                            <Zap className="w-8 h-8 opacity-20" />
                                        </div>
                                        <p className="font-medium">Your masterpiece awaits...</p>
                                        <p className="text-sm opacity-60 mt-2">Select a style and hit Remix!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </PremiumGuard>
            </div>
        </div>
    );
}
