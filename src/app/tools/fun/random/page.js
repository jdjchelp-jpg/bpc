'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shuffle, Hash, Palette, Smile, User } from 'lucide-react';
import PremiumGuard from '@/components/PremiumGuard';

export default function RandomGenerators() {
    const [activeTab, setActiveTab] = useState('number');
    const [result, setResult] = useState(null);

    // Number State
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);

    const generateNumber = () => {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        setResult(num);
    };

    const generateColor = () => {
        const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        setResult(color);
    };

    const generateEmoji = () => {
        const emojis = ['😀', '😂', '🥰', '😎', '🤔', '🤯', '🥳', '👻', '👽', '🤖', '🎃', '🐶', '🐱', '🦄', '🍕', '🌮', '🚀', '💡', '🎉', '🔥'];
        setResult(emojis[Math.floor(Math.random() * emojis.length)]);
    };

    const generateUsername = () => {
        const adjs = ['Happy', 'Cool', 'Fast', 'Smart', 'Neon', 'Cyber', 'Pixel', 'Mega', 'Ultra', 'Super'];
        const nouns = ['Tiger', 'Coder', 'Ninja', 'Panda', 'Star', 'Moon', 'Rider', 'Gamer', 'Dev', 'Bot'];
        const name = adjs[Math.floor(Math.random() * adjs.length)] + nouns[Math.floor(Math.random() * nouns.length)] + Math.floor(Math.random() * 999);
        setResult(name);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'number':
                return (
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Min</label>
                                <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Max</label>
                                <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
                            </div>
                        </div>
                        <button onClick={generateNumber} className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors">Generate Number</button>
                    </div>
                );
            case 'color':
                return (
                    <div className="space-y-6">
                        <div className="h-32 rounded-xl border-2 border-gray-200 flex items-center justify-center" style={{ backgroundColor: result || '#ffffff' }}>
                            <span className="bg-white/80 px-4 py-2 rounded-lg font-mono font-bold">{result || 'Click Generate'}</span>
                        </div>
                        <button onClick={generateColor} className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors">Generate Color</button>
                    </div>
                );
            case 'emoji':
                return (
                    <div className="space-y-6">
                        <div className="h-32 flex items-center justify-center text-6xl">
                            {result || '❓'}
                        </div>
                        <button onClick={generateEmoji} className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors">Generate Emoji</button>
                    </div>
                );
            case 'username':
                return (
                    <div className="space-y-6">
                        <div className="h-32 flex items-center justify-center text-3xl font-bold text-gray-800">
                            {result || 'Username'}
                        </div>
                        <button onClick={generateUsername} className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors">Generate Username</button>
                    </div>
                );
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
                        <div className="p-8 border-b border-gray-100 bg-purple-50">
                            <h1 className="text-3xl font-bold text-purple-900 mb-2">Random Generators</h1>
                            <p className="text-purple-700">Pick a category and let chaos decide.</p>
                        </div>

                        <div className="flex border-b border-gray-100 overflow-x-auto">
                            {[
                                { id: 'number', icon: <Hash className="w-4 h-4" />, label: 'Number' },
                                { id: 'color', icon: <Palette className="w-4 h-4" />, label: 'Color' },
                                { id: 'emoji', icon: <Smile className="w-4 h-4" />, label: 'Emoji' },
                                { id: 'username', icon: <User className="w-4 h-4" />, label: 'Username' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => { setActiveTab(tab.id); setResult(null); }}
                                    className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center whitespace-nowrap transition-colors ${activeTab === tab.id
                                        ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50/50'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {tab.icon}
                                    <span className="ml-2">{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="p-8">
                            {activeTab === 'number' && result !== null && (
                                <div className="text-center mb-8">
                                    <span className="text-6xl font-bold text-gray-900">{result}</span>
                                </div>
                            )}
                            {renderContent()}
                        </div>
                    </div>
                </PremiumGuard>
            </div>
        </div>
    );
}
