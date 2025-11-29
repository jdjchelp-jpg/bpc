'use client'

import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)
        this.setState({ errorInfo })
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: 'white',
                    background: '#0f172a',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong</h1>
                    <p style={{ marginBottom: '2rem', color: '#94a3b8' }}>
                        The application encountered an error. Please try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Refresh Page
                    </button>

                    {this.state.error && (
                        <div style={{
                            marginTop: '2rem',
                            padding: '1rem',
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '0.5rem',
                            textAlign: 'left',
                            maxWidth: '800px',
                            overflow: 'auto',
                            fontFamily: 'monospace',
                            fontSize: '0.8rem'
                        }}>
                            <p style={{ color: '#ef4444', fontWeight: 'bold' }}>{this.state.error.toString()}</p>
                            {this.state.errorInfo && (
                                <pre style={{ color: '#94a3b8' }}>
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            )}
                        </div>
                    )}
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
