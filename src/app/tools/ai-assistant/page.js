'use client'

import { useState, useRef, useEffect } from 'react'
import PremiumGuard from '@/components/PremiumGuard'
import { Send, Bot, User as UserIcon, Loader2, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AIAssistantPage() {
    const [messages, setMessages] = useState([
        {
            role: 'system',
            content: 'You are a helpful AI assistant integrated into Blue Peak Countdown, a productivity and utility application. You help users with various tasks including answering questions, summarizing text, generating ideas, solving problems, and providing information. Be concise, friendly, and helpful. When appropriate, suggest how Blue Peak features might help with their needs.'
        },
        {
            role: 'assistant',
            content: 'Hello! I am your Blue Peak AI Assistant. I can help you summarize text, generate ideas, answer questions, or assist with various tasks. How can I help you today?'
        }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [model, setModel] = useState('x-ai/grok-4.1-fast:free') // Default to Grok
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!input.trim() || loading) return

        const userMessage = { role: 'user', content: input }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setLoading(true)

        try {
            const { data: { session } } = await supabase.auth.getSession()
            const token = session?.access_token

            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
                    model: model
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response')
            }

            const assistantMessage = data.choices[0].message
            setMessages(prev => [...prev, assistantMessage])

        } catch (error) {
            console.error('Chat Error:', error)
            const errorMessage = error.message || 'Unknown error occurred'
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `Sorry, I encountered an error: ${errorMessage}. Please make sure you're signed in with a premium account.`
            }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <PremiumGuard>
            <div className="container" style={{ padding: '2rem 1.5rem', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h1 className="heading-lg" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Sparkles style={{ color: 'var(--accent)' }} /> AI Assistant
                    </h1>
                    <select
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        style={{
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--surface)',
                            color: 'white',
                            border: '1px solid var(--border)'
                        }}
                    >
                        <option value="x-ai/grok-4.1-fast:free">Grok 4.1 (Fast & Smart)</option>
                        <option value="openai/gpt-oss-20b:free">GPT OSS 20B</option>
                    </select>
                </div>

                <div className="glass-panel" style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    padding: 0
                }}>
                    {/* Chat Area */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}>
                        {messages.filter(m => m.role !== 'system').map((msg, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                gap: '1rem',
                                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                                alignItems: 'flex-start'
                            }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: msg.role === 'user' ? 'var(--primary)' : 'var(--accent)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    {msg.role === 'user' ? <UserIcon size={18} /> : <Bot size={18} />}
                                </div>
                                <div style={{
                                    background: msg.role === 'user' ? 'var(--primary-dark)' : 'rgba(255,255,255,0.05)',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    maxWidth: '80%',
                                    lineHeight: '1.5'
                                }}>
                                    {msg.content}
                                    {msg.reasoning_details && (
                                        <div style={{
                                            marginTop: '0.5rem',
                                            padding: '0.5rem',
                                            background: 'rgba(0,0,0,0.2)',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: '0.8rem',
                                            fontStyle: 'italic',
                                            color: 'var(--text-muted)'
                                        }}>
                                            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Reasoning:</strong>
                                            {msg.reasoning_details}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: 'var(--accent)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Bot size={18} />
                                </div>
                                <div style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <Loader2 className="spin" size={18} /> Thinking...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} style={{
                        padding: '1.5rem',
                        background: 'rgba(0,0,0,0.2)',
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        gap: '1rem'
                    }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            style={{
                                flex: 1,
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="btn-primary"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0 1.5rem'
                            }}
                        >
                            <Send size={18} /> Send
                        </button>
                    </form>
                </div>
            </div>
        </PremiumGuard>
    )
}
