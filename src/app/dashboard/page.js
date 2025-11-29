'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard, Sparkles, Calendar, Clock,
    Brain, Zap, Music, Bookmark, Bell, User
} from 'lucide-react';
import PremiumGuard from '@/components/PremiumGuard';
import { supabase } from '@/lib/supabase';

export default function AIHomeDashboard() {
    const [user, setUser] = useState(null);
    const [greeting, setGreeting] = useState('');
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        // Set greeting based on time
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');

        // Random AI/Tech quote
        const quotes = [
            "The best way to predict the future is to invent it.",
            "Technology is best when it brings people together.",
            "It's not a bug, it's a feature.",
            "Simplicity is the ultimate sophistication.",
            "Code is poetry."
        ];
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    const quickActions = [
        { name: 'Study Buddy', icon: <Brain className="w-6 h-6 text-purple-500" />, href: '/tools/study', color: 'bg-purple-50' },
        { name: 'New Countdown', icon: <Calendar className="w-6 h-6 text-pink-500" />, href: '/countdown/create', color: 'bg-pink-50' },
        { name: 'Focus Timer', icon: <Clock className="w-6 h-6 text-orange-500" />, href: '/tools/time/timer', color: 'bg-orange-50' },
        { name: 'AI Chat', icon: <Sparkles className="w-6 h-6 text-blue-500" />, href: '/tools/study/explain', color: 'bg-blue-50' },
    ];

    const premiumTools = [
        { name: 'Text Remix', icon: <Zap className="w-5 h-5" />, href: '/tools/remix', desc: 'Rewrite text in any style' },
        { name: 'Smart Bookmarks', icon: <Bookmark className="w-5 h-5" />, href: '/tools/bookmarks', desc: 'Organize your web life' },
        { name: 'Mood Soundboard', icon: <Music className="w-5 h-5" />, href: '/tools/mood', desc: 'Ambient sounds for focus' },
        { name: 'Scheduler', icon: <Bell className="w-5 h-5" />, href: '/tools/scheduler', desc: 'Smart notification planning' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <PremiumGuard>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                {greeting}, {user?.email?.split('@')[0] || 'User'} <span className="ml-2 text-2xl">👋</span>
                            </h1>
                            <p className="text-gray-500 mt-1">{quote}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Premium Active
                            </div>
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-gray-500" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Quick Actions */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {quickActions.map((action) => (
                                        <Link key={action.name} href={action.href} className="group">
                                            <div className={`${action.color} p-4 rounded-xl transition-all duration-200 hover:scale-105 border border-transparent hover:border-gray-200`}>
                                                <div className="mb-3 bg-white w-10 h-10 rounded-lg flex items-center justify-center shadow-sm">
                                                    {action.icon}
                                                </div>
                                                <span className="font-medium text-gray-900">{action.name}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity / Stats Placeholder */}
                            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                                <div className="relative z-10">
                                    <h2 className="text-2xl font-bold mb-2">Your Weekly Insight</h2>
                                    <p className="text-indigo-200 mb-6 max-w-md">You've been productive! You used the Study Buddy 5 times and completed 3 countdowns this week.</p>
                                    <button className="bg-white text-indigo-900 px-6 py-2 rounded-lg font-bold hover:bg-indigo-50 transition-colors">
                                        View Full Report
                                    </button>
                                </div>
                                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                                    <LayoutDashboard className="w-64 h-64" />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* New Premium Tools */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                                    New Tools
                                </h2>
                                <div className="space-y-4">
                                    {premiumTools.map((tool) => (
                                        <Link key={tool.name} href={tool.href} className="flex items-start p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                                            <div className="bg-gray-100 p-2 rounded-lg mr-3 group-hover:bg-white group-hover:shadow-sm transition-all">
                                                {tool.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-sm">{tool.name}</h3>
                                                <p className="text-xs text-gray-500">{tool.desc}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* System Status */}
                            <div className="bg-gray-900 rounded-2xl p-6 text-white">
                                <h2 className="text-lg font-bold mb-4">System Status</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">AI Services</span>
                                        <span className="text-green-400 flex items-center"><div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>Operational</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Database</span>
                                        <span className="text-green-400 flex items-center"><div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>Operational</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Version</span>
                                        <span className="text-gray-400">v2.1.0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PremiumGuard>
        </div>
    );
}
