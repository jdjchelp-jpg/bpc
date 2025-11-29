'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, RefreshCw, Copy, Check, Sparkles, Shield, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function PasswordGenerator() {
    const [mode, setMode] = useState('standard'); // 'standard' or 'ai'
    const [password, setPassword] = useState('');
    const [copied, setCopied] = useState(false);
    const [history, setHistory] = useState([]);

    // Standard Mode State
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });

    // AI Mode State
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGeneratingAi, setIsGeneratingAi] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        generateStandardPassword();
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    };

    const generateStandardPassword = () => {
        const charset = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
        };

        let chars = '';
        if (options.uppercase) chars += charset.uppercase;
        if (options.lowercase) chars += charset.lowercase;
        if (options.numbers) chars += charset.numbers;
        if (options.symbols) chars += charset.symbols;

        if (chars === '') return;

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        setPassword(newPassword);
        addToHistory(newPassword);
        setCopied(false);
    };

    const generateAiPassword = async () => {
        if (!aiPrompt.trim()) return;
        setIsGeneratingAi(true);

        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                alert('Please log in to use AI features.');
                setIsGeneratingAi(false);
                return;
            }

            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a password generator. Generate a SINGLE, strong but memorable password based on the user\'s theme. Do not include any other text, just the password. Mix case, numbers, and symbols if possible but keep it readable.'
                        },
                        {
                            role: 'user',
                            content: `Theme: ${aiPrompt}`
                        }
                    ]
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const newPassword = data.choices[0].message.content.trim();
            setPassword(newPassword);
            addToHistory(newPassword);
            setCopied(false);

        } catch (error) {
            console.error('AI Error:', error);
            alert('Failed to generate AI password. ' + (error.message || ''));
        } finally {
            setIsGeneratingAi(false);
        }
    };

    const addToHistory = (pass) => {
        setHistory(prev => [pass, ...prev].slice(0, 5));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const calculateStrength = (pass) => {
        let score = 0;
        if (pass.length > 8) score++;
        if (pass.length > 12) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        return score; // 0-5
    };

    const strength = calculateStrength(password);
    const strengthColor = ['bg-red-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-600'][strength];
    const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][strength];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/tools" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to All Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-indigo-50">
                        <h1 className="text-3xl font-bold text-indigo-900 mb-2">Password Generator</h1>
                        <p className="text-indigo-700">Create secure, random passwords instantly.</p>
                    </div>

                    <div className="p-8">
                        {/* Password Display */}
                        <div className="relative mb-8">
                            <div className="bg-gray-100 rounded-xl p-6 pr-16 break-all font-mono text-2xl text-gray-800 text-center min-h-[5rem] flex items-center justify-center">
                                {password}
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-gray-500 hover:text-indigo-600"
                                title="Copy to clipboard"
                            >
                                {copied ? <Check className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6" />}
                            </button>
                        </div>

                        {/* Strength Meter */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-500">Strength</span>
                                <span className={`font-bold ${strengthColor.replace('bg-', 'text-')}`}>{strengthText}</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-500 ${strengthColor}`}
                                    style={{ width: `${(strength / 5) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Mode Switcher */}
                        <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
                            <button
                                onClick={() => setMode('standard')}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${mode === 'standard' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Zap className="w-4 h-4 mr-2" />
                                Standard
                            </button>
                            <button
                                onClick={() => setMode('ai')}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${mode === 'ai' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                AI Memorable
                            </button>
                        </div>

                        {/* Controls */}
                        {mode === 'standard' ? (
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-gray-700">Length: {length}</label>
                                    </div>
                                    <input
                                        type="range"
                                        min="6"
                                        max="64"
                                        value={length}
                                        onChange={(e) => setLength(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {Object.keys(options).map((opt) => (
                                        <label key={opt} className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={options[opt]}
                                                onChange={() => setOptions(prev => ({ ...prev, [opt]: !prev[opt] }))}
                                                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                                            />
                                            <span className="text-gray-700 capitalize">{opt}</span>
                                        </label>
                                    ))}
                                </div>

                                <button
                                    onClick={generateStandardPassword}
                                    className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center transition-all"
                                >
                                    <RefreshCw className="w-5 h-5 mr-2" />
                                    Generate Password
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {!user ? (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                                        <p className="text-yellow-800 text-sm">Please log in to use AI features.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Theme or Hint</label>
                                            <input
                                                type="text"
                                                value={aiPrompt}
                                                onChange={(e) => setAiPrompt(e.target.value)}
                                                placeholder="e.g., Space, Harry Potter, Summer Vacation"
                                                className="block w-full px-4 py-3 border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                            <p className="text-xs text-gray-500 mt-2">AI will generate a memorable password based on this theme.</p>
                                        </div>

                                        <button
                                            onClick={generateAiPassword}
                                            disabled={isGeneratingAi || !aiPrompt.trim()}
                                            className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center transition-all ${isGeneratingAi || !aiPrompt.trim()
                                                    ? 'bg-indigo-300 cursor-not-allowed'
                                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30'
                                                }`}
                                        >
                                            {isGeneratingAi ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                    Thinking...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="w-5 h-5 mr-2" />
                                                    Generate with AI
                                                </>
                                            )}
                                        </button>
                                    </>
                                )}
                            </div>
                        )}

                        {/* History */}
                        {history.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">Recent Passwords</h3>
                                <div className="space-y-2">
                                    {history.map((pass, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm text-gray-600 bg-gray-50 p-2 rounded hover:bg-gray-100 transition-colors">
                                            <span className="font-mono truncate mr-4">{pass}</span>
                                            <button
                                                onClick={() => { navigator.clipboard.writeText(pass); }}
                                                className="text-indigo-500 hover:text-indigo-700 text-xs font-medium"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
