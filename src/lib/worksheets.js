export function generateMultiplicationTable(limit = 12) {
    const table = []
    for (let i = 1; i <= limit; i++) {
        const row = []
        for (let j = 1; j <= limit; j++) {
            row.push({
                expression: `${i} × ${j}`,
                result: i * j
            })
        }
        table.push(row)
    }
    return table
}

export function generatePrimes(limit = 100) {
    const primes = []
    const isPrime = (num) => {
        for (let i = 2, s = Math.sqrt(num); i <= s; i++)
            if (num % i === 0) return false
        return num > 1
    }

    for (let i = 2; i <= limit; i++) {
        if (isPrime(i)) primes.push(i)
    }
    return primes
}

export function generateSquaresAndCubes(limit = 20) {
    const data = []
    for (let i = 1; i <= limit; i++) {
        data.push({
            number: i,
            square: i * i,
            cube: i * i * i
        })
    }
    return data
}

export function generateMathProblems(count = 20, difficulty = 'easy') {
    const problems = []
    const operations = ['+', '-', '×']

    for (let i = 0; i < count; i++) {
        let a, b, op

        if (difficulty === 'easy') {
            a = Math.floor(Math.random() * 20) + 1
            b = Math.floor(Math.random() * 20) + 1
            op = operations[Math.floor(Math.random() * 2)] // + or -
        } else if (difficulty === 'medium') {
            a = Math.floor(Math.random() * 50) + 1
            b = Math.floor(Math.random() * 50) + 1
            op = operations[Math.floor(Math.random() * 3)]
        } else {
            a = Math.floor(Math.random() * 100) + 1
            b = Math.floor(Math.random() * 100) + 1
            op = operations[Math.floor(Math.random() * 3)]
        }

        problems.push({
            id: i,
            expression: `${a} ${op} ${b} =`,
            answer: op === '+' ? a + b : op === '-' ? a - b : a * b
        })
    }

    return problems
}
