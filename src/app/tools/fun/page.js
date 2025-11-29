'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Dices, Coins, Shuffle, Sparkles, Smile } from 'lucide-react';

export default function FunDashboard() {
    const tools = [
        {
            id: 'random',
            name: 'Random Generators',
            description: 'Generate numbers, colors, emojis, and more.',
            icon: <Shuffle className="w-8 h-8 text-purple-500" />,
            href: '/tools/fun/random',
            color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
        },
        {
            id: 'decision',
            name: 'Decision Maker',
            description: 'Flip a coin or roll dice to decide your fate.',
            icon: <Dices className="w-8 h-8 text-blue-500" />,
            href: '/tools/fun/decision',
            color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
        },
        {
            id: 'fortune',
            name: 'Digital Fortune',
            description: 'Open a cookie and see your luck score.',
            icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
            href: '/tools/fun/fortune',
            color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/tools" className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to All Tools
                    </Link>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Fun Zone</h1>
                    <p className="text-xl text-gray-600">Light tools for quick decisions and entertainment.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <Link key={tool.id} href={tool.href} className="group">
                            <div className={`h-full p-6 rounded-2xl border-2 transition-all duration-200 ${tool.color} border-transparent hover:border-current shadow-sm hover:shadow-md`}>
                                <div className="mb-4 bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    {tool.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
                                <p className="text-gray-600">{tool.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
