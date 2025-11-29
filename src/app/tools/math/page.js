'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Scale, Percent } from 'lucide-react';

export default function MathDashboard() {
    const tools = [
        {
            id: 'calculator',
            name: 'Scientific Calculator',
            description: 'Advanced calculator for complex math.',
            icon: <Calculator className="w-8 h-8 text-indigo-500" />,
            href: '/tools/math/calculator',
            color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
        },
        {
            id: 'converter',
            name: 'Unit Converter',
            description: 'Convert length, weight, temperature, and more.',
            icon: <Scale className="w-8 h-8 text-green-500" />,
            href: '/tools/math/converter',
            color: 'bg-green-50 hover:bg-green-100 border-green-200',
        },
        {
            id: 'tips',
            name: 'Tip Calculator',
            description: 'Calculate tips and split bills easily.',
            icon: <Percent className="w-8 h-8 text-yellow-500" />,
            href: '/tools/tip-calculator', // Reusing existing tool
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
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Math Toolkit</h1>
                    <p className="text-xl text-gray-600">Solve problems and convert units instantly.</p>
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
