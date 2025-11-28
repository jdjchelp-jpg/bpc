export default function manifest() {
    return {
        name: 'Blue Peak Countdown',
        short_name: 'BluePeak',
        description: 'Smart Event Countdowns & Utility Tools',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#3b82f6',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
