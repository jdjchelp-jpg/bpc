'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Cookie } from 'lucide-react';
import PremiumGuard from '@/components/PremiumGuard';

export default function FortuneCookie() {
    const [fortune, setFortune] = useState(null);
    const [isCracked, setIsCracked] = useState(false);

    const fortunes = [
        "A beautiful, smart, and loving person will be coming into your life.",
        "Your life will be happy and peaceful.",
        "Friends are the most important part of your life.",
        "A fresh start will put you on your way.",
        "Believe in yourself and others will too.",
        "Your creativity will lead you to success.",
        "Adventure can be real happiness.",
        "A smile is your passport into the hearts of others.",
        "Hard work pays off in the future, laziness pays off now.",
        "You will have a pleasant surprise.",
        "Keep your eye out for someone special.",
        "A thrilling time is in your near future.",
        "Plan for many pleasures ahead.",
        "Your ability for accomplishment will follow with success."
    ];

    const crackCookie = () => {
        if (isCracked) {
            // Reset
            setIsCracked(false);
            setFortune(null);
        } else {
            // Crack
            const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            setFortune(randomFortune);
            setIsCracked(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/tools/fun" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Fun Tools
                </Link>

                <PremiumGuard>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-gray-100 bg-yellow-50">
                            <h1 className="text-3xl font-bold text-yellow-900 mb-2">Digital Fortune Cookie</h1>
                            <p className="text-yellow-700">Crack open a cookie to reveal your destiny.</p>
                        </div>

                        <div className="p-12 flex flex-col items-center justify-center min-h-[400px]">
                            <button
                                onClick={crackCookie}
                                className={`transform transition-all duration-500 ${isCracked ? 'scale-90 opacity-50' : 'hover:scale-105'}`}
                            >
                                <Cookie className={`w-48 h-48 text-yellow-600 ${isCracked ? 'hidden' : 'block'}`} />
                                {isCracked && (
                                    <div className="flex gap-2">
                                        <Cookie className="w-24 h-24 text-yellow-600 -rotate-12" />
                                        <Cookie className="w-24 h-24 text-yellow-600 rotate-12" />
                                    </div>
                                )}
                            </button>

                            {isCracked && (
                                <div className="mt-8 animate-fade-in">
                                    <div className="bg-white border-2 border-yellow-200 p-6 shadow-lg max-w-md text-center relative">
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
                                            LUCKY NUMBERS: {Math.floor(Math.random() * 99)} {Math.floor(Math.random() * 99)} {Math.floor(Math.random() * 99)}
                                        </div>
                                        <p className="text-xl font-serif text-gray-800 italic">"{fortune}"</p>
                                    </div>
                                    <button
                                        onClick={crackCookie}
                                        className="mt-8 px-6 py-2 bg-yellow-500 text-white rounded-full font-bold hover:bg-yellow-600 transition-colors mx-auto block"
                                    >
                                        Open Another
                                    </button>
                                </div>
                            )}

                            {!isCracked && (
                                <p className="mt-8 text-gray-500 animate-pulse">Click the cookie to open it...</p>
                            )}
                        </div>
                    </div>
                </PremiumGuard>
            </div>
        </div>
    );
}
