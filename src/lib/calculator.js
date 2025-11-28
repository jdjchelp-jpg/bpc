import { evaluate, format } from 'mathjs'

export function calculate(expression) {
    try {
        // Replace visual operators with math operators
        const sanitized = expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/π/g, 'pi')
            .replace(/√/g, 'sqrt')

        const result = evaluate(sanitized)

        // Format to avoid floating point errors and keep it clean
        return format(result, { precision: 14 })
    } catch (error) {
        return 'Error'
    }
}

export const unitConversions = {
    length: [
        { value: 'm', label: 'Meters' },
        { value: 'km', label: 'Kilometers' },
        { value: 'cm', label: 'Centimeters' },
        { value: 'mm', label: 'Millimeters' },
        { value: 'mi', label: 'Miles' },
        { value: 'yd', label: 'Yards' },
        { value: 'ft', label: 'Feet' },
        { value: 'in', label: 'Inches' }
    ],
    weight: [
        { value: 'kg', label: 'Kilograms' },
        { value: 'g', label: 'Grams' },
        { value: 'mg', label: 'Milligrams' },
        { value: 'lb', label: 'Pounds' },
        { value: 'oz', label: 'Ounces' }
    ],
    temperature: [
        { value: 'degC', label: 'Celsius' },
        { value: 'degF', label: 'Fahrenheit' },
        { value: 'K', label: 'Kelvin' }
    ]
}

export function convertUnit(value, from, to) {
    try {
        // Using mathjs for conversion would be ideal but for simplicity/speed in this demo
        // we'll use a string construction if using mathjs units, or custom logic.
        // Here we use mathjs evaluate for unit conversion string
        return evaluate(`${value} ${from} to ${to}`).toString()
    } catch (error) {
        return 'Error'
    }
}

export function toRoman(num) {
    if (isNaN(num)) return NaN
    if (num <= 0 || num >= 4000) return 'Invalid Range'

    const digits = String(+num).split('')
    const key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
        "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
        "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]
    let roman = "", i = 3
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman
    return Array(+digits.join("") + 1).join("M") + roman
}

export function fromRoman(str) {
    if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(str)) return 'Invalid Roman'

    const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
    let result = 0
    for (let i = 0; i < str.length; i++) {
        const current = values[str[i]]
        const next = values[str[i + 1]]
        if (next && current < next) {
            result -= current
        } else {
            result += current
        }
    }
    return result
}
