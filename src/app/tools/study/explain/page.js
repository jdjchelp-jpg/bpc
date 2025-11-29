'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, Sparkles, Loader2, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ExplainThis() {
    const [input, setInput] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [level, setLevel] = useState('simple'); // simple, detailed, analogy
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    };

    const generateExplanation = async () => {
        if (!input.trim()) return;
        setIsGenerating(true);

        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                alert('Please log in to use AI features.');
                setIsGenerating(false);
                return;
            }

            let prompt = '';
            if (level === 'simple') prompt = 'Explain this concept simply, like I am 10 years old.';
            if (level === 'detailed') prompt = 'Provide a detailed, academic explanation of this concept.';
            if (level === 'analogy') prompt = 'Explain this concept using a creative analogy.';

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
                            content: `You are an expert tutor. ${prompt}`
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

            setExplanation(data.choices[0].message.content);
        } catch (error) {
            console.error('AI Error:', error);
            alert('Failed to generate explanation. ' + (error.message || ''));
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/tools/study" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Study Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-teal-50">
                        <h1 className="text-3xl font-bold text-teal-900 mb-2">Explain This</h1>
                        <p className="text-teal-700">Get clear explanations for any confusing topic.</p>
                    </div>

                    <div className="p-8">
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">What do you want explained?</label>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="e.g., Quantum Entanglement, The French Revolution, How a car engine works..."
                                className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                onClick={() => setLevel('simple')}
                                className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${level === 'simple' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-gray-200 text-gray-600 hover:border-teal-200'
                                    }`}
                            >
                                Simple (EL15)
                            </button>
                            <button
                                onClick={() => setLevel('detailed')}
                                className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${level === 'detailed' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-gray-200 text-gray-600 hover:border-teal-200'
                                    }`}
                            >
                                Detailed
                            </button>
                            <button
                                onClick={() => setLevel('analogy')}
                                className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${level === 'analogy' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-gray-200 text-gray-600 hover:border-teal-200'
                                    }`}
                            >
                                Use Analogy
                            </button>
                        </div>

                        <button
                            onClick={generateExplanation}
                            disabled={!input.trim() || isGenerating}
                            className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center transition-all mb-8 ${!input.trim() || isGenerating
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-teal-500/30'
                                }`}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Explaining...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Explain It
                                </>
                            )}
                        </button>

                        {explanation && (
                            <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100 relative">
                                <div className="absolute top-6 left-6">
                                    <MessageCircle className="w-6 h-6 text-teal-500" />
                                </div>
                                <div className="pl-10 prose prose-teal max-w-none">
                                    <div className="whitespace-pre-wrap text-gray-800">{explanation}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
