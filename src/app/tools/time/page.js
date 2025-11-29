'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Timer, Watch } from 'lucide-react';

export default function TimeDashboard() {
    const tools = [
        {
            id: 'stopwatch',
            name: 'Stopwatch',
            description: 'Precise stopwatch with lap functionality.',
            icon: <Watch className="w-8 h-8 text-blue-500" />,
            href: '/tools/time/stopwatch',
            color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
        },
        {
            id: 'timer',
            name: 'Countdown Timer',
            description: 'Set timers for focus, cooking, or workouts.',
            icon: <Timer className="w-8 h-8 text-orange-500" />,
            href: '/tools/time/timer',
            color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
        },
        {
            id: 'worldclock',
            name: 'World Clock',
            description: 'Check the time across the globe.',
            icon: <Clock className="w-8 h-8 text-purple-500" />,
            href: '/tools/timezone-viewer', // Reusing existing tool
            color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
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
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Time Tools</h1>
                    <p className="text-xl text-gray-600">Master your time with these utilities.</p>
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
