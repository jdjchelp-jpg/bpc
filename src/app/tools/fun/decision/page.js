'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Coins, Dices, RotateCw } from 'lucide-react';
import PremiumGuard from '@/components/PremiumGuard';

export default function DecisionMaker() {
    const [mode, setMode] = useState('coin'); // 'coin' or 'dice'
    const [result, setResult] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const flipCoin = () => {
        setIsAnimating(true);
        setResult(null);
        setTimeout(() => {
            setResult(Math.random() > 0.5 ? 'Heads' : 'Tails');
            setIsAnimating(false);
        }, 1000);
    };

    const rollDice = () => {
        setIsAnimating(true);
        setResult(null);
        setTimeout(() => {
            setResult(Math.floor(Math.random() * 6) + 1);
            setIsAnimating(false);
        }, 600);
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
                        <div className="p-8 border-b border-gray-100 bg-blue-50">
                            <h1 className="text-3xl font-bold text-blue-900 mb-2">Decision Maker</h1>
                            <p className="text-blue-700">Can't decide? Let fate choose for you.</p>
                        </div>

                        <div className="flex p-1 bg-gray-100 m-8 rounded-xl">
                            <button
                                onClick={() => { setMode('coin'); setResult(null); }}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${mode === 'coin' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Coins className="w-4 h-4 mr-2" />
                                Coin Flip
                            </button>
                            <button
                                onClick={() => { setMode('dice'); setResult(null); }}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${mode === 'dice' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Dices className="w-4 h-4 mr-2" />
                                Dice Roll
                            </button>
                        </div>

                        <div className="p-8 pt-0 text-center min-h-[300px] flex flex-col items-center justify-center">
                            {mode === 'coin' ? (
                                <>
                                    <div className={`w-32 h-32 rounded-full border-4 border-yellow-400 bg-yellow-100 flex items-center justify-center mb-8 transition-all ${isAnimating ? 'animate-spin' : ''}`}>
                                        {result ? (
                                            <span className="text-2xl font-bold text-yellow-600">{result}</span>
                                        ) : (
                                            <span className="text-4xl">?</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={flipCoin}
                                        disabled={isAnimating}
                                        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    >
                                        {isAnimating ? 'Flipping...' : 'Flip Coin'}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className={`w-32 h-32 rounded-2xl border-4 border-red-400 bg-red-50 flex items-center justify-center mb-8 transition-all ${isAnimating ? 'animate-bounce' : ''}`}>
                                        {result ? (
                                            <span className="text-6xl font-bold text-red-600">{result}</span>
                                        ) : (
                                            <span className="text-4xl">?</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={rollDice}
                                        disabled={isAnimating}
                                        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    >
                                        {isAnimating ? 'Rolling...' : 'Roll Dice'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </PremiumGuard>
            </div>
        </div>
    );
}
