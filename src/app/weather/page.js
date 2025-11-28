'use client'

import { useState, useEffect } from 'react'
import { searchCity, getWeather, getWeatherCodeDescription, getWeatherTheme } from '@/lib/weather'
import { Search, Wind, Droplets, Thermometer } from 'lucide-react'

export default function WeatherDashboard() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [weather, setWeather] = useState(null)
    const [location, setLocation] = useState(null)
    const [loading, setLoading] = useState(false)
    const [bgTheme, setBgTheme] = useState('default')

    // Default to London on load
    useEffect(() => {
        handleSelectLocation({ name: 'London', latitude: 51.5074, longitude: -0.1278, country: 'United Kingdom' })
    }, [])

    const handleSearch = async (e) => {
        const val = e.target.value
        setQuery(val)
        if (val.length > 2) {
            const cities = await searchCity(val)
            setResults(cities)
        } else {
            setResults([])
        }
    }

    const handleSelectLocation = async (loc) => {
        setLoading(true)
        setResults([])
        setQuery('')
        setLocation(loc)

        const data = await getWeather(loc.latitude, loc.longitude)
        setWeather(data)

        if (data && data.current) {
            setBgTheme(getWeatherTheme(data.current.weather_code))
        }

        setLoading(false)
    }

    const getBackgroundStyle = (theme) => {
        switch (theme) {
            case 'sunny': return 'linear-gradient(to bottom, #3b82f6, #60a5fa)'
            case 'snow': return 'linear-gradient(to bottom, #94a3b8, #e2e8f0)'
            case 'rain': return 'linear-gradient(to bottom, #334155, #475569)'
            case 'storm': return 'linear-gradient(to bottom, #1e293b, #0f172a)'
            case 'cloudy': return 'linear-gradient(to bottom, #64748b, #94a3b8)'
            default: return 'var(--background)'
        }
    }

    return (
        <div style={{
            minHeight: 'calc(100vh - 4rem)',
            background: getBackgroundStyle(bgTheme),
            transition: 'background 1s ease',
            padding: '2rem 1.5rem'
        }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ position: 'relative', marginBottom: '3rem' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 'var(--radius-full)',
                        padding: '0.75rem 1.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}>
                        <Search size={20} color="white" style={{ marginRight: '1rem' }} />
                        <input
                            type="text"
                            placeholder="Search city..."
                            value={query}
                            onChange={handleSearch}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                width: '100%',
                                fontSize: '1.1rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {results.length > 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '110%',
                            left: 0,
                            right: 0,
                            background: 'rgba(30, 41, 59, 0.95)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 'var(--radius-md)',
                            padding: '0.5rem',
                            zIndex: 10,
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            {results.map((city) => (
                                <div
                                    key={city.id}
                                    onClick={() => handleSelectLocation(city)}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                                        color: 'white'
                                    }}
                                >
                                    <div style={{ fontWeight: '600' }}>{city.name}</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{city.admin1}, {city.country}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem' }}>Loading weather...</div>
                ) : weather && location ? (
                    <div className="glass-panel" style={{ padding: '3rem', color: 'white', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{location.name}</h1>
                        <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>{location.country}</p>

                        <div style={{ fontSize: '6rem', fontWeight: '800', lineHeight: 1, marginBottom: '1rem' }}>
                            {Math.round(weather.current.temperature_2m)}°
                        </div>

                        <div style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '3rem' }}>
                            {getWeatherCodeDescription(weather.current.weather_code)}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Wind size={32} style={{ marginBottom: '0.5rem', opacity: 0.8 }} />
                                <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>{weather.current.wind_speed_10m} <span style={{ fontSize: '0.9rem' }}>km/h</span></span>
                                <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Wind</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Droplets size={32} style={{ marginBottom: '0.5rem', opacity: 0.8 }} />
                                <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>{weather.current.relative_humidity_2m}%</span>
                                <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Humidity</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Thermometer size={32} style={{ marginBottom: '0.5rem', opacity: 0.8 }} />
                                <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>{Math.round(weather.current.apparent_temperature)}°</span>
                                <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Feels Like</span>
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                            <h3 style={{ textAlign: 'left', marginBottom: '1.5rem' }}>7-Day Forecast</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '1rem' }}>
                                {weather.daily.time.map((date, i) => (
                                    <div key={date} style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                                        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                            {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                                        </div>
                                        <div style={{ fontWeight: '700', fontSize: '1.2rem' }}>
                                            {Math.round(weather.daily.temperature_2m_max[i])}°
                                        </div>
                                        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                                            {Math.round(weather.daily.temperature_2m_min[i])}°
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}
