'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Sparkles, Copy, Check, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Summarizer() {
    const [input, setInput] = useState('');
    const [summary, setSummary] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [user, setUser] = useState(null);
    const [copied, setCopied] = useState(false);
    const [length, setLength] = useState('medium'); // short, medium, long

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    };

    const generateSummary = async () => {
        if (!input.trim()) return;
        setIsGenerating(true);

        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                alert('Please log in to use AI features.');
                setIsGenerating(false);
                return;
            }

            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
                    messages: [
                        {
                            role: 'system',
                            content: `You are an expert summarizer. Create a ${length} summary of the provided text. Capture the key points and main ideas clearly.`
                        },
                        {
                            role: 'user',
                            content: input
                        }
                    ]
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setSummary(data.choices[0].message.content);
        } catch (error) {
            console.error('AI Error:', error);
            alert('Failed to generate summary. ' + (error.message || ''));
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/tools/study" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Study Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                    {/* Input Side */}
                    <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                <FileText className="w-5 h-5 mr-2 text-indigo-500" />
                                Source Text
                            </h2>
                            <div className="flex space-x-2">
                                {['short', 'medium', 'long'].map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setLength(l)}
                                        className={`text-xs px-2 py-1 rounded capitalize ${length === l ? 'bg-indigo-100 text-indigo-700 font-bold' : 'bg-gray-100 text-gray-600'}`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Paste your notes, article, or text here..."
                            className="flex-1 w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all mb-4"
                        />
                        <button
                            onClick={generateSummary}
                            disabled={!input.trim() || isGenerating}
                            className={`w-full py-3 rounded-xl font-bold text-white flex items-center justify-center transition-all ${!input.trim() || isGenerating
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30'
                                }`}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Summarizing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Summarize
                                </>
                            )}
                        </button>
                        {!user && (
                            <p className="text-xs text-center text-red-500 mt-2">Login required for AI features</p>
                        )}
                    </div>

                    {/* Output Side */}
                    <div className="w-full md:w-1/2 p-6 bg-indigo-50 flex flex-col">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-indigo-900">Summary</h2>
                            {summary && (
                                <button
                                    onClick={copyToClipboard}
                                    className="text-indigo-600 hover:text-indigo-800 text-xs font-medium flex items-center bg-white px-3 py-1 rounded-lg shadow-sm"
                                >
                                    {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                                    Copy
                                </button>
                            )}
                        </div>

                        {summary ? (
                            <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-indigo-100 overflow-y-auto prose prose-indigo max-w-none">
                                <div className="whitespace-pre-wrap text-gray-800">{summary}</div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-indigo-300">
                                <FileText className="w-16 h-16 mb-4 opacity-50" />
                                <p className="text-center">Your summary will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
