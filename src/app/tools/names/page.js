'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, RefreshCw, Copy, Check, User } from 'lucide-react';
import PremiumGuard from '@/components/PremiumGuard';

export default function NameGenerator() {
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('business');
    const [names, setNames] = useState([]);
    const [loading, setLoading] = useState(false);

    const categories = [
        { id: 'business', name: 'Business / Startup', placeholder: 'e.g., A coffee shop for cat lovers' },
        { id: 'character', name: 'Character / Fantasy', placeholder: 'e.g., A brave warrior from the north' },
        { id: 'product', name: 'Product / App', placeholder: 'e.g., An app that tracks water intake' },
        { id: 'pet', name: 'Pet Name', placeholder: 'e.g., A golden retriever puppy' },
        { id: 'band', name: 'Band / Artist', placeholder: 'e.g., An indie rock band' },
    ];

    const handleGenerate = async () => {
        if (!description.trim()) return;
        setLoading(true);
        setNames([]);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'system',
                            content: `You are a creative naming expert. Generate 5 unique and catchy names for a '${category}' based on the user's description. Return ONLY a JSON array of strings, e.g., ["Name 1", "Name 2"]. Do not include any other text.`
                        },
                        { role: 'user', content: description }
                    ]
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            // Parse the JSON response
            let parsedNames = [];
            try {
                // Clean up potential markdown code blocks
                const cleanContent = data.message.replace(/```json/g, '').replace(/```/g, '').trim();
                parsedNames = JSON.parse(cleanContent);
            } catch (e) {
                console.error('Failed to parse JSON:', e);
                parsedNames = [data.message]; // Fallback
            }

            setNames(parsedNames);
        } catch (error) {
            console.error('Error:', error);
            setNames(['Error generating names. Please try again.']);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </Link>

                <PremiumGuard>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                        {/* Input Section */}
                        <div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50">
                            <div className="flex items-center mb-6">
                                <div className="p-2 bg-pink-100 rounded-lg mr-3">
                                    <Sparkles className="w-6 h-6 text-pink-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Name Generator</h1>
                                    <p className="text-sm text-gray-500">Find the perfect name with AI.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                                    >
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full p-4 border border-gray-300 rounded-xl h-32 resize-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        placeholder={categories.find(c => c.id === category)?.placeholder || 'Describe what you need a name for...'}
                                    />
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={loading || !description.trim()}
                                    className="w-full py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                                >
                                    {loading ? (
                                        <>
                                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5 mr-2" />
                                            Generate Names
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Output Section */}
                        <div className="w-full md:w-1/2 p-8 bg-white flex flex-col">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Suggestions</h2>

                            <div className="flex-1 space-y-3">
                                {names.length === 0 && !loading && (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                        <User className="w-12 h-12 mb-4 opacity-20" />
                                        <p>Enter a description to get started</p>
                                    </div>
                                )}

                                {names.map((name, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center group hover:border-pink-200 hover:shadow-sm transition-all">
                                        <span className="font-bold text-gray-800 text-lg">{name}</span>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(name)}
                                            className="p-2 text-gray-400 hover:text-pink-600 transition-colors opacity-0 group-hover:opacity-100"
                                            title="Copy"
                                        >
                                            <Copy className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </PremiumGuard>
            </div>
        </div>
    );
}
