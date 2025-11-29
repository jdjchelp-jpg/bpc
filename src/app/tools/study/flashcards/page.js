'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Brain, Sparkles, Loader2, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Flashcards() {
    const [input, setInput] = useState('');
    const [cards, setCards] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [user, setUser] = useState(null);
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    };

    const generateCards = async () => {
        if (!input.trim()) return;
        setIsGenerating(true);
        setCards([]);

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
                            content: `You are a flashcard generator. Create 5-10 flashcards from the provided text. 
              Return ONLY a JSON array of objects with "question" and "answer" keys. 
              Example: [{"question": "What is X?", "answer": "X is Y."}]`
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

            let content = data.choices[0].message.content;
            // Clean up markdown code blocks if present
            content = content.replace(/```json/g, '').replace(/```/g, '').trim();

            const generatedCards = JSON.parse(content);
            setCards(generatedCards);
            setCurrentCard(0);
            setIsFlipped(false);

        } catch (error) {
            console.error('AI Error:', error);
            alert('Failed to generate flashcards. ' + (error.message || ''));
        } finally {
            setIsGenerating(false);
        }
    };

    const nextCard = () => {
        if (currentCard < cards.length - 1) {
            setCurrentCard(prev => prev + 1);
            setIsFlipped(false);
        }
    };

    const prevCard = () => {
        if (currentCard > 0) {
            setCurrentCard(prev => prev - 1);
            setIsFlipped(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/tools/study" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Study Tools
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col h-[600px]">
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                <Brain className="w-5 h-5 mr-2 text-pink-500" />
                                Source Material
                            </h2>
                            <p className="text-sm text-gray-500">Paste notes to create flashcards.</p>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Paste your text here..."
                            className="flex-1 w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none transition-all mb-4"
                        />
                        <button
                            onClick={generateCards}
                            disabled={!input.trim() || isGenerating}
                            className={`w-full py-3 rounded-xl font-bold text-white flex items-center justify-center transition-all ${!input.trim() || isGenerating
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-pink-600 hover:bg-pink-700 shadow-lg hover:shadow-pink-500/30'
                                }`}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Create Flashcards
                                </>
                            )}
                        </button>
                    </div>

                    {/* Card Section */}
                    <div className="flex flex-col h-[600px]">
                        {cards.length > 0 ? (
                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-center mb-4 text-gray-600 font-medium">
                                    <span>Card {currentCard + 1} of {cards.length}</span>
                                    <button onClick={() => setIsFlipped(!isFlipped)} className="text-pink-600 hover:text-pink-700 flex items-center text-sm">
                                        <RotateCw className="w-4 h-4 mr-1" /> Flip
                                    </button>
                                </div>

                                <div
                                    className="flex-1 perspective-1000 cursor-pointer group relative"
                                    onClick={() => setIsFlipped(!isFlipped)}
                                >
                                    <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                                        {/* Front */}
                                        <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-center border-2 border-pink-100">
                                            <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-4">Question</p>
                                            <p className="text-2xl font-medium text-gray-900">{cards[currentCard].question}</p>
                                        </div>

                                        {/* Back */}
                                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-pink-600 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-center text-white">
                                            <p className="text-xs font-bold text-pink-200 uppercase tracking-widest mb-4">Answer</p>
                                            <p className="text-xl font-medium">{cards[currentCard].answer}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-6">
                                    <button
                                        onClick={prevCard}
                                        disabled={currentCard === 0}
                                        className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronLeft className="w-6 h-6 text-gray-600" />
                                    </button>
                                    <button
                                        onClick={nextCard}
                                        disabled={currentCard === cards.length - 1}
                                        className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronRight className="w-6 h-6 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                                <Brain className="w-16 h-16 mb-4 opacity-50" />
                                <p className="text-lg font-medium">No cards yet</p>
                                <p className="text-sm">Enter text and click generate to start studying.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
        </div>
    );
}
