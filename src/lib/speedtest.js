export async function runSpeedTest(onProgress) {
    // Simulating a speed test for demonstration purposes
    // In a real app, this would download actual files and measure time

    const steps = 50
    const duration = 5000 // 5 seconds
    const interval = duration / steps

    let downloadSpeed = 0
    let uploadSpeed = 0
    let ping = Math.floor(Math.random() * 20) + 10 // 10-30ms
    let jitter = Math.floor(Math.random() * 5) + 1

    // Simulate Download Phase
    for (let i = 0; i <= steps; i++) {
        await new Promise(r => setTimeout(r, interval))

        // Simulate fluctuating speed curve
        const progress = i / steps
        const curve = Math.sin(progress * Math.PI) // 0 -> 1 -> 0
        const noise = (Math.random() - 0.5) * 10

        // Base speed around 50-150 Mbps
        const currentSpeed = (100 * curve) + 50 + noise
        downloadSpeed = Math.max(0, currentSpeed)

        onProgress({
            phase: 'download',
            progress: progress * 100,
            speed: downloadSpeed,
            ping,
            jitter
        })
    }

    // Simulate Upload Phase
    for (let i = 0; i <= steps; i++) {
        await new Promise(r => setTimeout(r, interval))

        const progress = i / steps
        const curve = Math.sin(progress * Math.PI)
        const noise = (Math.random() - 0.5) * 5

        // Base upload around 20-50 Mbps
        const currentSpeed = (35 * curve) + 15 + noise
        uploadSpeed = Math.max(0, currentSpeed)

        onProgress({
            phase: 'upload',
            progress: progress * 100,
            speed: uploadSpeed,
            ping,
            jitter
        })
    }

    return {
        download: Math.floor(Math.random() * 50) + 100, // Final result
        upload: Math.floor(Math.random() * 20) + 30,
        ping,
        jitter
    }
}
