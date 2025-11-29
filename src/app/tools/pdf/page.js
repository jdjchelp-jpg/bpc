'use client'

import { useState } from 'react'
import PremiumGuard from '@/components/PremiumGuard'
import { FileText, Upload, Download, Scissors, Layers, Minimize2, Loader2 } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'

export default function PDFToolsPage() {
    const [mode, setMode] = useState('merge') // merge, split, compress
    const [files, setFiles] = useState([])
    const [processing, setProcessing] = useState(false)
    const [resultUrl, setResultUrl] = useState(null)

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files))
            setResultUrl(null)
        }
    }

    const handleMerge = async () => {
        if (files.length < 2) return alert('Please select at least 2 PDF files')
        setProcessing(true)
        try {
            const mergedPdf = await PDFDocument.create()
            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer()
                const pdf = await PDFDocument.load(arrayBuffer)
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
                copiedPages.forEach((page) => mergedPdf.addPage(page))
            }
            const pdfBytes = await mergedPdf.save()
            createDownloadLink(pdfBytes, 'merged.pdf')
        } catch (error) {
            console.error('Merge error:', error)
            alert('Failed to merge PDFs')
        }
        setProcessing(false)
    }

    const handleSplit = async () => {
        if (files.length !== 1) return alert('Please select exactly 1 PDF file')
        setProcessing(true)
        try {
            const file = files[0]
            const arrayBuffer = await file.arrayBuffer()
            const pdf = await PDFDocument.load(arrayBuffer)
            const pageCount = pdf.getPageCount()

            // For demo, just split the first page
            const newPdf = await PDFDocument.create()
            const [firstPage] = await newPdf.copyPages(pdf, [0])
            newPdf.addPage(firstPage)

            const pdfBytes = await newPdf.save()
            createDownloadLink(pdfBytes, 'split-page-1.pdf')
            alert(`Split successful! Downloaded page 1 of ${pageCount}.`)
        } catch (error) {
            console.error('Split error:', error)
            alert('Failed to split PDF')
        }
        setProcessing(false)
    }

    const createDownloadLink = (data, filename) => {
        const blob = new Blob([data], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        setResultUrl({ url, filename })
    }

    return (
        <PremiumGuard>
            <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="heading-lg" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <FileText style={{ color: 'var(--accent)' }} /> PDF Tools
                </h1>

                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
                        {[
                            { id: 'merge', label: 'Merge', icon: <Layers size={18} /> },
                            { id: 'split', label: 'Split', icon: <Scissors size={18} /> },
                            { id: 'compress', label: 'Compress', icon: <Minimize2 size={18} /> }
                        ].map(m => (
                            <button
                                key={m.id}
                                onClick={() => { setMode(m.id); setFiles([]); setResultUrl(null); }}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    background: mode === m.id ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {m.icon} {m.label}
                            </button>
                        ))}
                    </div>

                    <div style={{
                        border: '2px dashed var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '3rem',
                        textAlign: 'center',
                        marginBottom: '2rem',
                        cursor: 'pointer',
                        background: 'rgba(255,255,255,0.02)'
                    }}
                        onClick={() => document.getElementById('pdfInput').click()}
                    >
                        <Upload size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                        <p style={{ marginBottom: '0.5rem' }}>
                            {files.length > 0
                                ? `${files.length} file(s) selected`
                                : `Click to upload PDF${mode === 'merge' ? 's' : ''}`}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {mode === 'merge' ? 'Select multiple files to combine' : 'Select a file to process'}
                        </p>
                    </div>
                    <input
                        id="pdfInput"
                        type="file"
                        accept=".pdf"
                        multiple={mode === 'merge'}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={mode === 'merge' ? handleMerge : handleSplit}
                            disabled={files.length === 0 || processing}
                            className="btn-primary"
                            style={{ padding: '0.75rem 2rem', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            {processing ? <Loader2 className="spin" size={20} /> : null}
                            {processing ? 'Processing...' : `Process PDF${files.length > 1 ? 's' : ''}`}
                        </button>
                    </div>

                    {resultUrl && (
                        <div style={{ marginTop: '2rem', textAlign: 'center', padding: '1rem', background: 'rgba(0,255,0,0.1)', borderRadius: 'var(--radius-md)' }}>
                            <p style={{ marginBottom: '1rem', color: '#4ade80' }}>Success! Your file is ready.</p>
                            <a
                                href={resultUrl.url}
                                download={resultUrl.filename}
                                className="btn-primary"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
                            >
                                <Download size={18} /> Download Result
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </PremiumGuard>
    )
}
