'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, FileJson, Binary, Fingerprint, Lock, Globe } from 'lucide-react';

export default function DevToolsDashboard() {
    const tools = [
        {
            id: 'json',
            name: 'JSON Formatter',
            description: 'Validate, format, and minify JSON data.',
            icon: <FileJson className="w-8 h-8 text-yellow-500" />,
            href: '/tools/dev/json-formatter',
            color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
        },
        {
            id: 'base64',
            name: 'Base64 Encoder',
            description: 'Encode and decode text or files to Base64.',
            icon: <Binary className="w-8 h-8 text-blue-500" />,
            href: '/tools/dev/base64',
            color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
        },
        {
            id: 'uuid',
            name: 'UUID Generator',
            description: 'Generate random UUIDs (v4) for your projects.',
            icon: <Fingerprint className="w-8 h-8 text-purple-500" />,
            href: '/tools/dev/uuid',
            color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
        },
        {
            id: 'hash',
            name: 'Hash Generator',
            description: 'Calculate MD5, SHA-1, SHA-256 hashes.',
            icon: <Lock className="w-8 h-8 text-red-500" />,
            href: '/tools/dev/hash',
            color: 'bg-red-50 hover:bg-red-100 border-red-200',
        },
        {
            id: 'html',
            name: 'HTML Escape',
            description: 'Escape or unescape HTML entities.',
            icon: <Globe className="w-8 h-8 text-green-500" />,
            href: '/tools/dev/html-escape',
            color: 'bg-green-50 hover:bg-green-100 border-green-200',
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
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Developer Tools</h1>
                    <p className="text-xl text-gray-600">Essential utilities for developers, by developers.</p>
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
