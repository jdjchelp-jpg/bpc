'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Timer, Watch, Crown } from 'lucide-react';

export default function TimeDashboard() {
    const tools = [
        {
            id: 'stopwatch',
            name: 'Stopwatch',
            description: 'Precise stopwatch with lap functionality.',
            icon: <Watch className="w-8 h-8 text-white" />,
            href: '/tools/time/stopwatch',
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            id: 'timer',
            name: 'Countdown Timer',
            description: 'Set timers for focus, cooking, or workouts.',
            icon: <Timer className="w-8 h-8 text-white" />,
            href: '/tools/time/timer',
            gradient: 'from-orange-500 to-red-500',
        },
        {
            id: 'worldclock',
            name: 'World Clock',
            description: 'Check the time across the globe.',
            icon: <Clock className="w-8 h-8 text-white" />,
            href: '/tools/timezone-viewer',
            gradient: 'from-purple-500 to-indigo-500',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12 text-center">
                    <Link href="/tools" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Tools
                    </Link>
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                            <Clock className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Time Suite</h1>
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-wider flex items-center shadow-sm">
                            <Crown className="w-3 h-3 mr-1" /> Premium
                        </span>
                    </div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Master your time with our professional-grade timing utilities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tools.map((tool) => (
                        <Link key={tool.id} href={tool.href} className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl -z-10"
                                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                            />
                            <div className={`h-full p-8 rounded-3xl bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 relative overflow-hidden`}>
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tool.gradient} opacity-10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`} />

                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {tool.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{tool.name}</h3>
                                <p className="text-gray-500 leading-relaxed mb-6">
                                    {tool.description}
                                </p>

                                <div className={`inline-flex items-center font-semibold text-sm bg-clip-text text-transparent bg-gradient-to-r ${tool.gradient}`}>
                                    Open Tool <ArrowLeft className="w-4 h-4 ml-2 rotate-180 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
