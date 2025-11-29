'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Palette, Quote, Layers } from 'lucide-react';

export default function DesignDashboard() {
    const tools = [
        {
            id: 'gradient',
            name: 'Gradient Generator',
            description: 'Create beautiful CSS gradients for your projects.',
            icon: <Palette className="w-8 h-8 text-pink-500" />,
            href: '/tools/design/gradient',
            color: 'bg-pink-50 hover:bg-pink-100 border-pink-200',
        },
        {
            id: 'quotes',
            name: 'Quote Generator',
            description: 'Find the perfect quote for your social media.',
            icon: <Quote className="w-8 h-8 text-blue-500" />,
            href: '/tools/design/quotes',
            color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
        },
        {
            id: 'backgrounds',
            name: 'Pattern Maker',
            description: 'Generate seamless CSS background patterns.',
            icon: <Layers className="w-8 h-8 text-indigo-500" />,
            href: '/tools/design/patterns',
            color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
        },
        {
            id: 'palette',
            name: 'Palette Generator',
            description: 'Generate beautiful color combinations.',
            icon: <Palette className="w-8 h-8 text-teal-500" />,
            href: '/tools/design/palette',
            color: 'bg-teal-50 hover:bg-teal-100 border-teal-200',
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
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Design Studio</h1>
                    <p className="text-xl text-gray-600">Tools to make your content look amazing.</p>
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
