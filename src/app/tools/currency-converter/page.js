'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, ArrowRightLeft } from 'lucide-react';

export default function CurrencyConverter() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [rate, setRate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    const currencies = [
        'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD',
        'MXN', 'SGD', 'HKD', 'NOK', 'KRW', 'TRY', 'INR', 'RUB', 'BRL', 'ZAR'
    ];

    useEffect(() => {
        fetchRate();
    }, [fromCurrency, toCurrency]);

    const fetchRate = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const data = await res.json();
            const newRate = data.rates[toCurrency];
            setRate(newRate);
            setLastUpdated(new Date(data.time_last_updated * 1000).toLocaleDateString());
        } catch (error) {
            console.error('Error fetching rates:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
                <Link href="/tools" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to All Tools
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-emerald-50">
                        <h1 className="text-3xl font-bold text-emerald-900 mb-2">Currency Converter</h1>
                        <p className="text-emerald-700">Real-time exchange rates for major currencies.</p>
                    </div>

                    <div className="p-8 space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="block w-full px-4 py-4 border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-2xl font-bold"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                                <select
                                    value={fromCurrency}
                                    onChange={(e) => setFromCurrency(e.target.value)}
                                    className="block w-full px-4 py-3 border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                                >
                                    {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <button
                                onClick={handleSwap}
                                className="mt-6 p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                            >
                                <ArrowRightLeft className="w-5 h-5" />
                            </button>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                                <select
                                    value={toCurrency}
                                    onChange={(e) => setToCurrency(e.target.value)}
                                    className="block w-full px-4 py-3 border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                                >
                                    {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="bg-emerald-900 rounded-2xl p-8 text-white text-center">
                            {loading ? (
                                <div className="flex justify-center py-4">
                                    <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
                                </div>
                            ) : (
                                <>
                                    <p className="text-emerald-200 text-sm mb-2">
                                        {amount} {fromCurrency} =
                                    </p>
                                    <p className="text-5xl font-bold mb-4">
                                        {(amount * (rate || 0)).toFixed(2)} {toCurrency}
                                    </p>
                                    <p className="text-xs text-emerald-400">
                                        1 {fromCurrency} = {rate} {toCurrency} • Updated {lastUpdated}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
