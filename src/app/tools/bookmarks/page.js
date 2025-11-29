'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bookmark, Plus, Trash2, ExternalLink, Search, Tag } from 'lucide-react';
import PremiumGuard from '@/components/PremiumGuard';

export default function SmartBookmarks() {
    const [bookmarks, setBookmarks] = useState([]);
    const [newUrl, setNewUrl] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newTags, setNewTags] = useState('');
    const [filter, setFilter] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('smart_bookmarks');
        if (saved) setBookmarks(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('smart_bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    const addBookmark = (e) => {
        e.preventDefault();
        if (!newUrl) return;

        const bookmark = {
            id: Date.now(),
            url: newUrl.startsWith('http') ? newUrl : `https://${newUrl}`,
            title: newTitle || newUrl,
            tags: newTags.split(',').map(t => t.trim()).filter(t => t),
            date: new Date().toISOString()
        };

        setBookmarks([bookmark, ...bookmarks]);
        setNewUrl('');
        setNewTitle('');
        setNewTags('');
        setIsAdding(false);
    };

    const deleteBookmark = (id) => {
        setBookmarks(bookmarks.filter(b => b.id !== id));
    };

    const filteredBookmarks = bookmarks.filter(b =>
        b.title.toLowerCase().includes(filter.toLowerCase()) ||
        b.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </Link>

                <PremiumGuard>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col">
                        <div className="p-8 border-b border-gray-100 bg-blue-50 flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-blue-900 mb-2">Smart Bookmarks</h1>
                                <p className="text-blue-700">Organize your favorite links.</p>
                            </div>
                            <button
                                onClick={() => setIsAdding(!isAdding)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center shadow-lg"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Add New
                            </button>
                        </div>

                        <div className="p-8 flex-1 bg-gray-50">
                            {/* Search */}
                            <div className="mb-6 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    placeholder="Search bookmarks or tags..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                />
                            </div>

                            {/* Add Form */}
                            {isAdding && (
                                <form onSubmit={addBookmark} className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-blue-100 animate-fade-in">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                            <input
                                                type="text"
                                                value={newUrl}
                                                onChange={(e) => setNewUrl(e.target.value)}
                                                placeholder="example.com"
                                                className="w-full p-2 border border-gray-200 rounded-lg"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                            <input
                                                type="text"
                                                value={newTitle}
                                                onChange={(e) => setNewTitle(e.target.value)}
                                                placeholder="My Favorite Site"
                                                className="w-full p-2 border border-gray-200 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                                        <input
                                            type="text"
                                            value={newTags}
                                            onChange={(e) => setNewTags(e.target.value)}
                                            placeholder="work, design, inspiration"
                                            className="w-full p-2 border border-gray-200 rounded-lg"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsAdding(false)}
                                            className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                                        >
                                            Save Bookmark
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* List */}
                            <div className="space-y-4">
                                {filteredBookmarks.length === 0 && (
                                    <div className="text-center text-gray-400 py-12">
                                        <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p>No bookmarks found.</p>
                                    </div>
                                )}
                                {filteredBookmarks.map((bookmark) => (
                                    <div key={bookmark.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex justify-between items-start group">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-gray-900">{bookmark.title}</h3>
                                                <a
                                                    href={bookmark.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-400 hover:text-blue-600"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-2 truncate max-w-md">{bookmark.url}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {bookmark.tags.map((tag, i) => (
                                                    <span key={i} className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                                                        <Tag className="w-3 h-3 mr-1" />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteBookmark(bookmark.id)}
                                            className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-5 h-5" />
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
