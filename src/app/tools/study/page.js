'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, FileText, HelpCircle, Brain, GraduationCap, Gamepad2 } from 'lucide-react';

export default function StudyDashboard() {
    const tools = [
        {
            id: 'summarizer',
            name: 'AI Summarizer',
            description: 'Turn long notes or documents into concise summaries.',
            icon: <FileText className="w-8 h-8 text-indigo-500" />,
            href: '/tools/study/summarizer',
            color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
        },
        {
            id: 'flashcards',
            name: 'Flashcard Maker',
            description: 'Generate study flashcards from any text instantly.',
            icon: <Brain className="w-8 h-8 text-pink-500" />,
            href: '/tools/study/flashcards',
            color: 'bg-pink-50 hover:bg-pink-100 border-pink-200',
        },
        {
            id: 'explain',
            name: 'Explain This',
            description: 'Get simple explanations for complex topics.',
            icon: <HelpCircle className="w-8 h-8 text-teal-500" />,
            href: '/tools/study/explain',
            color: 'bg-teal-50 hover:bg-teal-100 border-teal-200',
        },
        {
            id: 'lessons',
            name: 'Interactive Lessons',
            description: 'Turn text into step-by-step interactive lessons.',
            icon: <GraduationCap className="w-8 h-8 text-orange-500" />,
            href: '/tools/study/lessons',
            color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
        },
        {
            id: 'games',
            name: 'Study Games',
            description: 'Play games generated from your study material.',
            icon: <Gamepad2 className="w-8 h-8 text-purple-500" />,
            href: '/tools/study/games',
            color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
        },
        {
            id: 'quiz',
            name: 'Quiz Generator',
            description: 'Create quizzes to test your knowledge.',
            icon: <BookOpen className="w-8 h-8 text-blue-500" />,
            href: '/tools/study/quiz',
            color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
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
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">AI Study Buddy</h1>
                    <p className="text-xl text-gray-600">Supercharge your learning with AI-powered tools.</p>
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
