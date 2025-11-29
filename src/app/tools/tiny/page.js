'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, StickyNote, CheckSquare, QrCode } from 'lucide-react';

export default function TinyDashboard() {
    const tools = [
        {
            id: 'memo',
            name: 'Memo Pad',
            description: 'Quickly jot down thoughts and ideas.',
            icon: <StickyNote className="w-8 h-8 text-yellow-500" />,
            href: '/tools/tiny/memo',
            color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
        },
        {
            id: 'todo',
            name: 'To-Do List',
            description: 'Simple task manager for your daily goals.',
            icon: <CheckSquare className="w-8 h-8 text-green-500" />,
            href: '/tools/tiny/todo',
            color: 'bg-green-50 hover:bg-green-100 border-green-200',
        },
        {
            id: 'qr',
            name: 'QR Code Generator',
            description: 'Create QR codes for links and text.',
            icon: <QrCode className="w-8 h-8 text-gray-500" />,
            href: '/tools/tiny/qr', // To be implemented or linked if exists
            color: 'bg-gray-50 hover:bg-gray-100 border-gray-200',
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
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Tiny Apps</h1>
                    <p className="text-xl text-gray-600">Small but mighty utilities for everyday use.</p>
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
