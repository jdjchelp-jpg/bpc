'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext({
    settings: {
        tempUnit: 'celsius',
        timeFormat: '24h',
        theme: 'glass',
        animations: true
    },
    updateSettings: () => { }
})

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState({
        tempUnit: 'celsius', // celsius, fahrenheit
        timeFormat: '24h', // 12h, 24h
        theme: 'glass', // glass, minimal
        animations: true
    })

    useEffect(() => {
        // Load from localStorage
        const saved = localStorage.getItem('app-settings')
        if (saved) {
            try {
                setSettings(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to parse settings', e)
            }
        }
    }, [])

    const updateSettings = (newSettings) => {
        const updated = { ...settings, ...newSettings }
        setSettings(updated)
        localStorage.setItem('app-settings', JSON.stringify(updated))
    }

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    return useContext(SettingsContext)
}
