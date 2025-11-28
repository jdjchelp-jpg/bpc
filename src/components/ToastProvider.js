'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { X } from 'lucide-react'

const ToastContext = createContext({
    addToast: () => { }
})

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = 'info') => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])

        // Auto remove after 3 seconds
        setTimeout(() => {
            removeToast(id)
        }, 3000)
    }, [])

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                zIndex: 9999,
                pointerEvents: 'none'
            }}>
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        style={{
                            background: toast.type === 'error' ? 'rgba(220, 38, 38, 0.9)' : 'rgba(15, 23, 42, 0.9)',
                            color: 'white',
                            padding: '1rem 1.5rem',
                            borderRadius: 'var(--radius-md)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            pointerEvents: 'auto',
                            animation: 'slideIn 0.3s ease-out'
                        }}
                    >
                        <span>{toast.message}</span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: 0, display: 'flex' }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
            <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
        </ToastContext.Provider>
    )
}

export function useToast() {
    return useContext(ToastContext)
}
