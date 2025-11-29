'use client'

import { useState } from 'react'
import PremiumGuard from '@/components/PremiumGuard'
import { Image as ImageIcon, Upload, Download, RefreshCw, Loader2 } from 'lucide-react'

export default function ImageConverterPage() {
    const [image, setImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [format, setFormat] = useState('image/png')
    const [quality, setQuality] = useState(0.9)
    const [processing, setProcessing] = useState(false)
    const [convertedUrl, setConvertedUrl] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setPreviewUrl(URL.createObjectURL(file))
            setConvertedUrl(null)
        }
    }

    const handleConvert = async () => {
        if (!image) return
        setProcessing(true)

        try {
            const img = new Image()
            img.src = previewUrl
            await new Promise(resolve => { img.onload = resolve })

            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)

            const url = canvas.toDataURL(format, quality)
            setConvertedUrl(url)
        } catch (error) {
            console.error('Conversion error:', error)
            alert('Failed to convert image')
        }
        setProcessing(false)
    }

    const downloadImage = () => {
        if (!convertedUrl) return
        const ext = format.split('/')[1]
        const a = document.createElement('a')
        a.href = convertedUrl
        a.download = `converted-image.${ext}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <PremiumGuard>
            <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="heading-lg" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <RefreshCw style={{ color: 'var(--accent)' }} /> Image Converter
                </h1>

                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{
                        border: '2px dashed var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '2rem',
                        textAlign: 'center',
                        marginBottom: '2rem',
                        cursor: 'pointer',
                        background: previewUrl ? 'transparent' : 'rgba(255,255,255,0.02)'
                    }}
                        onClick={() => document.getElementById('imgInput').click()}
                    >
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: 'var(--radius-md)' }} />
                        ) : (
                            <>
                                <Upload size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                                <p>Click to upload an image</p>
                            </>
                        )}
                    </div>
                    <input
                        id="imgInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

                    {image && (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Format</label>
                                    <select
                                        value={format}
                                        onChange={(e) => setFormat(e.target.value)}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--surface)', color: 'white', border: '1px solid var(--border)' }}
                                    >
                                        <option value="image/png">PNG</option>
                                        <option value="image/jpeg">JPG</option>
                                        <option value="image/webp">WEBP</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Quality ({Math.round(quality * 100)}%)</label>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="1"
                                        step="0.1"
                                        value={quality}
                                        onChange={(e) => setQuality(Number(e.target.value))}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleConvert}
                                disabled={processing}
                                className="btn-primary"
                                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            >
                                {processing ? <Loader2 className="spin" size={20} /> : <RefreshCw size={20} />}
                                Convert Image
                            </button>

                            {convertedUrl && (
                                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                    <button
                                        onClick={downloadImage}
                                        className="btn-primary"
                                        style={{ background: '#4ade80', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        <Download size={20} /> Download Converted Image
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </PremiumGuard>
    )
}
