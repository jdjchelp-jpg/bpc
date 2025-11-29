'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

export default function MemoPad() {
    const [note, setNote] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const savedNote = localStorage.getItem('tiny_memo');
        if (savedNote) setNote(savedNote);
    }, []);

    const handleSave = () => {
        localStorage.setItem('tiny_memo', note);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleClear = () => {
        if (confirm('Are you sure you want to clear your memo?')) {
            setNote('');
            localStorage.removeItem('tiny_memo');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/tools/tiny" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Tiny Apps
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[70vh]">
                    <div className="p-4 border-b border-gray-100 bg-yellow-50 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-yellow-900">Memo Pad</h1>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleClear}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Clear"
                            >
                                <Trash2 className="w-6 h-6" />
                            </button>
                            <button
                                onClick={handleSave}
                                className={`flex items-center px-4 py-2 rounded-lg font-bold transition-all ${saved
                                        ? 'bg-green-500 text-white'
                                        : 'bg-yellow-500 text-white hover:bg-yellow-600'
                                    }`}
                            >
                                <Save className="w-5 h-5 mr-2" />
                                {saved ? 'Saved!' : 'Save'}
                            </button>
                        </div>
                    </div>

                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Start typing your thoughts here..."
                        className="flex-1 w-full p-8 text-lg leading-relaxed resize-none focus:outline-none font-serif text-gray-800"
                        spellCheck={false}
                    />
                </div>
            </div>
        </div>
    );
}
