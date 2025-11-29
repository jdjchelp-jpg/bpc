'use client'

import { useState } from 'react'
import PremiumGuard from '@/components/PremiumGuard'
import { Eye, Upload, Image as ImageIcon, Loader2, FileText, Calculator as CalcIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AIVisionPage() {
    const [imageUrl, setImageUrl] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [prompt, setPrompt] = useState('')
    const [result, setResult] = useState('')
    const [loading, setLoading] = useState(false)
    const [mode, setMode] = useState('general') // general, math, ocr

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageUrl(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAnalyze = async () => {
        if (!imageUrl) {
            alert('Please upload an image first')
            return
        }

        setLoading(true)
        setResult('')

        try {
            const { data: { session } } = await supabase.auth.getSession()
            const token = session?.access_token

            let analysisPrompt = prompt
            if (mode === 'math') {
                analysisPrompt = 'Solve all the math problems shown in this image. Show your work step by step.'
            } else if (mode === 'ocr') {
                analysisPrompt = 'Extract all text from this image. Preserve formatting where possible.'
            } else if (!prompt) {
                analysisPrompt = 'Describe what you see in this image in detail.'
            }

            const response = await fetch('/api/ai/vision', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    imageUrl: imageUrl,
                    prompt: analysisPrompt
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to analyze image')
            }

            setResult(data.choices[0].message.content)

        } catch (error) {
            console.error('Vision Error:', error)
            setResult('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <PremiumGuard>
            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <h1 className="heading-lg" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Eye style={{ color: 'var(--accent)' }} /> AI Vision Tools
                </h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Analyze images, solve math problems, and extract text
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                    {/* Left Panel - Upload & Controls */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Upload Image</h3>

                        <div style={{
                            border: '2px dashed var(--border)',
                            borderRadius: 'var(--radius-md)',
                            padding: '2rem',
                            textAlign: 'center',
                            marginBottom: '1.5rem',
                            cursor: 'pointer',
                            background: imageUrl ? 'transparent' : 'rgba(255,255,255,0.02)'
                        }}
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            {imageUrl ? (
                                <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', borderRadius: 'var(--radius-md)' }} />
                            ) : (
                                <div>
                                    <Upload size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
                                    <p style={{ color: 'var(--text-muted)' }}>Click to upload an image</p>
                                </div>
                            )}
                        </div>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />

                        {/* Mode Selection */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                                Analysis Mode
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                                {[
                                    { value: 'general', label: 'General', icon: <Eye size={16} /> },
                                    { value: 'math', label: 'Math Solver', icon: <CalcIcon size={16} /> },
                                    { value: 'ocr', label: 'Text OCR', icon: <FileText size={16} /> }
                                ].map(m => (
                                    <button
                                        key={m.value}
                                        onClick={() => setMode(m.value)}
                                        style={{
                                            padding: '0.75rem',
                                            background: mode === m.value ? 'var(--primary)' : 'var(--surface)',
                                            border: '1px solid var(--border)',
                                            borderRadius: 'var(--radius-md)',
                                            color: 'white',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        {m.icon}
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Custom Prompt (for general mode) */}
                        {mode === 'general' && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                                    Custom Prompt (Optional)
                                </label>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="What would you like to know about this image?"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'var(--surface)',
                                        border: '1px solid var(--border)',
                                        color: 'white',
                                        minHeight: '80px',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>
                        )}

                        <button
                            onClick={handleAnalyze}
                            disabled={loading || !imageUrl}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="spin" size={20} />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Eye size={20} />
                                    Analyze Image
                                </>
                            )}
                        </button>
                    </div>

                    {/* Right Panel - Results */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Analysis Result</h3>

                        {result ? (
                            <div style={{
                                background: 'rgba(255,255,255,0.05)',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-md)',
                                whiteSpace: 'pre-wrap',
                                lineHeight: '1.6',
                                maxHeight: '600px',
                                overflowY: 'auto'
                            }}>
                                {typeof result === 'object' ? JSON.stringify(result, null, 2) : result}
                            </div>
                        ) : (
                            <div style={{
                                textAlign: 'center',
                                padding: '4rem 2rem',
                                color: 'var(--text-muted)'
                            }}>
                                <ImageIcon size={64} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                                <p>Upload an image and click "Analyze" to see results</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PremiumGuard>
    )
}
