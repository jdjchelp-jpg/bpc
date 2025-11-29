'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, DollarSign, Users, Percent } from 'lucide-react';

export default function TipCalculator() {
    const [bill, setBill] = useState('');
    const [tipPercentage, setTipPercentage] = useState(15);
    const [people, setPeople] = useState(1);
    const [results, setResults] = useState({
        tipAmount: 0,
        total: 0,
        perPerson: 0,
    });

    useEffect(() => {
        const billNum = parseFloat(bill) || 0;
        const peopleNum = parseInt(people) || 1;
        const tip = billNum * (tipPercentage / 100);
        const total = billNum + tip;

        setResults({
            tipAmount: tip,
            total: total,
            perPerson: total / peopleNum,
        });
    }, [bill, tipPercentage, people]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
                <Link href="/tools" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to All Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-teal-50">
                        <h1 className="text-3xl font-bold text-teal-900 mb-2">Tip & Split</h1>
                        <p className="text-teal-700">Calculate tips and split bills instantly.</p>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Inputs */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bill Amount</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        value={bill}
                                        onChange={(e) => setBill(e.target.value)}
                                        placeholder="0.00"
                                        className="block w-full pl-10 pr-4 py-3 border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 text-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tip Percentage: {tipPercentage}%</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    step="1"
                                    value={tipPercentage}
                                    onChange={(e) => setTipPercentage(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                                />
                                <div className="flex justify-between mt-2">
                                    {[10, 15, 18, 20, 25].map((pct) => (
                                        <button
                                            key={pct}
                                            onClick={() => setTipPercentage(pct)}
                                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${tipPercentage === pct
                                                    ? 'bg-teal-100 text-teal-700 border border-teal-200'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {pct}%
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Split Between</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Users className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        min="1"
                                        value={people}
                                        onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="block w-full pl-10 pr-4 py-3 border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 text-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="bg-teal-900 rounded-2xl p-6 text-white space-y-6">
                            <div className="flex justify-between items-center pb-6 border-b border-teal-800">
                                <div>
                                    <p className="text-teal-200 text-sm">Tip Amount</p>
                                    <p className="text-3xl font-bold">${results.tipAmount.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-teal-200 text-sm">Total Bill</p>
                                    <p className="text-3xl font-bold">${results.total.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-teal-200 text-sm font-medium">Total Per Person</p>
                                    <p className="text-xs text-teal-400">Bill + Tip</p>
                                </div>
                                <p className="text-5xl font-bold text-teal-300">${results.perPerson.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
