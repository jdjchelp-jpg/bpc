'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, FileText, HelpCircle, Brain, GraduationCap, Gamepad2, Crown } from 'lucide-react';

export default function StudyDashboard() {
    const tools = [
        {
            id: 'summarizer',
            name: 'AI Summarizer',
            description: 'Turn long notes or documents into concise summaries.',
            icon: <FileText className="w-8 h-8 text-white" />,
            href: '/tools/study/summarizer',
            gradient: 'from-indigo-500 to-blue-500',
        },
        {
            id: 'flashcards',
            name: 'Flashcard Maker',
            description: 'Generate study flashcards from any text instantly.',
            icon: <Brain className="w-8 h-8 text-white" />,
            href: '/tools/study/flashcards',
            gradient: 'from-pink-500 to-rose-500',
        },
        {
            id: 'explain',
            name: 'Explain This',
            description: 'Get simple explanations for complex topics.',
            icon: <HelpCircle className="w-8 h-8 text-white" />,
            href: '/tools/study/explain',
            gradient: 'from-teal-400 to-emerald-500',
        },
        {
            id: 'lessons',
            name: 'Interactive Lessons',
            description: 'Turn text into step-by-step interactive lessons.',
            icon: <GraduationCap className="w-8 h-8 text-white" />,
            href: '/tools/study/lessons',
            gradient: 'from-orange-400 to-amber-500',
        },
        {
            id: 'games',
            name: 'Study Games',
            description: 'Play games generated from your study material.',
            icon: <Gamepad2 className="w-8 h-8 text-white" />,
            href: '/tools/study/games',
            gradient: 'from-purple-500 to-violet-500',
        },
        {
            id: 'quiz',
            name: 'Quiz Generator',
            description: 'Create quizzes to test your knowledge.',
            icon: <BookOpen className="w-8 h-8 text-white" />,
            href: '/tools/study/quiz',
            gradient: 'from-blue-400 to-cyan-500',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center">
                    <Link href="/tools" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Tools
                    </Link>
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
                            <GraduationCap className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Study Hub</h1>
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-wider flex items-center shadow-sm">
                            <Crown className="w-3 h-3 mr-1" /> Premium
                        </span>
                    </div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Supercharge your learning with our AI-powered education suite.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                    Start Learning <ArrowLeft className="w-4 h-4 ml-2 rotate-180 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
