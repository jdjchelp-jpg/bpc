'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Quote, RefreshCw, Copy, Check, Twitter } from 'lucide-react';

export default function QuoteGenerator() {
    const [quote, setQuote] = useState({
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    });
    const [copied, setCopied] = useState(false);

    const quotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
        { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
        { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
        { text: "Get busy living or get busy dying.", author: "Stephen King" },
        { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
        { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison" },
        { text: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" }
    ];

    const generateQuote = () => {
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(random);
    };

    const copyQuote = () => {
        navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tweetQuote = () => {
        const text = encodeURIComponent(`"${quote.text}" - ${quote.author}`);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/tools/design" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Design Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-blue-50">
                        <h1 className="text-3xl font-bold text-blue-900 mb-2">Quote Generator</h1>
                        <p className="text-blue-700">Find inspiration for your day.</p>
                    </div>

                    <div className="p-12 text-center">
                        <div className="mb-12 relative">
                            <Quote className="w-16 h-16 text-blue-100 absolute -top-8 -left-4 transform -scale-x-100" />
                            <p className="text-3xl md:text-4xl font-serif text-gray-800 leading-relaxed relative z-10">
                                {quote.text}
                            </p>
                            <Quote className="w-16 h-16 text-blue-100 absolute -bottom-8 -right-4" />
                        </div>

                        <p className="text-xl text-gray-500 font-medium mb-12">— {quote.author}</p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={generateQuote}
                                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg hover:shadow-blue-500/30"
                            >
                                <RefreshCw className="w-5 h-5 mr-2" />
                                New Quote
                            </button>

                            <button
                                onClick={copyQuote}
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
                            >
                                {copied ? <Check className="w-5 h-5 mr-2 text-green-600" /> : <Copy className="w-5 h-5 mr-2" />}
                                Copy
                            </button>

                            <button
                                onClick={tweetQuote}
                                className="px-6 py-3 bg-sky-100 text-sky-600 rounded-xl font-bold hover:bg-sky-200 transition-colors flex items-center justify-center"
                            >
                                <Twitter className="w-5 h-5 mr-2" />
                                Tweet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
