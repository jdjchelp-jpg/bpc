'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Delete, RotateCcw } from 'lucide-react';
import * as math from 'mathjs';

export default function Calculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);

    const handleClick = (value) => {
        setInput((prev) => prev + value);
    };

    const handleClear = () => {
        setInput('');
        setResult('');
    };

    const handleDelete = () => {
        setInput((prev) => prev.slice(0, -1));
    };

    const calculate = () => {
        try {
            const res = math.evaluate(input);
            setResult(res.toString());
            setHistory((prev) => [`${input} = ${res}`, ...prev].slice(0, 5));
        } catch (error) {
            setResult('Error');
        }
    };

    const buttons = [
        '(', ')', '%', 'AC',
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+'
    ];

    const scientificButtons = [
        'sin', 'cos', 'tan', 'sqrt',
        'log', 'ln', 'pi', 'e',
        '^', 'abs', 'deg', 'rad'
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/tools/math" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Math Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                    {/* Calculator Interface */}
                    <div className="w-full md:w-2/3 p-8 bg-gray-900 text-white">
                        <div className="mb-8 text-right">
                            <div className="text-gray-400 text-sm h-6">{history[0]}</div>
                            <div className="text-4xl font-mono font-bold break-all min-h-[3rem]">{input || '0'}</div>
                            <div className="text-2xl text-green-400 font-mono font-bold min-h-[2rem]">{result}</div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {buttons.map((btn) => (
                                <button
                                    key={btn}
                                    onClick={() => {
                                        if (btn === 'AC') handleClear();
                                        else if (btn === '=') calculate();
                                        else handleClick(btn);
                                    }}
                                    className={`p-4 rounded-xl font-bold text-xl transition-all active:scale-95 ${btn === '='
                                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white col-span-2'
                                            : btn === 'AC'
                                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                                : ['/', '*', '-', '+'].includes(btn)
                                                    ? 'bg-gray-700 hover:bg-gray-600 text-indigo-300'
                                                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                                        }`}
                                >
                                    {btn}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Scientific Functions & History */}
                    <div className="w-full md:w-1/3 p-8 bg-gray-50 border-l border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Functions</h3>
                        <div className="grid grid-cols-2 gap-2 mb-8">
                            {scientificButtons.map((btn) => (
                                <button
                                    key={btn}
                                    onClick={() => handleClick(btn + '(')}
                                    className="p-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                >
                                    {btn}
                                </button>
                            ))}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-4">History</h3>
                        <div className="space-y-2">
                            {history.map((item, index) => (
                                <div key={index} className="p-2 bg-white rounded-lg text-sm text-gray-600 border border-gray-100 font-mono">
                                    {item}
                                </div>
                            ))}
                            {history.length === 0 && <p className="text-gray-400 text-sm">No calculations yet.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
