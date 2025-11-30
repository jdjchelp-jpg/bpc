'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import CountdownTimer from '@/components/CountdownTimer'
import Link from 'next/link'
import { ArrowLeft, Share2, Repeat, Calendar, Music, Settings, Edit2, Code, X, Copy, Check } from 'lucide-react'

export default function SharedCountdown() {
    const { id } = useParams()
    const searchParams = useSearchParams()
    const isEmbed = searchParams.get('embed') === 'true'

    const [countdown, setCountdown] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isLive, setIsLive] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)

    // Embed Modal State
    const [showEmbedModal, setShowEmbedModal] = useState(false)
    const [copied, setCopied] = useState(false)

    // Theme configurations
    const themes = {
        default: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white',
        christmas: 'bg-gradient-to-br from-red-900 to-green-900 text-white',
        newyear: 'bg-gradient-to-br from-purple-900 to-blue-900 text-white',
        neon: 'bg-black text-neon-green',
        birthday: 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white',
        summer: 'bg-gradient-to-br from-orange-400 to-yellow-300 text-white',
    }

    useEffect(() => {
        async function fetchCountdown() {
            if (!supabase) {
                setError('Database connection failed')
                setLoading(false)
                return
            }

            try {
                const { data, error } = await supabase
                    .from('countdowns')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error
                setCountdown(data)

                // Check if already passed
                const target = new Date(data.target_date)
                if (new Date() >= target) {
                    setIsLive(true)
                    setShowConfetti(true)
                }
            } catch (err) {
                console.error('Error fetching countdown:', err)
                setError('Countdown not found')
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchCountdown()
        }
    }, [id])

    // Simple Confetti Effect
    useEffect(() => {
        if (showConfetti) {
            const timer = setTimeout(() => setShowConfetti(false), 5000)
            return () => clearTimeout(timer)
        }
    }, [showConfetti])

    const handleCopyEmbed = () => {
        const code = `<iframe src="${window.location.origin}/countdown/${id}?embed=true" width="100%" height="400" frameborder="0" style="border-radius: 12px; overflow: hidden;"></iframe>`
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div></div>
    if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400">{error}</div>
    if (!countdown) return null

    const themeClass = themes[countdown.theme] || themes.default

    return (
        <div className={`min-h-screen flex flex-col ${themeClass} transition-colors duration-1000 overflow-hidden relative`}>
            {/* Confetti Overlay */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-3 h-3 bg-white rounded-full animate-fall"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-10px`,
                                backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)],
                                animationDuration: `${Math.random() * 3 + 2}s`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Navigation - Hidden in Embed Mode */}
            {!isEmbed && (
                <div className="p-6 flex justify-between items-center z-10">
                    <Link href="/countdown" className="flex items-center text-white/80 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                    </Link>
                    <div className="flex space-x-4">
                        <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" title="Edit">
                            <Edit2 className="w-5 h-5 text-white" />
                        </button>
                        <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" title="Settings">
                            <Settings className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`flex-1 flex flex-col items-center justify-center p-4 text-center z-10 ${isEmbed ? 'scale-90' : ''}`}>
                <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight drop-shadow-lg">
                    {countdown.title}
                </h1>

                <div className="w-full max-w-4xl mb-12 transform scale-100 hover:scale-105 transition-transform duration-500">
                    <CountdownTimer
                        targetDate={countdown.target_date}
                        theme={countdown.theme}
                        onComplete={() => {
                            setIsLive(true)
                            setShowConfetti(true)
                        }}
                    />
                </div>

                {isLive && (
                    <div className="animate-bounce mb-8">
                        <span className="inline-block px-6 py-3 bg-white text-black font-bold rounded-full text-xl shadow-lg">
                            🎉 IT'S HERE! 🎉
                        </span>
                    </div>
                )}

                {/* Controls - Hidden in Embed Mode */}
                {!isEmbed && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl w-full">
                        <button className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all border border-white/10">
                            <Share2 className="w-6 h-6 mb-2" />
                            <span className="text-sm font-medium">Share</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all border border-white/10">
                            <Repeat className="w-6 h-6 mb-2" />
                            <span className="text-sm font-medium">Repeat</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all border border-white/10">
                            <Calendar className="w-6 h-6 mb-2" />
                            <span className="text-sm font-medium">Add to Cal</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all border border-white/10">
                            <Music className="w-6 h-6 mb-2" />
                            <span className="text-sm font-medium">Theme</span>
                        </button>
                        <button
                            onClick={() => setShowEmbedModal(true)}
                            className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all border border-white/10 col-span-2 md:col-span-1"
                        >
                            <Code className="w-6 h-6 mb-2" />
                            <span className="text-sm font-medium">Embed</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Footer - Hidden in Embed Mode */}
            {!isEmbed && (
                <div className="p-6 text-center text-white/40 text-sm z-10">
                    Created with Ultra-Boring Tools
                </div>
            )}

            {/* Embed Modal */}
            {showEmbedModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white text-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setShowEmbedModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h3 className="text-xl font-bold mb-2">Embed this Countdown</h3>
                        <p className="text-gray-500 mb-4 text-sm">Copy the code below to add this countdown to your website.</p>

                        <div className="bg-gray-100 p-4 rounded-xl font-mono text-xs text-gray-700 break-all mb-4 border border-gray-200">
                            {`<iframe src="${window.location.origin}/countdown/${id}?embed=true" width="100%" height="400" frameborder="0" style="border-radius: 12px; overflow: hidden;"></iframe>`}
                        </div>

                        <button
                            onClick={handleCopyEmbed}
                            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center transition-all ${copied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        >
                            {copied ? (
                                <>
                                    <Check className="w-5 h-5 mr-2" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-5 h-5 mr-2" />
                                    Copy Code
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                }
                .animate-fall {
                    animation-name: fall;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </div>
    )
}
