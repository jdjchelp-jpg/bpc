import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, addMonths, subMonths, getYear, getMonth } from 'date-fns'
import { Moon } from 'lunarphase-js'

export function getCalendarDays(date) {
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    return eachDayOfInterval({
        start: startDate,
        end: endDate
    })
}

export function getMoonPhase(date) {
    const phase = Moon.lunarPhase(date)
    const phaseEmoji = Moon.lunarPhaseEmoji(date)
    return { phase, emoji: phaseEmoji }
}

export function getMonthName(date) {
    return format(date, 'MMMM yyyy')
}

export function getWeekDays() {
    const now = new Date()
    const weekStart = startOfWeek(now)
    const weekEnd = endOfWeek(now)
    return eachDayOfInterval({ start: weekStart, end: weekEnd }).map(day => format(day, 'EEE'))
}
